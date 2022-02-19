/**
 * @fileoverview Enforce descriptions in type definitions and operations.
 * @author Michael Poulgrain
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "../../lib/rules/require-description";
import { ESLintUtils } from "@typescript-eslint/utils";
const { RuleTester } = ESLintUtils;
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
ruleTester.run("require-description", rule, {
    valid: [
        {
            code: `@ObjectType({ description: "The consult/case model" })
      export class CreateConsultInput {
        test: string;
        test2: string
      }`,
        },
        {
            code: `@Entity
    export class CreateConsultInput {
      test: string;
      test2: string
    }`,
        },
        {
            code: `
    export class CreateConsultInput {
      test: string;
      test2: string
    }`,
        },
        {
            code: `@ObjectType({ name: "CreateConsultInput", description: "The consult/case model" })
    export class CreateConsultInput {
      test: string;
      test2: string
    }`,
        },
        {
            code: `@ObjectType("TestName", { description: "The consult/case model" })
    export class CreateConsultInput {
      test: string;
      test2: string
    }`,
        },
        {
            code: `@InputType({ description: "Input for creating consult by admin" })
    export class CreateConsultInput {
    }`,
        },
    ],

    invalid: [
        {
            code: `@ObjectType()
      export class CreateConsultInput {
        test: string;
        test2: string
      }`,
            errors: [{ messageId: "errorStringNoArguments" }],
        },
        {
            code: `@ObjectType({ name: "CreateConsultInput" })
      export class CreateConsultInput {
        test: string;
        test2: string
      }`,
            errors: [{ messageId: "errorStringNoDescription" }],
        },
        {
            code: `@InputType()
      export class CreateConsultInput {
      }`,
            errors: [{ messageId: "errorStringNoArguments" }],
        },
    ],
});
