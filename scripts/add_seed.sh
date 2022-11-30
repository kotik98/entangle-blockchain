#!/bin/sh

IP_ADDRESS=$1
NODEID=$(entangled tendermint show-node-id)

if [[ $IP_ADDRESS == "" ]]; then
    echo wrong ip address
    exit 1
fi

if [[ $NODEID == "" ]]; then  
    echo wrong NODEID
    exit 1
fi

NEWSEED=$NODEID@$1:26656
[ -s config/env_seeds ] && NEWSEED=,$NEWSEED

echo $(cat config/env_seeds | tr -s '\n' '\n')$NEWSEED > config/env_seeds
# echo $NEWSEED >> env_seeds
# truncate -s -1 env_seeds

# git add --all
# git commit -a -m "add seed $IP_ADDRESS"
# git push $REMOTE_REPO $BRANCH
