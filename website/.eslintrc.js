module.exports = {
  root: true,
  extends: ["custom"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/restrict-template-expressions": "off",
  },
  ignorePatterns: [".eslintrc.js", "dist", "node_modules", ""],
};
