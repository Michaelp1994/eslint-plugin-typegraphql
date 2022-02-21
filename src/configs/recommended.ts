export = {
    parser: "@typescript-eslint/parser",
    parserOptions: { sourceType: "module" },
    plugins: ["@michaelp1994/typegraphql"],
    rules: {
        "@michaelp1994/typegraphql/input-name": "warn",
        "@michaelp1994/typegraphql/input-type-name": "warn",
        "@michaelp1994/typegraphql/require-description": "warn",
    },
};
