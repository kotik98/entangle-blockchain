#!/bin/bash

# Seed for new chain
PEERS="42b8b4a22adbbc87313b145986022c1c3ad43f13@json-rpc.testnet2.entangle.fi:26656,741cb77bbbea6c2ec1a5b343be5f9144f9ca7e08@167.235.14.83:14656,27211a3886000faf8f854112ef31d052e635c5d8@95.217.114.120:25656,7bff324a17426a00731f425ae29fe6ef05eebbac@213.239.217.52:33656,65b88f9792a216c39189f1ec7cacf11d99388ce8@65.108.229.93:25656,0716c960f656eca4240a6a56f20f0e74fea6ee36@3.82.214.0:26656,76492a1356c14304bdd7ec946a6df0b57ba51fe2@35.175.80.14:26656"

CHAIN_DIR="$HOME/.entangled"
DATA_FOLDER=$CHAIN_DIR/data
GENESIS_FILE="genesis.json"
BACKUP_FILE_NAME=backup_data.tar.gz

# stop node
ENTANGLE_PID=$(pgrep entangled)
if [ ! -z "$ENTANGLE_PID" ]; then
    kill $ENTANGLE_PID
    echo "Entangle node stopped."
else
    echo "Entangle node not found."
fi

# download genesis file
curl -L -o $CHAIN_DIR/config/$GENESIS_FILE https://entangle-public.s3.amazonaws.com/$GENESIS_FILE

# remove and recreate data folder
entangled tendermint unsafe-reset-all

# download archive
curl -L -o $BACKUP_FILE_NAME https://entangle-public.s3.amazonaws.com/$BACKUP_FILE_NAME

tar -xzvf $BACKUP_FILE_NAME -C $DATA_FOLDER

rm $BACKUP_FILE_NAME

# Update seeds
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/^persistent_peers =.*/persistent_peers = \'$PEERS'/" $CHAIN_DIR/config/config.toml
    sed -i '' 's/^seeds =.*/seeds = ""/' $CHAIN_DIR/config/config.toml
    sed -i '' 's/^enable =.*/enable = false/' $CHAIN_DIR/config/config.toml
else
    sed -i "s/^persistent_peers =.*/persistent_peers = \'$PEERS'/" $CHAIN_DIR/config/config.toml
    sed -i 's/^seeds =.*/seeds = ""/' $CHAIN_DIR/config/config.toml
    sed -i 's/^enable =.*/enable = false/' $CHAIN_DIR/config/config.toml
fi

entangled start --pruning=nothing --evm.tracer=json --log_level info --minimum-gas-prices=0.0001aNGL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable --api.enabled-unsafe-cors


