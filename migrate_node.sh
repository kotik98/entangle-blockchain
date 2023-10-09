#!/bin/bash

# Seed for new chain
SEEDS_VALUE="76492a1356c14304bdd7ec946a6df0b57ba51fe2@json-rpc.testnet2.entangle.fi:26656"

CHAIN_DIR="$HOME/.entangled"
GENESIS_FILE="genesis.json"

# download genesis file
curl -L -o $CHAIN_DIR/config/$GENESIS_FILE https://entangle-public.s3.amazonaws.com/$GENESIS_FILE

# stop node
ENTANGLE_PID=$(pgrep entangled)
if [ ! -z "$ENTANGLE_PID" ]; then
    kill $ENTANGLE_PID
    echo "Entangle node stopped."
else
    echo "Entangle node not found."
fi

# remove and recreate data folder
entangled tendermint unsafe-reset-all

# Update seeds
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' 's/^persistent_peers =.*/persistent_peers = ""/' $CHAIN_DIR/config/config.toml
    sed -i '' "s/^seeds =.*/seeds = \'$SEEDS_VALUE\'/" $CHAIN_DIR/config/config.toml
else
    sed -i 's/^persistent_peers =.*/persistent_peers = ""/' $CHAIN_DIR/config/config.toml
    sed -i "s/^seeds =.*/seeds = \'$SEEDS_VALUE\'/" $CHAIN_DIR/config/config.toml
fi

# restart entangled
entangled start --pruning=nothing --evm.tracer=json --log_level info --minimum-gas-prices=0.0001aNGL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable --api.enabled-unsafe-cors


