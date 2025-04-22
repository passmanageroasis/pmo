import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        files: ['**/*.{ts,js}'],
        languageOptions: { globals: globals.node },
        extends: [
            pluginJs.configs.recommended,
            ...tseslint.configs.recommended,
            eslintPluginPrettierRecommended,
        ],
        rules: {
            'no-dupe-keys': 'error',
        },
    },
);
