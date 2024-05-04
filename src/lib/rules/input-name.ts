/**
 * @fileoverview Require mutation argument to be always called "input" and input type to be called Mutation name + "Input". Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.
 * @author Michael Poulgrain
 */
"use strict";
import type { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/createRule";
import { findArgDecorator } from "../utils/findArgDecorator";
import { isMutation } from "../utils/isMutation";
import { isQuery } from "../utils/isQuery";

type InputNameRuleConfig = {
    checkQueries?: boolean;
    checkMutations?: boolean;
};
type MessageIds = "errorStringGeneric" | "fixParameter";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = createRule<[InputNameRuleConfig], MessageIds>({
    name: "input-name",
    defaultOptions: [
        {
            checkQueries: false,
            checkMutations: true,
        },
    ],
    meta: {
        type: "suggestion",
        hasSuggestions: true,
        docs: {
            description:
                'Require mutation argument to be always called "input" and input type to be called Mutation name + "Input". Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.',
            recommended: false,
        },
        messages: {
            errorStringGeneric: `Input "{{name}}" should be called "input"`,
            fixParameter: `Change "{{name}}" to "input"`,
        },
        //fixable: null, // Or `code` or `whitespace`
        schema: [
            {
                type: "object",
                additionalProperties: false,
                properties: {
                    caseSensitiveInputType: {
                        type: "boolean",
                        default: true,
                    },
                    checkQueries: {
                        type: "boolean",
                        default: false,
                    },
                    checkMutations: {
                        type: "boolean",
                        default: true,
                    },
                },
            },
        ],
    },

    create(context) {
        const options: InputNameRuleConfig = {
            checkQueries: false,
            checkMutations: true,
            ...context.options[0],
        };

        return {
            MethodDefinition(node: TSESTree.MethodDefinition) {
                if ((options.checkMutations && !isMutation(node)) || (options.checkQueries && !isQuery(node))) return null;
                // now I know that this method has a mutation/query decorator.
                // now find the parameter that has a decorator with a name Arg.
                if (node.value.type !== "FunctionExpression") return;
                for (const parameter of node.value.params) {
                    if (!parameter.decorators || parameter.decorators.length === 0) continue;
                    //I know it has decorators, but does it have Arg and which one is Arg?
                    const ArgDecorator = findArgDecorator(parameter);
                    if (!ArgDecorator) continue;
                    //Definately an Arg Decorator now.
                    if (ArgDecorator.expression.type !== "CallExpression" || !ArgDecorator.expression.arguments[0] || ArgDecorator.expression.arguments[0].type !== "Literal")
                        return;
                    // I know  that the parameter has a decorator with Arg now, so I need to check if the decorator has an argument with "input"
                    const ArgDecoratorNameNode = ArgDecorator.expression.arguments[0];
                    const ArgDecoratorName = ArgDecoratorNameNode.value;
                    if (ArgDecoratorName === "input") return;
                    //The first argument is not named input.
                    return context.report({
                        node: ArgDecoratorNameNode,
                        messageId: "errorStringGeneric",
                        suggest: [
                            {
                                messageId: "fixParameter",
                                data: {
                                    name: ArgDecoratorName,
                                },
                                fix: (fixer) => fixer.replaceText(ArgDecoratorNameNode, `"input"`),
                            },
                        ],
                        data: {
                            name: ArgDecoratorName,
                        },
                    });
                }
            },
        };
    },
});

export default rule;
