"use strict";

module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true,
        mocha: true,
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
    // overrides: [
    //     {
    //         files: ["*.ts"],
    //         env: { mocha: true, node: true },
    //         extends: ["plugin:@typescript-eslint/recommended"],
    //         parser: "@typescript-eslint/parser",
    //         parserOptions: {
    //             tsconfigRootDir: __dirname,
    //             project: ["./tsconfig.json"],
    //             include: ["src/**/*.ts"],
    //             ecmaVersion: "latest",
    //             sourceType: "module",
    //         },
    //     },
    // ],
};
