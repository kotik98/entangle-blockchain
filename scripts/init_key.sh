#!/bin/sh

KEY="validator_key_new"
KEYRING="file"
KEYALGO="eth_secp256k1"

# CUR_DATE="$(date +%Y-%m-%d_%H:%M:%S)"

# BASEDIR=$(dirname "$0")
# KEYS_DIR=$BASEDIR/keys
# DATE_DIR=$KEYS_DIR/$CUR_DATE

PASSWORD=$1

command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

entangled config keyring-backend $KEYRING
entangled config chain-id $CHAINID

# if $KEY exists it should be deleted
yes $PASSWORD | entangled keys add $KEY --keyring-backend $KEYRING --algo $KEYALGO

