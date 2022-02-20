/* eslint-disable eslint-plugin/no-identical-tests */
/**
 * @fileoverview Require mutation argument to be always called &#34;input&#34; and input type to be called Mutation name + &#34;Input&#34;. Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.
 * @author Michael Poulgrain
 */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_type_name_1 = __importDefault(require("../../lib/rules/input-type-name"));
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
ruleTester.run("input-type-name", input_type_name_1.default, {
    valid: [
        // give me some code that won't trigger a warning
        {
            name: "defaultSettings",
            code: `
      export class ConsultResolver {
          @Mutation(() => Boolean)
      SetMessage(@Arg("input") input: SetMessageInput,
      @Ctx() ctx: Context<AuthContext>): boolean {
      return true;
    }
  }`,
        },
        {
            name: "checkMutationsOff",
            options: [
                {
                    checkMutations: false,
                },
            ],
            code: `
      export class ConsultResolver {
          @Mutation(() => Boolean)
      SetMessage(@Arg("input") input: InputMessage,
      @Ctx() ctx: Context<AuthContext>): boolean {
      return true;
    }
    @Query(() => Consult)
    User(
        @Arg("input", () => ID) input: UserInput,
        @Ctx() ctx: Context<AuthContext>
    ): boolean {
        return true;
    }
  }`,
        },
        {
            name: "caseSensitivity",
            options: [
                {
                    caseSensitiveInputType: false,
                },
            ],
            code: `
      export class ConsultResolver {
          @Mutation(() => Boolean)
      SetMessage(@Arg("input") input: SetMessageInput,
      @Ctx() ctx: Context<AuthContext>): boolean {
      return true;
    }
  }`,
        },
        {
            name: "caseSensitiveOff",
            options: [
                {
                    caseSensitiveInputType: false,
                },
            ],
            code: `
      export class ConsultResolver {
          @Mutation(() => Boolean)
      SetMessage(@Arg("input") input: setmessageinput,
      @Ctx() ctx: Context<AuthContext>): boolean {
      return true;
    }
  }`,
        },
        {
            name: "checkQueryOn",
            options: [
                {
                    checkQueries: true,
                },
            ],
            code: `
      export class ConsultResolver {
        @Query(() => Consult)
        User(
            @Arg("input", () => ID) input: UserInput,
            @Ctx() ctx: Context<AuthContext>
        ): boolean {
            return true;
        }
  }`,
        },
        {
            name: "checkQueryOnCaseSensitivityOff",
            options: [
                {
                    checkQueries: true,
                    caseSensitiveInputType: false,
                },
            ],
            code: `
      export class ConsultResolver {
        @Query(() => Consult)
        User(
            @Arg("input", () => ID) input: userinput,
            @Ctx() ctx: Context<AuthContext>
        ): boolean {
            return true;
        }
  }`,
        },
    ],
    invalid: [
        {
            name: "invalidMutation",
            code: `
      export class ConsultResolver {
        @Mutation(() => Boolean)
        SetMessage(@Arg("input") input: InputMessage,
      @Ctx() ctx: Context<AuthContext>): boolean {
      return true;
    }
    @Query(() => Consult)
    User(
        @Arg("input", () => ID) input: InputUser,
        @Ctx() ctx: Context<AuthContext>
    ): boolean {
        return true;
    }
  }`,
            errors: [{ messageId: "errorStringGeneric" }],
        },
        {
            name: "invalidQuery",
            options: [
                {
                    checkMutations: false,
                    checkQueries: true,
                },
            ],
            code: `
            export class ConsultResolver {
                @Mutation(() => Boolean)
                SetMessage(@Arg("input") input: InputMessage,
              @Ctx() ctx: Context<AuthContext>): boolean {
              return true;
            }
                @Query(() => Consult)
                User(
                    @Arg("input", () => ID) input: InputUser,
                    @Ctx() ctx: Context<AuthContext>
                ): boolean {
                    return true;
                }
          }`,
            errors: [{ messageId: "errorStringGeneric" }],
        },
        {
            name: "invalidCaseSensitivity",
            options: [{}],
            code: `
      export class ConsultResolver {
        @Mutation(() => Boolean)
        SetMessage(@Arg("input") input: setmessageinput,
      @Ctx() ctx: Context<AuthContext>): boolean {
      return true;
    }
  }`,
            errors: [{ messageId: "errorStringGeneric" }],
        },
        {
            name: "invalidQueryAndMutation",
            options: [
                {
                    checkQueries: true,
                    checkMutations: true,
                },
            ],
            code: `
            export class ConsultResolver {
                @Mutation(() => Boolean)
                SetMessage(@Arg("input") input: InputMessage,
              @Ctx() ctx: Context<AuthContext>): boolean {
              return true;
            }
                @Query(() => Consult)
                User(
                    @Arg("input", () => ID) input: InputUser,
                    @Ctx() ctx: Context<AuthContext>
                ): boolean {
                    return true;
                }
          }`,
            errors: [{ messageId: "errorStringGeneric" }, { messageId: "errorStringGeneric" }],
        },
        {
            name: "invalidTypeName2",
            options: [
                {
                    caseSensitiveInputType: true,
                    checkQueries: false,
                    checkMutations: true,
                },
            ],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtdHlwZS1uYW1lLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvcnVsZXMvaW5wdXQtdHlwZS1uYW1lLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JEOzs7R0FHRztBQUNILFlBQVksQ0FBQzs7Ozs7QUFDYixzRkFBbUQ7QUFDbkQsdUNBQXVDO0FBQ3ZDLG9EQUF1RDtBQUN2RCxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsbUJBQVcsQ0FBQztBQUNuQywwREFBMEQ7QUFDMUQsZ0ZBQWdGO0FBQ2hGLFFBQVE7QUFDUixnRkFBZ0Y7QUFFaEYsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUM7SUFDOUIsTUFBTSxFQUFFLDJCQUEyQjtDQUN0QyxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLHlCQUFJLEVBQUU7SUFDcEMsS0FBSyxFQUFFO1FBQ0gsaURBQWlEO1FBQ2pEO1lBQ0ksSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixJQUFJLEVBQUU7Ozs7Ozs7SUFPZDtTQUNLO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLE9BQU8sRUFBRTtnQkFDTDtvQkFDSSxjQUFjLEVBQUUsS0FBSztpQkFDeEI7YUFDSjtZQUNELElBQUksRUFBRTs7Ozs7Ozs7Ozs7Ozs7SUFjZDtTQUNLO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLE9BQU8sRUFBRTtnQkFDTDtvQkFDSSxzQkFBc0IsRUFBRSxLQUFLO2lCQUNoQzthQUNKO1lBQ0QsSUFBSSxFQUFFOzs7Ozs7O0lBT2Q7U0FDSztRQUNEO1lBQ0ksSUFBSSxFQUFFLGtCQUFrQjtZQUN4QixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksc0JBQXNCLEVBQUUsS0FBSztpQkFDaEM7YUFDSjtZQUNELElBQUksRUFBRTs7Ozs7OztJQU9kO1NBQ0s7UUFDRDtZQUNJLElBQUksRUFBRSxjQUFjO1lBQ3BCLE9BQU8sRUFBRTtnQkFDTDtvQkFDSSxZQUFZLEVBQUUsSUFBSTtpQkFDckI7YUFDSjtZQUNELElBQUksRUFBRTs7Ozs7Ozs7O0lBU2Q7U0FDSztRQUNEO1lBQ0ksSUFBSSxFQUFFLGdDQUFnQztZQUN0QyxPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksWUFBWSxFQUFFLElBQUk7b0JBQ2xCLHNCQUFzQixFQUFFLEtBQUs7aUJBQ2hDO2FBQ0o7WUFDRCxJQUFJLEVBQUU7Ozs7Ozs7OztJQVNkO1NBQ0s7S0FDSjtJQUVELE9BQU8sRUFBRTtRQUNMO1lBQ0ksSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixJQUFJLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0lBY2Q7WUFDUSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDO1NBQ2hEO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsY0FBYztZQUNwQixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksY0FBYyxFQUFFLEtBQUs7b0JBQ3JCLFlBQVksRUFBRSxJQUFJO2lCQUNyQjthQUNKO1lBQ0QsSUFBSSxFQUFFOzs7Ozs7Ozs7Ozs7OztZQWNOO1lBQ0EsTUFBTSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQztTQUNoRDtRQUNEO1lBQ0ksSUFBSSxFQUFFLHdCQUF3QjtZQUM5QixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDYixJQUFJLEVBQUU7Ozs7Ozs7SUFPZDtZQUNRLE1BQU0sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLENBQUM7U0FDaEQ7UUFFRDtZQUNJLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsT0FBTyxFQUFFO2dCQUNMO29CQUNJLFlBQVksRUFBRSxJQUFJO29CQUNsQixjQUFjLEVBQUUsSUFBSTtpQkFDdkI7YUFDSjtZQUNELElBQUksRUFBRTs7Ozs7Ozs7Ozs7Ozs7WUFjTjtZQUNBLE1BQU0sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQztTQUNyRjtRQUNEO1lBQ0ksSUFBSSxFQUFFLGtCQUFrQjtZQUN4QixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksc0JBQXNCLEVBQUUsSUFBSTtvQkFDNUIsWUFBWSxFQUFFLEtBQUs7b0JBQ25CLGNBQWMsRUFBRSxJQUFJO2lCQUN2QjthQUNKO1lBQ0QsSUFBSSxFQUFFOzs7Ozs7Ozs7VUFTUjtZQUNFLE1BQU0sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLENBQUM7U0FDaEQ7S0FDSjtDQUNKLENBQUMsQ0FBQyJ9