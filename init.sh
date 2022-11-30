#!/bin/sh

KEY="mykey"
KEY2="mykey2"
CHAINID="ethermint_9000-1"
MONIKER="localtestnet"
KEYRING="test"
KEYALGO="eth_secp256k1"
LOGLEVEL="info"
# trace evm
TRACE="--trace"
# TRACE=""

# validate dependencies are installed
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

# remove existing daemon and client
rm -rf ~/.entangled*

make install

entangled config keyring-backend $KEYRING
entangled config chain-id $CHAINID

# if $KEY exists it should be deleted
entangled keys add $KEY --keyring-backend $KEYRING --algo $KEYALGO
entangled keys add $KEY2 --keyring-backend $KEYRING --algo $KEYALGO

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
      sed -i '' 's/timeout_precommit_delta = 200ms"/timeout_precommit_delta = "5s"/g' $HOME/.entangled/config/config.toml
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

# Allocate genesis accounts (cosmos formatted addresses)
entangled add-genesis-account $KEY 50000000000000000000000000aNGL --keyring-backend $KEYRING
entangled add-genesis-account $KEY2 50000000000000000000000000aNGL --keyring-backend $KEYRING

# Sign genesis transaction
# entangled gentx $KEY 1000000000000000000000aNGL --keyring-backend $KEYRING --chain-id $CHAINID
entangled gentx $KEY 230000000000000000000aNGL --keyring-backend $KEYRING --chain-id $CHAINID

entangled add-genesis-admin $KEY
entangled add-genesis-admin $KEY2

entangled add-genesis-distributor $KEY 45600000000000000
entangled add-genesis-distributor $KEY2 1230000000000000

# Collect genesis tx
entangled collect-gentxs

# Run this to ensure everything worked and that the genesis file is setup correctly
entangled validate-genesis

# disable produce empty block and enable prometheus metrics
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.ethermintd/config/config.toml
    sed -i '' 's/prometheus = false/prometheus = true/' $HOME/.ethermintd/config/config.toml
    sed -i '' 's/prometheus-retention-time = 0/prometheus-retention-time  = 1000000000000/g' $HOME/.ethermintd/config/app.toml
    sed -i '' 's/enabled = false/enabled = true/g' $HOME/.ethermintd/config/app.toml
else
    sed -i 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.ethermintd/config/config.toml
    sed -i 's/prometheus = false/prometheus = true/' $HOME/.ethermintd/config/config.toml
    sed -i 's/prometheus-retention-time  = "0"/prometheus-retention-time  = "1000000000000"/g' $HOME/.ethermintd/config/app.toml
    sed -i 's/enabled = false/enabled = true/g' $HOME/.ethermintd/config/app.toml
fi

if [[ $1 == "pending" ]]; then
    echo "pending mode is on, please wait for the first block committed."
    if [[ $OSTYPE == "darwin"* ]]; then
        sed -i '' 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' $HOME/.ethermintd/config/config.toml
        sed -i '' 's/timeout_propose = "3s"/timeout_propose = "30s"/g' $HOME/.ethermintd/config/config.toml
        sed -i '' 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "5s"/g' $HOME/.ethermintd/config/config.toml
        sed -i '' 's/timeout_prevote = "1s"/timeout_prevote = "10s"/g' $HOME/.ethermintd/config/config.toml
        sed -i '' 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "5s"/g' $HOME/.ethermintd/config/config.toml
        sed -i '' 's/timeout_precommit = "1s"/timeout_precommit = "10s"/g' $HOME/.ethermintd/config/config.toml
        sed -i '' 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "5s"/g' $HOME/.ethermintd/config/config.toml
        sed -i '' 's/timeout_commit = "5s"/timeout_commit = "150s"/g' $HOME/.ethermintd/config/config.toml
        sed -i '' 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "150s"/g' $HOME/.ethermintd/config/config.toml
    else
        sed -i 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' $HOME/.ethermintd/config/config.toml
        sed -i 's/timeout_propose = "3s"/timeout_propose = "30s"/g' $HOME/.ethermintd/config/config.toml
        sed -i 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "5s"/g' $HOME/.ethermintd/config/config.toml
        sed -i 's/timeout_prevote = "1s"/timeout_prevote = "10s"/g' $HOME/.ethermintd/config/config.toml
        sed -i 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "5s"/g' $HOME/.ethermintd/config/config.toml
        sed -i 's/timeout_precommit = "1s"/timeout_precommit = "10s"/g' $HOME/.ethermintd/config/config.toml
        sed -i 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "5s"/g' $HOME/.ethermintd/config/config.toml
        sed -i 's/timeout_commit = "5s"/timeout_commit = "150s"/g' $HOME/.ethermintd/config/config.toml
        sed -i 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "150s"/g' $HOME/.ethermintd/config/config.toml
    fi
fi

# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
entangled start --metrics --pruning=nothing --evm.tracer=json $TRACE --log_level $LOGLEVEL --minimum-gas-prices=0.0001aNGL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable
