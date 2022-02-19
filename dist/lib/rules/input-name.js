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
            checkInputType: false,
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
            errorStringGeneric: `Input "{{name}}" should be called "input"`,
            fixParameter: `Change "{{name}}" to "input"`,
        },
        //fixable: null, // Or `code` or `whitespace`
        schema: [
            {
                type: "object",
                additionalProperties: false,
                properties: {
                    checkInputType: {
                        type: "boolean",
                        default: false,
                    },
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
            checkInputType: false,
            caseSensitiveInputType: true,
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
        // function isArgDecorator(node) {
        // }
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
                    const ArgDecorator = parameter.decorators.find((decorator) => decorator.expression.type === "CallExpression" && decorator.expression.callee.type === "Identifier" && decorator.expression.callee.name === "Arg");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcnVsZXMvaW5wdXQtbmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxZQUFZLENBQUM7O0FBRWIsb0RBQWlEO0FBVWpELGdGQUFnRjtBQUNoRixrQkFBa0I7QUFDbEIsZ0ZBQWdGO0FBQ2hGLE1BQU0sSUFBSSxHQUFHLElBQUEsdUJBQVUsRUFBb0M7SUFDdkQsSUFBSSxFQUFFLFlBQVk7SUFDbEIsY0FBYyxFQUFFO1FBQ1o7WUFDSSxjQUFjLEVBQUUsS0FBSztZQUNyQixzQkFBc0IsRUFBRSxJQUFJO1lBQzVCLFlBQVksRUFBRSxLQUFLO1lBQ25CLGNBQWMsRUFBRSxJQUFJO1NBQ3ZCO0tBQ0o7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsWUFBWTtRQUNsQixjQUFjLEVBQUUsSUFBSTtRQUNwQixJQUFJLEVBQUU7WUFDRixXQUFXLEVBQ1AsdVVBQXVVO1lBQzNVLFdBQVcsRUFBRSxLQUFLO1NBQ3JCO1FBQ0QsUUFBUSxFQUFFO1lBQ04sa0JBQWtCLEVBQUUsMkNBQTJDO1lBQy9ELFlBQVksRUFBRSw4QkFBOEI7U0FDL0M7UUFDRCw2Q0FBNkM7UUFDN0MsTUFBTSxFQUFFO1lBQ0o7Z0JBQ0ksSUFBSSxFQUFFLFFBQVE7Z0JBQ2Qsb0JBQW9CLEVBQUUsS0FBSztnQkFDM0IsVUFBVSxFQUFFO29CQUNSLGNBQWMsRUFBRTt3QkFDWixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsS0FBSztxQkFDakI7b0JBQ0Qsc0JBQXNCLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxJQUFJO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLEtBQUs7cUJBQ2pCO29CQUNELGNBQWMsRUFBRTt3QkFDWixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsSUFBSTtxQkFDaEI7aUJBQ0o7YUFDSjtTQUNKO0tBQ0o7SUFFRCxNQUFNLENBQUMsT0FBTztRQUNWLE1BQU0sT0FBTyxHQUF3QjtZQUNqQyxjQUFjLEVBQUUsS0FBSztZQUNyQixzQkFBc0IsRUFBRSxJQUFJO1lBQzVCLFlBQVksRUFBRSxLQUFLO1lBQ25CLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDeEIsQ0FBQztRQUNGLFNBQVMsVUFBVSxDQUFDLElBQStCO1lBQy9DLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQ3hCLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FDVixTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxnQkFBZ0IsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBWSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLENBQzdKLENBQUM7UUFDTixDQUFDO1FBRUQsU0FBUyxPQUFPLENBQUMsSUFBK0I7WUFDNUMsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FDeEIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLGdCQUFnQixJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FDckssQ0FBQztRQUNOLENBQUM7UUFFRCxrQ0FBa0M7UUFFbEMsSUFBSTtRQUNKLE9BQU87WUFDSCxnQkFBZ0IsQ0FBQyxJQUErQjtnQkFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBQzNHLDhEQUE4RDtnQkFDOUQsK0RBQStEO2dCQUMvRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLG9CQUFvQjtvQkFBRSxPQUFPO2dCQUNyRCxLQUFLLE1BQU0sU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDO3dCQUFFLFNBQVM7b0JBQ3pFLHNFQUFzRTtvQkFDdEUsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQzFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FDVixTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxnQkFBZ0IsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBWSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxLQUFLLENBQ3hKLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFlBQVk7d0JBQUUsU0FBUztvQkFDNUIsa0NBQWtDO29CQUNsQyxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLGdCQUFnQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVM7d0JBQ3JKLE9BQU87b0JBQ1gsNEhBQTRIO29CQUM1SCxNQUFNLG9CQUFvQixHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRSxNQUFNLGdCQUFnQixHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztvQkFDcEQsSUFBSSxnQkFBZ0IsS0FBSyxPQUFPO3dCQUFFLE9BQU87b0JBQ3pDLHdDQUF3QztvQkFDeEMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO3dCQUNsQixJQUFJLEVBQUUsb0JBQW9CO3dCQUMxQixTQUFTLEVBQUUsb0JBQW9CO3dCQUMvQixPQUFPLEVBQUU7NEJBQ0w7Z0NBQ0ksU0FBUyxFQUFFLGNBQWM7Z0NBQ3pCLElBQUksRUFBRTtvQ0FDRixJQUFJLEVBQUUsZ0JBQWdCO2lDQUN6QjtnQ0FDRCxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsU0FBUyxDQUFDOzZCQUNyRTt5QkFDSjt3QkFDRCxJQUFJLEVBQUU7NEJBQ0YsSUFBSSxFQUFFLGdCQUFnQjt5QkFDekI7cUJBQ0osQ0FBQyxDQUFDO2lCQUNOO1lBQ0wsQ0FBQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyxDQUFDO0FBRUgsa0JBQWUsSUFBSSxDQUFDIn0=