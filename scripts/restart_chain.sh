#!/bin/sh
. ./ent_env

echo "Restarting chain"
IP_ADDRESS=$1

if [[ $IP_ADDRESS == "" ]]; then
    echo wrong ip address
    exit 1
fi

if [[ $NODEID == "" ]]; then  
    echo wrong NODEID
    exit 1
fi

echo Reset env_seeds
rm -rf config/env_seeds
touch config/env_seeds

cp $HOME/.entangled/config/genesis.json ./config/genesis.json


# git add --all
# git commit -a -m "restart chain"
# git push new $BRANCH 

echo Add seed start
./add_seed.sh $IP_ADDRESS
echo Add seed complete


