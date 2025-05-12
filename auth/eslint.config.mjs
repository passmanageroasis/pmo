import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: { globals: globals.node },
    },
    tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    globalIgnores(['dist/']),
]);
