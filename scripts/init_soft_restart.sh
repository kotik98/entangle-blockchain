#!/bin/sh

. ./ent_env

entangled start --pruning=nothing --evm.tracer=json --trace --log_level info --minimum-gas-prices=0.0001aNGL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable --api.enabled-unsafe-cors
