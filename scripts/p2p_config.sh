#!/bin/sh

IP=$1

echo p2p_config with $IP

LADDRSTRING="s/laddr = \"tcp:\/\/0.0.0.0:26656\"/laddr = \"tcp:\/\/"$IP":26656\"/g"
if [[ "$OSTYPE" == "darwin"* ]]; then
  RESULT="sed -i '' '$LADDRSTRING' $HOME/.entangled/config/config.toml"
else
  RESULT="sed -i '$LADDRSTRING' $HOME/.entangled/config/config.toml"
fi
eval $RESULT

PROXYAPP="s/proxy_app = \"tcp:\/\/127.0.0.1:26658\"/proxy_app = \"tcp:\/\/"$IP":26658\"/g"
if [[ "$OSTYPE" == "darwin"* ]]; then
  RESULT="sed -i '' '$PROXYAPP' $HOME/.entangled/config/config.toml"
else
  RESULT="sed -i '$PROXYAPP' $HOME/.entangled/config/config.toml"
fi
eval $RESULT

NODESTRING="s/node = \"tcp:\/\/localhost:26657\"/node = \"tcp:\/\/"$IP":26657\"/g"
if [[ "$OSTYPE" == "darwin"* ]]; then
  RESULT="sed -i '' '$NODESTRING' $HOME/.entangled/config/client.toml"
else
  RESULT="sed -i '$NODESTRING' $HOME/.entangled/config/client.toml"
fi

eval $RESULT

ADDRESS="s/address = \"tcp:\/\/0.0.0.0:1317\"/address = \"tcp:\/\/"$IP":1317\"/g"
if [[ "$OSTYPE" == "darwin"* ]]; then 
  RESULT="sed -i '' '$ADDRESS' $HOME/.entangled/config/app.toml"
else
  RESULT="sed -i '$ADDRESS' $HOME/.entangled/config/app.toml"
fi

eval $RESULT

# API="# Enable defines if the API server should be enabled.\ns/enable = false/enable = true/g"
# RESULT="sed -i '' '$API' $HOME/.entangled/config/app.toml"

# eval $RESULT