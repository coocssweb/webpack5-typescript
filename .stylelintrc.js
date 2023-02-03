module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  rules: {
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'rule-empty-line-before': 'always',
    'plugin/declaration-block-no-ignored-properties': true,
  },
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  ignoreFiles: ['node_modules/**/*', 'build/**/*'],
};
