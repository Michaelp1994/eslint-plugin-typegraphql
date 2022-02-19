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

// eslint-disable-next-line no-debugger
ruleTester.run("input-type-name", rule, {
    valid: [
        // give me some code that won't trigger a warning
        {
            name: "validTypeName",
            code: `
      export class ConsultResolver {
          @Mutation(() => Boolean)
      SetMessage(@Arg("input") input: SetMessageInput,
      @Ctx() ctx: Context<AuthContext>): boolean {
      return true;
    }
  }`,
        },
    ],

    invalid: [
        {
            name: "invalidTypeName1",
            code: `
      export class ConsultResolver {
        @Mutation(() => Boolean)
        SetMessage(@Arg("input") input: InputMessage,
      @Ctx() ctx: Context<AuthContext>): boolean {
      return true;
    }
  }`,
            errors: [{ messageId: "errorStringGeneric" }],
        },
        {
            name: "invalidTypeName2",
            code: `
            export class ConsultResolver {
            @Mutation(() => Boolean)
            SetMessage(
                @Ctx() ctx: Context<AuthContext>,
                @Arg("input") input: InputMessage
            ): boolean {
                return true;
            }
        }`,
            errors: [{ messageId: "errorStringGeneric" }],
        },
    ],
});
