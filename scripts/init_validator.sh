#!/bin/sh

if [ $1 != "" ]; then
    BUILD_TYPE=$1 
    echo "Received: ${1}" && shift;
fi

if [ $BUILD_TYPE == "init" ]; then
    echo build type INIT 
    ./init_chain.sh "$@"
fi

if [ $BUILD_TYPE == "validator" ]; then
    echo build type VALIDATOR 
    ./init_validator_secondary.sh "$@"
fi

if [ $BUILD_TYPE == "seed" ]; then
    echo build type SEED 
    ./init_validator_seed.sh "$@"
fi

if [ $BUILD_TYPE == "key" ]; then
    echo build type KEY 
    ./init_key.sh "$@"
fi

if [ $BUILD_TYPE == "restart" ]; then
    echo build type KEY 
    ./init_soft_restart.sh
fi
