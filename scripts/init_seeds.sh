#!/bin/sh

# disable produce empty block

# SEEDS=`cat env_seeds`
SEEDS="$(cat config/env_seeds)"
echo seeds to set: $SEEDS
# echo 's/seeds = ""/seeds = "'$SEEDS'"/g'
if [[ "$OSTYPE" == "darwin"* ]]; then
    # sed -i '' 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.entangled/config/config.toml
    sed -i '' 's/seeds = ""/seeds = "'$SEEDS'"/g' $HOME/.entangled/config/config.toml
  else
    # sed -i 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.entangled/config/config.toml
    sed -i 's/seeds = ""/seeds = "'$SEEDS'"/g' $HOME/.entangled/config/config.toml
fi
