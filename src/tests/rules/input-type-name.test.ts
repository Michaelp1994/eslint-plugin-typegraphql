/* eslint-disable eslint-plugin/no-identical-tests */
/**
 * @fileoverview Require mutation argument to be always called &#34;input&#34; and input type to be called Mutation name + &#34;Input&#34;. Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.
 * @author Michael Poulgrain
 */
"use strict";
import rule from "../../lib/rules/input-type-name";
// import { RuleTester } from "eslint";
import { ESLintUtils } from "@typescript-eslint/utils";
const { RuleTester } = ESLintUtils;
// const rootDir = path.resolve(__dirname, '../fixtures');
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
});

ruleTester.run("input-type-name", rule, {
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
            name: "nameInOptions",
            code: `
      export class ConsultResolver {
          @Mutation(() => Boolean, {name: "SetMessage"})
      irrelevantName(@Arg("input") input: SetMessageInput,
      @Ctx() ctx: Context<AuthContext>): boolean {
      return true;
    }
  }`,
        },
        {
            name: "variableNameInOptions",
            code: `
            const variableName = "ImportantName";
      export class ConsultResolver {
          @Mutation(() => Boolean, {name: variableName})
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
