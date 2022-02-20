# eslint-plugin-typegraphql

Linting rules for TypeGraphQL

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-typeorm`:

```sh
npm install eslint-plugin-typegraphql --save-dev
```

## Usage

Add `graphql` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["typegraphql"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "typegraphql/input-name": 1,
        "typegraphql/input-type-name": 1,
        "typegraphql/require-description": 1
    }
}
```

## Supported Rules

-   Fill in provided rules here
