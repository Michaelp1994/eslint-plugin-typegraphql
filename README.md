# eslint-plugin-typeorm

Linting rules for Typeorm

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-typeorm`:

```sh
npm install eslint-plugin-typeorm --save-dev
```

## Usage

Add `typeorm` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "typeorm"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "typeorm/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


