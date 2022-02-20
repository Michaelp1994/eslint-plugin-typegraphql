/**
 * @fileoverview Require mutation argument to be always called "input" and input type to be called Mutation name + "Input". Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.
 * @author Michael Poulgrain
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createRule_1 = require("../utils/createRule");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = (0, createRule_1.createRule)({
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
            description: 'Require mutation argument to be always called "input" and input type to be called Mutation name + "Input". Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.',
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
        const options = {
            checkQueries: false,
            checkMutations: true,
            ...context.options[0],
        };
        function isMutation(node) {
            return node.decorators?.some((decorator) => decorator.expression.type === "CallExpression" && decorator.expression.callee.type === "Identifier" && decorator.expression.callee.name === "Mutation");
        }
        function isQuery(node) {
            return node.decorators?.some((decorator) => decorator.expression.type === "CallExpression" && decorator.expression.callee.type === "Identifier" && decorator.expression.callee.name === "Query");
        }
        function findArgDecorator(node) {
            return node.decorators?.find((decorator) => decorator.expression.type === "CallExpression" && decorator.expression.callee.type === "Identifier" && decorator.expression.callee.name === "Arg");
        }
        return {
            MethodDefinition(node) {
                if ((options.checkMutations && !isMutation(node)) || (options.checkQueries && !isQuery(node)))
                    return null;
                // now I know that this method has a mutation/query decorator.
                // now find the parameter that has a decorator with a name Arg.
                if (node.value.type !== "FunctionExpression")
                    return;
                for (const parameter of node.value.params) {
                    if (!parameter.decorators || parameter.decorators.length === 0)
                        continue;
                    //I know it has decorators, but does it have Arg and which one is Arg?
                    const ArgDecorator = findArgDecorator(parameter);
                    if (!ArgDecorator)
                        continue;
                    //Definately an Arg Decorator now.
                    if (ArgDecorator.expression.type !== "CallExpression" || !ArgDecorator.expression.arguments[0] || ArgDecorator.expression.arguments[0].type !== "Literal")
                        return;
                    // I know  that the parameter has a decorator with Arg now, so I need to check if the decorator has an argument with "input"
                    const ArgDecoratorNameNode = ArgDecorator.expression.arguments[0];
                    const ArgDecoratorName = ArgDecoratorNameNode.value;
                    if (ArgDecoratorName === "input")
                        return;
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
exports.default = rule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcnVsZXMvaW5wdXQtbmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxZQUFZLENBQUM7O0FBRWIsb0RBQWlEO0FBUWpELGdGQUFnRjtBQUNoRixrQkFBa0I7QUFDbEIsZ0ZBQWdGO0FBQ2hGLE1BQU0sSUFBSSxHQUFHLElBQUEsdUJBQVUsRUFBb0M7SUFDdkQsSUFBSSxFQUFFLFlBQVk7SUFDbEIsY0FBYyxFQUFFO1FBQ1o7WUFDSSxZQUFZLEVBQUUsS0FBSztZQUNuQixjQUFjLEVBQUUsSUFBSTtTQUN2QjtLQUNKO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFlBQVk7UUFDbEIsY0FBYyxFQUFFLElBQUk7UUFDcEIsSUFBSSxFQUFFO1lBQ0YsV0FBVyxFQUNQLHVVQUF1VTtZQUMzVSxXQUFXLEVBQUUsS0FBSztTQUNyQjtRQUNELFFBQVEsRUFBRTtZQUNOLGtCQUFrQixFQUFFLDJDQUEyQztZQUMvRCxZQUFZLEVBQUUsOEJBQThCO1NBQy9DO1FBQ0QsNkNBQTZDO1FBQzdDLE1BQU0sRUFBRTtZQUNKO2dCQUNJLElBQUksRUFBRSxRQUFRO2dCQUNkLG9CQUFvQixFQUFFLEtBQUs7Z0JBQzNCLFVBQVUsRUFBRTtvQkFDUixzQkFBc0IsRUFBRTt3QkFDcEIsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLElBQUk7cUJBQ2hCO29CQUNELFlBQVksRUFBRTt3QkFDVixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsS0FBSztxQkFDakI7b0JBQ0QsY0FBYyxFQUFFO3dCQUNaLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxJQUFJO3FCQUNoQjtpQkFDSjthQUNKO1NBQ0o7S0FDSjtJQUVELE1BQU0sQ0FBQyxPQUFPO1FBQ1YsTUFBTSxPQUFPLEdBQXdCO1lBQ2pDLFlBQVksRUFBRSxLQUFL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