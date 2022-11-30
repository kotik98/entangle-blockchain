#!/bin/sh

. ./ent_env

PASSWORD=$1
IP_ADDRESS=$2
NEED_P2P_CONFIG=$3
USE_KEY=$4
REMOVE_AND_MAKE=$5

# validate dependencies are installed
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

if [[ $REMOVE_AND_MAKE == "true" ]]; then
    # remove existing daemon and client
    rm -rf ~/.entangled*

    make install
fi

entangled config keyring-backend $KEYRING
entangled config chain-id $CHAINID

if [[ $USE_KEY == "true" ]]; then
    yes $PASSWORD | entangled keys add test --keyring-backend $KEYRING --algo $KEYALGO
    cp keys/validator_key.info $HOME/.entangled/keyring-file/
else
    yes $PASSWORD | entangled keys add $KEY --keyring-backend $KEYRING --algo $KEYALGO
fi

# Set moniker and chain-id for Entangle (Moniker can be anything, chain-id must be an integer)
entangled init $MONIKER --chain-id $CHAINID

cp config/genesis.json $HOME/.entangled/config/
cp config/config.toml $HOME/.entangled/config/ 

./init_seeds.sh

if [[ $IP_ADDRESS != "" ]]; then
    # # add seed
    ./add_seed.sh $IP_ADDRESS

    # p2p config
    if [[ $NEED_P2P_CONFIG == "true" ]]; then
        ./p2p_config.sh $IP_ADDRESS
    fi
fi

entangled start --pruning=nothing --evm.tracer=json $TRACE --log_level $LOGLEVEL --minimum-gas-prices=0.0001aNGL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable --api.enabled-unsafe-cors

# Подождите, чтобы нода запустилась
sleep 10

# Ждать синхронизации блоков
while true; do
    SYNCING=$(entangled status --node http://localhost:26657 | jq -r '.sync_info.catching_up')
    if [ "$SYNCING" = "false" ]; then
        break
    fi
    echo "Waiting for the node to be fully synced..."
    sleep 60
done


# Отслеживание монет и запуск валидатора
delegation_amount="1200000000000aNGL"

while true; do
    # balance=$(gaiacli query account $validator_address | jq -r '.value.coins[0].amount')
    # if [ "$balance" -gt "$delegation_amount" ]; then
    entangled tx staking create-validator \
        --amount=$delegation_amount \
        --pubkey=$(entangled tendermint show-validator) \
        --moniker=$moniker \
        --chain-id=$chain_id \
        --commission-rate="0.10" \
        --commission-max-rate="0.20" \
        --commission-max-change-rate="0.01" \
        --min-self-delegation="1" \
        --gas="auto" \
        --gas-prices="0.025aNGL" \
        --from=validator_key \
        --yes
    #     break
    # fi
    # sleep 60
done

# entangled tx staking create-validator \
#   --amount=170000000000000000000aNGL \
#   --pubkey=$(entangled tendermint show-validator) \
#   --moniker="validator2" \
#   --chain-id=<chain_id> \
#   --commission-rate="0.10" \
#   --commission-max-rate="0.20" \
#   --commission-max-change-rate="0.01" \
#   --min-self-delegation="1" \
#   --gas="auto" \
#   --gas-prices="0.025uatom" \
#   --from=$KEY

# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
# entangled start --pruning=nothing --evm.tracer=json $TRACE --log_level $LOGLEVEL --minimum-gas-prices=0.0001aNGL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable
