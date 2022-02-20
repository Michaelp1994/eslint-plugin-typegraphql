import { ESLintUtils } from "@typescript-eslint/utils";

export const createRule = ESLintUtils.RuleCreator((name) => `https://github.com/Michaelp1994/eslint-plugin-typegraphql/blob/master/src/docs/rules/${name}.md`);
