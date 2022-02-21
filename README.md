# eslint-plugin-typegraphql

Linting rules for TypeGraphQL

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@michaelp1994/eslint-plugin-typegraphql`:

```sh
npm install @michaelp1994/eslint-plugin-typegraphql --save-dev
```

## Usage

This is based on the rules of [graphql-esllint](https://github.com/B2o5T/graphql-eslint) but for TypegraphQL where they can be applied.

Add `graphql` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["@michaelp1994/typegraphql"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@michaelp1994/typegraphql/input-name": 1,
        "@michaelp1994/typegraphql/input-type-name": 1,
        "@michaelp1994/typegraphql/require-description": 1
    }
}
```

## Config usage

Alternatively, you can use the config as follows:

```json
{
    "extends": ["plugin:@michaelp1994/typegraphql/recommended"]
}
```

## Supported Rules

-   Fill in provided rules here
