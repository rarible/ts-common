set -e
yarn bootstrap
yarn clean
yarn run build-types
yarn run build-utils
yarn run build-test-provider
yarn run build-action
yarn run build-estimate-middleware
yarn run build-logger
