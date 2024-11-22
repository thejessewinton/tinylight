module.exports = {
  root: true,
  extends: ['custom'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js', 'dist', 'node_modules'],
}
