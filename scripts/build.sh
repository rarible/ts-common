set -e
yarn bootstrap
yarn clean
lerna run build
