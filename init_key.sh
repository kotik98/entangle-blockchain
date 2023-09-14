#!/bin/sh
KEYRING="file"
KEYALGO="eth_secp256k1"

KEY=$1
PASSWORD=$2

# chack arguments
if [ "$#" -ne 2 ]; then
    echo "Error. Wrong number of arguments"
    echo "Using: $0 [KEY] [PASSWORD]"
    exit 1
fi

command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

make install

entangled config keyring-backend $KEYRING
entangled config chain-id $CHAINID

# if $KEY exists it should be deleted
yes $PASSWORD | entangled keys add $KEY --keyring-backend $KEYRING --algo $KEYALGO 


