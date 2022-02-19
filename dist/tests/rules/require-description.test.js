/**
 * @fileoverview Enforce descriptions in type definitions and operations.
 * @author Michael Poulgrain
 */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const require_description_1 = __importDefault(require("../../lib/rules/require-description"));
const utils_1 = require("@typescript-eslint/utils");
const { RuleTester } = utils_1.ESLintUtils;
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
ruleTester.run("require-description", require_description_1.default, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZS1kZXNjcmlwdGlvbi50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3RzL3J1bGVzL3JlcXVpcmUtZGVzY3JpcHRpb24udGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxZQUFZLENBQUM7Ozs7O0FBRWIsZ0ZBQWdGO0FBQ2hGLGVBQWU7QUFDZixnRkFBZ0Y7QUFFaEYsOEZBQXVEO0FBQ3ZELG9EQUF1RDtBQUN2RCxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsbUJBQVcsQ0FBQztBQUNuQyxnRkFBZ0Y7QUFDaEYsUUFBUTtBQUNSLGdGQUFnRjtBQUVoRixNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQztJQUM5QixNQUFNLEVBQUUsMkJBQTJCO0lBQ25DLGFBQWEsRUFBRTtRQUNYLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsZUFBZSxFQUFFLFNBQVM7S0FDN0I7Q0FDSixDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLDZCQUFJLEVBQUU7SUFDeEMsS0FBSyxFQUFFO1FBQ0g7WUFDSSxJQUFJLEVBQUU7Ozs7UUFJVjtTQUNDO1FBQ0Q7WUFDSSxJQUFJLEVBQUU7Ozs7TUFJWjtTQUNHO1FBQ0Q7WUFDSSxJQUFJLEVBQUU7Ozs7TUFJWjtTQUNHO1FBQ0Q7WUFDSSxJQUFJLEVBQUU7Ozs7TUFJWjtTQUNHO1FBQ0Q7WUFDSSxJQUFJLEVBQUU7Ozs7TUFJWjtTQUNHO1FBQ0Q7WUFDSSxJQUFJLEVBQUU7O01BRVo7U0FDRztLQUNKO0lBRUQsT0FBTyxFQUFFO1FBQ0w7WUFDSSxJQUFJLEVBQUU7Ozs7UUFJVjtZQUNJLE1BQU0sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixFQUFFLENBQUM7U0FDcEQ7UUFDRDtZQUNJLElBQUksRUFBRTs7OztRQUlWO1lBQ0ksTUFBTSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQztTQUN0RDtRQUNEO1lBQ0ksSUFBSSxFQUFFOztRQUVWO1lBQ0ksTUFBTSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQztTQUNwRDtLQUNKO0NBQ0osQ0FBQyxDQUFDIn0=