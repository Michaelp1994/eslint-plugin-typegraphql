/**
 * @fileoverview Require mutation argument to be always called &#34;input&#34; and input type to be called Mutation name + &#34;Input&#34;. Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.
 * @author Michael Poulgrain
 */
"use strict";
import rule from "../../lib/rules/input-name";
// import { RuleTester } from "eslint";
import { ESLintUtils } from "@typescript-eslint/utils";
const { RuleTester } = ESLintUtils;
// const rootDir = path.resolve(__dirname, '../fixtures');
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
    },
});

ruleTester.run("input-name", rule, {
    valid: [
        // give me some code that won't trigger a warning
        {
            name: "Test",
            code: `
      export class ConsultResolver {
          @Mutation(() => Boolean)
      create(@Arg("input") input: string,
      @Ctx() ctx: Context<AuthContext>): boolean {
      return true;
    }
  }`,
        },
    ],

    invalid: [
        {
            code: `
      export class ConsultResolver {
        @Mutation(() => Boolean)
      create(@Arg("wrongName") input: string,
      @Ctx() ctx: Context<AuthContext>): boolean {
      return true;
    }
  }`,
            errors: [{ messageId: "errorStringGeneric" }],
        },
        {
            code: `
            export class ConsultResolver {
            @Mutation(() => Boolean)
            create(
                @Ctx() ctx: Context<AuthContext>,
                @Arg("wrongName") input: CreateUserConsultInput
            ): boolean {
                return true;
            }
        }`,
            errors: [{ messageId: "errorStringGeneric" }],
        },
    ],
});
