if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.entangled/config/config.toml
    sed -i '' 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' $HOME/.entangled/config/config.toml
    sed -i '' 's/timeout_propose = "3s"/timeout_propose = "1s"/g' $HOME/.entangled/config/config.toml
    sed -i '' 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "200ms"/g' $HOME/.entangled/config/config.toml
    sed -i '' 's/timeout_prevote = "1s"/timeout_prevote = "500ms"/g' $HOME/.entangled/config/config.toml
    sed -i '' 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "200ms"/g' $HOME/.entangled/config/config.toml
    sed -i '' 's/timeout_precommit = "1s"/timeout_precommit = "500ms"/g' $HOME/.entangled/config/config.toml
    sed -i '' 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "200ms"/g' $HOME/.entangled/config/config.toml
    sed -i '' 's/timeout_commit = "5s"/timeout_commit = "1s"/g' $HOME/.entangled/config/config.toml
    sed -i '' 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "1s"/g' $HOME/.entangled/config/config.toml
else
    sed -i 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.entangled/config/config.toml
    sed -i 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' $HOME/.entangled/config/config.toml
    sed -i 's/timeout_propose = "3s"/timeout_propose = "1s"/g' $HOME/.entangled/config/config.toml
    sed -i 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "200ms"/g' $HOME/.entangled/config/config.toml
    sed -i 's/timeout_prevote = "1s"/timeout_prevote = "500ms"/g' $HOME/.entangled/config/config.toml
    sed -i 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "200ms"/g' $HOME/.entangled/config/config.toml
    sed -i 's/timeout_precommit = "1s"/timeout_precommit = "500ms"/g' $HOME/.entangled/config/config.toml
    sed -i 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "200ms"/g' $HOME/.entangled/config/config.toml
    sed -i 's/timeout_commit = "5s"/timeout_commit = "1s"/g' $HOME/.entangled/config/config.toml
    sed -i 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "1s"/g' $HOME/.entangled/config/config.toml
fi