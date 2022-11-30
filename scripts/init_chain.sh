#!/bin/sh

. ./ent_env

PASSWORD=$1
IP_ADDRESS=$2
NEED_P2P_CONFIG=$3
USE_KEY=$4
REMOVE_AND_MAKE=$5
SEED=$6

# validate dependencies are installed
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

if [[ $REMOVE_AND_MAKE == "true" ]]; then
  # remove existing daemon and client
  rm -rf ~/.entangled*

  make install
fi

entangled config keyring-backend $KEYRING
entangled config chain-id $CHAINID

# if $KEY exists it should be deleted
yes $PASSWORD | entangled keys add $KEY --keyring-backend $KEYRING --algo $KEYALGO
yes $PASSWORD | entangled keys add $KEY2 --keyring-backend $KEYRING --algo $KEYALGO
yes $PASSWORD | entangled keys add $KEY3 --keyring-backend $KEYRING --algo $KEYALGO

# echo "$SEED\n$PASSWORD\n" | entangled keys add $KEY4 --recover  
yes $PASSWORD |entangled keys unsafe-import-eth-key $KEY4 $SEED

# Set moniker and chain-id for Entangle (Moniker can be anything, chain-id must be an integer)
entangled init $MONIKER --chain-id $CHAINID

# Change parameter token denominations to aNGL
cat $HOME/.entangled/config/genesis.json | jq '.app_state["staking"]["params"]["bond_denom"]="aNGL"' > $HOME/.entangled/config/tmp_genesis.json && mv $HOME/.entangled/config/tmp_genesis.json $HOME/.entangled/config/genesis.json
cat $HOME/.entangled/config/genesis.json | jq '.app_state["crisis"]["constant_fee"]["denom"]="aNGL"' > $HOME/.entangled/config/tmp_genesis.json && mv $HOME/.entangled/config/tmp_genesis.json $HOME/.entangled/config/genesis.json
cat $HOME/.entangled/config/genesis.json | jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="aNGL"' > $HOME/.entangled/config/tmp_genesis.json && mv $HOME/.entangled/config/tmp_genesis.json $HOME/.entangled/config/genesis.json
cat $HOME/.entangled/config/genesis.json | jq '.app_state["mint"]["params"]["mint_denom"]="aNGL"' > $HOME/.entangled/config/tmp_genesis.json && mv $HOME/.entangled/config/tmp_genesis.json $HOME/.entangled/config/genesis.json

# Set gas limit in genesis
cat $HOME/.entangled/config/genesis.json | jq '.consensus_params["block"]["max_gas"]="10000000"' > $HOME/.entangled/config/tmp_genesis.json && mv $HOME/.entangled/config/tmp_genesis.json $HOME/.entangled/config/genesis.json

# disable produce empty block
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.entangled/config/config.toml
  else
    sed -i 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.entangled/config/config.toml
fi

if [[ $1 == "pending" ]]; then
  if [[ "$OSTYPE" == "darwin"* ]]; then
      sed -i '' 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' $HOME/.entangled/config/config.toml
      sed -i '' 's/timeout_propose = "1s"/timeout_propose = "30s"/g' $HOME/.entangled/config/config.toml
      sed -i '' 's/timeout_propose_delta = "200ms"/timeout_propose_delta = "5s"/g' $HOME/.entangled/config/config.toml
      sed -i '' 's/timeout_prevote = "500ms"/timeout_prevote = "10s"/g' $HOME/.entangled/config/config.toml
      sed -i '' 's/timeout_prevote_delta = "200ms"/timeout_prevote_delta = "5s"/g' $HOME/.entangled/config/config.toml
      sed -i '' 's/timeout_precommit = "500ms"/timeout_precommit = "10s"/g' $HOME/.entangled/config/config.toml
      sed -i '' 's/timeout_precommit_delta = "200ms"/timeout_precommit_delta = "5s"/g' $HOME/.entangled/config/config.toml
      sed -i '' 's/timeout_commit = "1s"/timeout_commit = "150s"/g' $HOME/.entangled/config/config.toml
      sed -i '' 's/timeout_broadcast_tx_commit = "1s"/timeout_broadcast_tx_commit = "150s"/g' $HOME/.entangled/config/config.toml
  else
      sed -i 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' $HOME/.entangled/config/config.toml
      sed -i 's/timeout_propose = "1s"/timeout_propose = "30s"/g' $HOME/.entangled/config/config.toml
      sed -i 's/timeout_propose_delta = "200ms"/timeout_propose_delta = "5s"/g' $HOME/.entangled/config/config.toml
      sed -i 's/timeout_prevote = "500ms"/timeout_prevote = "10s"/g' $HOME/.entangled/config/config.toml
      sed -i 's/timeout_prevote_delta = "200ms"/timeout_prevote_delta = "5s"/g' $HOME/.entangled/config/config.toml
      sed -i 's/timeout_precommit = "500ms"/timeout_precommit = "10s"/g' $HOME/.entangled/config/config.toml
      sed -i 's/timeout_precommit_delta = "200ms"/timeout_precommit_delta = "5s"/g' $HOME/.entangled/config/config.toml
      sed -i 's/timeout_commit = "1s"/timeout_commit = "150s"/g' $HOME/.entangled/config/config.toml
      sed -i 's/timeout_broadcast_tx_commit = "1s"/timeout_broadcast_tx_commit = "150s"/g' $HOME/.entangled/config/config.toml
  fi
fi

sh config_block_time.sh

# Allocate genesis accounts (cosmos formatted addresses)
yes $PASSWORD | entangled add-genesis-account $KEY  1000000000000000000000000aNGL --keyring-backend $KEYRING
yes $PASSWORD | entangled add-genesis-account $KEY2 1000000000000000000000000aNGL --keyring-backend $KEYRING
yes $PASSWORD | entangled add-genesis-account $KEY3 1000000000000000000000000aNGL --keyring-backend $KEYRING
yes $PASSWORD | entangled add-genesis-account $KEY4 97000000000000000000000000aNGL --keyring-backend $KEYRING

# Sign genesis transaction
# entangled gentx $KEY 1000000000000000000000aNGL --keyring-backend $KEYRING --chain-id $CHAINID
yes $PASSWORD| entangled gentx $KEY 1000000000000000000aNGL --keyring-backend $KEYRING --chain-id $CHAINID
# yes "entangle" | entangled gentx $KEY2 170000000000000000000aNGL --keyring-backend $KEYRING --chain-id $CHAINID

yes $PASSWORD | entangled add-genesis-admin $KEY4
# yes "entangle" | entangled add-genesis-admin $KEY2

# yes $PASSWORD | entangled add-genesis-distributor $KEY4 4077231520
# yes "entangle" | entangled add-genesis-distributor $KEY2 1230000000000000

# Collect genesis tx
entangled collect-gentxs

# Run this to ensure everything worked and that the genesis file is setup correctly
entangled validate-genesis

# if [[ $1 == "pending" ]]; then
#   echo "pending mode is on, please wait for the first block committed."
# fi

if [[ $IP_ADDRESS != "" ]]; then
  echo ip to restart $IP_ADDRESS
  # restart chain
  sh restart_chain.sh $IP_ADDRESS

  # add seed
  # ./add_seed.sh $IP_ADDRESS

  # p2p config
  if [[ $NEED_P2P_CONFIG == "true" ]]; then
    sh p2p_config.sh $IP_ADDRESS
  fi
fi


# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
# entangled start --pruning=nothing --evm.tracer=json $TRACE --log_level $LOGLEVEL --minimum-gas-prices=0.0001aNGL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable

entangled start --pruning=nothing --evm.tracer=json $TRACE --log_level $LOGLEVEL --minimum-gas-prices=0.0001aNGL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable



