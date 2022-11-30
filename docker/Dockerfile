FROM golang:alpine AS build-env

# Set up dependencies
ENV PACKAGES git build-base

# Set working directory for the build
WORKDIR /go/src/github.com/Entangle-Protocol/entangle-blockchain

# Install dependencies
RUN apk add --update $PACKAGES
RUN apk add linux-headers

RUN apk add go
RUN apk add make


# Add source files
COPY . .

# Make the binary
RUN make build

# Final image
FROM alpine:3.16.2

# Install ca-certificates
RUN apk add --update ca-certificates jq
WORKDIR /

# Copy over binaries from the build-env
COPY --from=build-env /go/src/github.com/Entangle-Protocol/entangle-blockchain/build/entangled /usr/bin/entangled

# Run entangled by default
# CMD ["entangled"]

# COPY ./init.sh /
# RUN chmod +x /init.sh
# ENTRYPOINT ["/init.sh"]
# CMD ["true"]

COPY ./init_key.sh /
RUN chmod +x /init_key.sh
ENTRYPOINT ["/init_key.sh"]
CMD ["true"]

COPY --from=build-env $HOME/.entangled/keyring-file/validator_key.info /


