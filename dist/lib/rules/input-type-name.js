/**
 * @fileoverview Require mutation argument to be always called "input" and input type to be called Mutation name + "Input". Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.
 * @author Michael Poulgrain
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const createRule_1 = require("../utils/createRule");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = (0, createRule_1.createRule)({
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
            description: 'Require mutation argument to be always called "input" and input type to be called Mutation name + "Input". Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.',
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
        const options = {
            caseSensitiveInputType: true,
            checkQueries: false,
            checkMutations: true,
            ...context.options[0],
        };
        function isMutation(node) {
            return node.decorators?.some((decorator) => decorator.expression.type === utils_1.AST_NODE_TYPES.CallExpression &&
                decorator.expression.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
                decorator.expression.callee.name === "Mutation");
        }
        function isQuery(node) {
            return node.decorators?.some((decorator) => decorator.expression.type === utils_1.AST_NODE_TYPES.CallExpression &&
                decorator.expression.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
                decorator.expression.callee.name === "Query");
        }
        function findArgDecorator(node) {
            return node.decorators?.find((decorator) => decorator.expression.type === utils_1.AST_NODE_TYPES.CallExpression &&
                decorator.expression.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
                decorator.expression.callee.name === "Arg");
        }
        return {
            async MethodDefinition(node) {
                if ((options.checkMutations && isMutation(node)) || (options.checkQueries && isQuery(node))) {
                    if (node.key.type !== utils_1.AST_NODE_TYPES.Identifier)
                        return;
                    const methodName = node.key.name;
                    const requiredParameterTypeName = methodName + "Input";
                    // now I know that this method has a mutation/query decorator.
                    // now find the parameter that has a decorator with a name Arg.
                    if (node.value.type !== utils_1.AST_NODE_TYPES.FunctionExpression)
                        return;
                    for (const parameter of node.value.params) {
                        if (!parameter.decorators || parameter.decorators.length === 0)
                            continue;
                        //I know it has decorators, but does it have Arg and which one is Arg?
                        const ArgDecorator = findArgDecorator(parameter);
                        if (!ArgDecorator)
                            continue;
                        if (parameter.type !== utils_1.AST_NODE_TYPES.Identifier ||
                            !parameter.typeAnnotation ||
                            parameter.typeAnnotation.type !== utils_1.AST_NODE_TYPES.TSTypeAnnotation ||
                            parameter.typeAnnotation.typeAnnotation.type !== utils_1.AST_NODE_TYPES.TSTypeReference ||
                            parameter.typeAnnotation.typeAnnotation.typeName.type !== utils_1.AST_NODE_TYPES.Identifier)
                            return;
                        const parameterTypeNameLiteral = parameter.typeAnnotation.typeAnnotation.typeName;
                        const parameterTypeName = parameter.typeAnnotation.typeAnnotation.typeName.name;
                        if (options.caseSensitiveInputType && parameterTypeName === requiredParameterTypeName)
                            return;
                        if (!options.caseSensitiveInputType && parameterTypeName.toLowerCase() === requiredParameterTypeName.toLowerCase())
                            return;
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
exports.default = rule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtdHlwZS1uYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9ydWxlcy9pbnB1dC10eXBlLW5hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBQ0gsWUFBWSxDQUFDOztBQUNiLG9EQUFvRTtBQUNwRSxvREFBaUQ7QUFRakQsZ0ZBQWdGO0FBQ2hGLGtCQUFrQjtBQUNsQixnRkFBZ0Y7QUFDaEYsTUFBTSxJQUFJLEdBQUcsSUFBQSx1QkFBVSxFQUFvQztJQUN2RCxJQUFJLEVBQUUsaUJBQWlCO0lBQ3ZCLGNBQWMsRUFBRTtRQUNaO1lBQ0ksc0JBQXNCLEVBQUUsSUFBSTtZQUM1QixZQUFZLEVBQUUsS0FBSztZQUNuQixjQUFjLEVBQUUsSUFBSTtTQUN2QjtLQUNKO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFlBQVk7UUFDbEIsY0FBYyxFQUFFLElBQUk7UUFDcEIsSUFBSSxFQUFFO1lBQ0YsV0FBVyxFQUNQLHVVQUF1VTtZQUMzVSxXQUFXLEVBQUUsS0FBSztTQUNyQjtRQUNELFFBQVEsRUFBRTtZQUNOLGtCQUFrQixFQUFFLHVEQUF1RDtZQUMzRSxnQkFBZ0IsRUFBRSwwQ0FBMEM7U0FDL0Q7UUFDRCw2Q0FBNkM7UUFDN0MsTUFBTSxFQUFFO1lBQ0o7Z0JBQ0ksSUFBSSxFQUFFLFFBQVE7Z0JBQ2Qsb0JBQW9CLEVBQUUsS0FBSztnQkFDM0IsVUFBVSxFQUFFO29CQUNSLHNCQUFzQixFQUFFO3dCQUNwQixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsSUFBSTtxQkFDaEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxLQUFLO3FCQUNqQjtvQkFDRCxjQUFjLEVBQUU7d0JBQ1osSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLElBQUk7cUJBQ2hCO2lCQUNKO2FBQ0o7U0FDSjtLQUNKO0lBRUQsTUFBTSxD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