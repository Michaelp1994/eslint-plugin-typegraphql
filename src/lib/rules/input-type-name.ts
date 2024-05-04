/**
 * @fileoverview Require mutation argument to be always called "input" and input type to be called Mutation name + "Input". Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.
 * @author Michael Poulgrain
 */
"use strict";
import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils/createRule";
import { findNameInMutationDecorator } from "../utils/findNameInMutationDecorator";
import { findArgDecorator } from "../utils/findArgDecorator";
import { isMutation } from "../utils/isMutation";
import { isQuery } from "../utils/isQuery";

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
    name: "input-type-name",
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
            errorStringGeneric: `Input "{{name}}" should be called "{{suggestedName}}"`,
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

        return {
            async MethodDefinition(node) {
                if ((options.checkMutations && isMutation(node)) || (options.checkQueries && isQuery(node))) {
                    if (node.key.type !== AST_NODE_TYPES.Identifier) return;
                    const name = findNameInMutationDecorator(node);
                    const methodName = name ? name : node.key.name;
                    const requiredParameterTypeName = methodName + "Input";
                    // now I know that this method has a mutation/query decorator.
                    // now find the parameter that has a decorator with a name Arg.
                    if (node.value.type !== AST_NODE_TYPES.FunctionExpression) return;
                    for (const parameter of node.value.params) {
                        if (!parameter.decorators || parameter.decorators.length === 0) continue;
                        //I know it has decorators, but does it have Arg and which one is Arg?
                        const ArgDecorator = findArgDecorator(parameter);
                        if (!ArgDecorator) continue;
                        if (
                            parameter.type !== AST_NODE_TYPES.Identifier ||
                            !parameter.typeAnnotation ||
                            parameter.typeAnnotation.type !== AST_NODE_TYPES.TSTypeAnnotation ||
                            parameter.typeAnnotation.typeAnnotation.type !== AST_NODE_TYPES.TSTypeReference ||
                            parameter.typeAnnotation.typeAnnotation.typeName.type !== AST_NODE_TYPES.Identifier
                        )
                            return;

                        const parameterTypeNameLiteral = parameter.typeAnnotation.typeAnnotation.typeName;
                        const parameterTypeName = parameter.typeAnnotation.typeAnnotation.typeName.name;
                        if (options.caseSensitiveInputType && parameterTypeName === requiredParameterTypeName) return;
                        if (!options.caseSensitiveInputType && parameterTypeName.toLowerCase() === requiredParameterTypeName.toLowerCase()) return;
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
                                    fix: (fixer) => fixer.replaceText(parameterTypeNameLiteral, requiredParameterTypeName),
                                },
                            ],
                            data: {
                                name: parameterTypeName,
                                suggestedName: requiredParameterTypeName,
                            },
                        });
                    }
                }
            },
        };
    },
});

export default rule;
