/**
 * @fileoverview Require mutation argument to be always called &#34;input&#34; and input type to be called Mutation name + &#34;Input&#34;. Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.
 * @author Michael Poulgrain
 */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_name_1 = __importDefault(require("../../lib/rules/input-name"));
// import { RuleTester } from "eslint";
const utils_1 = require("@typescript-eslint/utils");
const { RuleTester } = utils_1.ESLintUtils;
// const rootDir = path.resolve(__dirname, '../fixtures');
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
});
ruleTester.run("input-name", input_name_1.default, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbmFtZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3RzL3J1bGVzL2lucHV0LW5hbWUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxZQUFZLENBQUM7Ozs7O0FBQ2IsNEVBQThDO0FBQzlDLHVDQUF1QztBQUN2QyxvREFBdUQ7QUFDdkQsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLG1CQUFXLENBQUM7QUFDbkMsMERBQTBEO0FBQzFELGdGQUFnRjtBQUNoRixRQUFRO0FBQ1IsZ0ZBQWdGO0FBRWhGLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDO0lBQzlCLE1BQU0sRUFBRSwyQkFBMkI7Q0FDdEMsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsb0JBQUksRUFBRTtJQUMvQixLQUFLLEVBQUU7UUFDSCxpREFBaUQ7UUFDakQ7WUFDSSxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRTs7Ozs7OztJQU9kO1NBQ0s7S0FDSjtJQUVELE9BQU8sRUFBRTtRQUNMO1lBQ0ksSUFBSSxFQUFFOzs7Ozs7O0lBT2Q7WUFDUSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDO1NBQ2hEO1FBQ0Q7WUFDSSxJQUFJLEVBQUU7Ozs7Ozs7OztVQVNSO1lBQ0UsTUFBTSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQztTQUNoRDtLQUNKO0NBQ0osQ0FBQyxDQUFDIn0=