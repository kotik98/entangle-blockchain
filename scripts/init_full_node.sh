#!/bin/sh

. ./ent_env

# validate dependencies are installed
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

# remove existing daemon and client
rm -rf ~/.entangled*

make install

# entangled config keyring-backend $KEYRING
entangled config chain-id $CHAINID

# if $KEY exists it should be deleted
# entangled keys add $KEY --keyring-backend $KEYRING --algo $KEYALGO

# Set moniker and chain-id for Entangle (Moniker can be anything, chain-id must be an integer)
entangled init $MONIKER --chain-id $CHAINID

./init_seeds.sh

cp config/genesis.json $HOME/.entangled/config/
entangled start --evm.tracer=json $TRACE --log_level $LOGLEVEL --minimum-gas-prices=0.0001aNGL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable


# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
# entangled start --pruning=nothing --evm.tracer=json $TRACE --log_level $LOGLEVEL --minimum-gas-prices=0.0001aNGL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable
