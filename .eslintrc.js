module.exports = {
  extends: 'erb',
  plugins: ['react-hooks'],
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    }
  },
  rules: {
    'no-underscore-dangle': 0,
    'react/require-default-props': ['warn'],
    'at-rule-no-unknown': 0,
    'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',

    /* disable rules */
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'import/prefer-default-export': 'off'
    // 'scss/at-rule-no-unknown': 2
  }
};
