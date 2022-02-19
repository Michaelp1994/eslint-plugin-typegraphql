/**
 * @fileoverview Require mutation argument to be always called "input" and input type to be called Mutation name + "Input". Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.
 * @author Michael Poulgrain
 */
"use strict";
import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils/createRule";

type InputNameRuleConfig = {
    caseSensitiveInputType?: boolean;
    checkQueries?: boolean;
    checkMutations?: boolean;
};
type MessageIds = "errorStringGeneric" | "fixParameterType";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = createRule<[InputNameRuleConfig], MessageIds>({
    name: "input-name",
    defaultOptions: [
        {
            caseSensitiveInputType: true,
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
            fixParameterType: `Change "{{name}}" to "{{suggestedName}}"`,
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
            caseSensitiveInputType: true,
            checkQueries: false,
            checkMutations: true,
            ...context.options[0],
        };
        function isMutation(node: TSESTree.MethodDefinition) {
            return node.decorators?.some(
                (decorator) =>
                    decorator.expression.type === AST_NODE_TYPES.CallExpression &&
                    decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
                    decorator.expression.callee.name === "Mutation"
            );
        }

        function isQuery(node: TSESTree.MethodDefinition) {
            return node.decorators?.some(
                (decorator) =>
                    decorator.expression.type === AST_NODE_TYPES.CallExpression &&
                    decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
                    decorator.expression.callee.name === "Query"
            );
        }

        function findArgDecorator(node: TSESTree.Parameter) {
            return node.decorators?.find(
                (decorator) =>
                    decorator.expression.type === AST_NODE_TYPES.CallExpression &&
                    decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
                    decorator.expression.callee.name === "Arg"
            );
        }
        console.debug("test1");
        return {
            MethodDefinition(node: TSESTree.MethodDefinition) {
                console.debug("test1");

                if ((options.checkMutations && !isMutation(node)) || (options.checkQueries && !isQuery(node))) return null;
                console.debug("test1");

                if (node.key.type !== AST_NODE_TYPES.Identifier) return;
                console.debug("test1");

                const methodName = node.key.name;
                const requiredParameterTypeName = methodName + "Input";
                // now I know that this method has a mutation/query decorator.
                // now find the parameter that has a decorator with a name Arg.
                console.debug("test1");
                if (node.value.type !== AST_NODE_TYPES.FunctionExpression) return;
                for (const parameter of node.value.params) {
                    if (!parameter.decorators || parameter.decorators.length === 0) continue;
                    //I know it has decorators, but does it have Arg and which one is Arg?
                    const ArgDecorator = findArgDecorator(parameter);
                    if (!ArgDecorator) continue;
                    console.debug("test2");

                    if (
                        parameter.type !== AST_NODE_TYPES.Identifier ||
                        !parameter.typeAnnotation ||
                        parameter.typeAnnotation.type !== AST_NODE_TYPES.TSTypeAnnotation ||
                        parameter.typeAnnotation.typeAnnotation.type !== AST_NODE_TYPES.TSTypeReference ||
                        parameter.typeAnnotation.typeAnnotation.typeName.type !== AST_NODE_TYPES.Identifier
                    )
                        return;
                    console.debug("test3");

                    const parameterTypeNameLiteral = parameter.typeAnnotation.typeAnnotation.typeName;
                    const parameterTypeName = parameter.typeAnnotation.typeAnnotation.typeName.name;

                    if (parameterTypeName === requiredParameterTypeName) return;
                    console.debug("test4");

                    return context.report({
                        node: parameterTypeNameLiteral,
                        messageId: "errorStringGeneric",
                        suggest: [
                            {
                                messageId: "fixParameterType",
                                data: {
                                    name: parameterTypeName,
                                    suggestedName: requiredParameterTypeName,
                                },
                                fix: (fixer) => fixer.replaceText(parameterTypeNameLiteral, `"${requiredParameterTypeName}"`),
                            },
                        ],
                        data: {
                            name: node,
                        },
                    });
                }
            },
        };
    },
});

export default rule;
