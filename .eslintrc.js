module.exports = {
  extends: ["./packages/eslint-ts", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },
}
