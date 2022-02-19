"use strict";

module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true,
        jest: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:eslint-plugin/recommended",
        // "plugin:node/recommended",
    ],
};
