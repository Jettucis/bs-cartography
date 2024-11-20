js = require('@eslint/js');
globals = require('globals');
module.exports = [
    {
        files: ['src/**/*.js'],
        languageOptions: {
            'ecmaVersion': 6,
            'sourceType': 'commonjs',
            globals: {
                ...globals.browser,
                L: false,
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            'indent': ['error', 4],
            'linebreak-style': ['error', 'windows'],
            'quotes': ['error', 'single'],
            'semi': ['error', 'never'],
            'eqeqeq': ['error', 'always'],
        }
    },
]