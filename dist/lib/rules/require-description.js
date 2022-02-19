/**
 * @fileoverview Enforce descriptions in type definitions and operations.
 * @author Michael Poulgrain
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createRule_1 = require("../utils/createRule");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = (0, createRule_1.createRule)({
    name: "require-description",
    defaultOptions: [{ default: "array" }],
    meta: {
        type: "problem",
        docs: {
            description: "Enforce descriptions in type definitions and operations.",
            recommended: false,
        },
        messages: {
            errorStringNoArguments: `No arguments on {{name}}`,
            errorStringNoDescription: `No description in property of {{name}}`,
        },
        schema: [], // Add a schema if the rule has options
    },
    create(context) {
        // variables should be defined here
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        // any helper functions should go here or else delete this section
        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            ClassDeclaration(node) {
                //if (node.decorators)
                node.decorators?.forEach((decorator) => {
                    const expression = decorator.expression;
                    if (expression.type === "CallExpression" &&
                        expression.callee.type === "Identifier" &&
                        (expression.callee.name === "ObjectType" || expression.callee.name === "InputType")) {
                        const expressionName = expression.callee.name;
                        if (expression.arguments.length === 0)
                            return context.report({
                                node: decorator,
                                messageId: "errorStringNoArguments",
                                data: {
                                    name: expressionName,
                                },
                            });
                        const optionsIndex = expression.arguments.length === 1 ? 0 : 1;
                        const argument = expression.arguments[optionsIndex];
                        if (argument && argument.type === "ObjectExpression") {
                            const descriptionIndex = argument.properties.findIndex((property) => {
                                return property.type === "Property" && property.key.type === "Identifier" && property.key.name === "description";
                            });
                            if (descriptionIndex === -1)
                                return context.report({
                                    node: argument,
                                    messageId: "errorStringNoDescription",
                                    data: {
                                        name: expressionName,
                                    },
                                });
                        }
                    }
                });
            },
        };
    },
});
exports.default = rule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZS1kZXNjcmlwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcnVsZXMvcmVxdWlyZS1kZXNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxZQUFZLENBQUM7O0FBRWIsb0RBQWlEO0FBVWpELGdGQUFnRjtBQUNoRixrQkFBa0I7QUFDbEIsZ0ZBQWdGO0FBRWhGLE1BQU0sSUFBSSxHQUFHLElBQUEsdUJBQVUsRUFBc0I7SUFDekMsSUFBSSxFQUFFLHFCQUFxQjtJQUMzQixjQUFjLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN0QyxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsU0FBUztRQUNmLElBQUksRUFBRTtZQUNGLFdBQVcsRUFBRSwwREFBMEQ7WUFDdkUsV0FBVyxFQUFFLEtBQUs7U0FDckI7UUFDRCxRQUFRLEVBQUU7WUFDTixzQkFBc0IsRUFBRSwwQkFBMEI7WUFDbEQsd0JBQXdCLEVBQUUsd0NBQXdDO1NBQ3JFO1FBQ0QsTUFBTSxFQUFFLEVBQUUsRUFBRSx1Q0FBdUM7S0FDdEQ7SUFFRCxNQUFNLENBQUMsT0FBTztRQUNWLG1DQUFtQztRQUVuQyx3RUFBd0U7UUFDeEUsVUFBVTtRQUNWLHdFQUF3RTtRQUV4RSxrRUFBa0U7UUFFbEUsd0VBQXdFO1FBQ3hFLFNBQVM7UUFDVCx3RUFBd0U7UUFFeEUsT0FBTztZQUNILGdCQUFnQixDQUFDLElBQStCO2dCQUM1QyxzQkFBc0I7Z0JBQ3RCLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQ25DLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUM7b0JBQ3hDLElBQ0ksVUFBVSxDQUFDLElBQUksS0FBSyxnQkFBZ0I7d0JBQ3BDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFlBQVk7d0JBQ3ZDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBWSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxFQUNyRjt3QkFDRSxNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDOUMsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDOzRCQUNqQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0NBQ2xCLElBQUksRUFBRSxTQUFTO2dDQUNmLFNBQVMsRUFBRSx3QkFBd0I7Z0NBQ25DLElBQUksRUFBRTtvQ0FDRixJQUFJLEVBQUUsY0FBYztpQ0FDdkI7NkJBQ0osQ0FBQyxDQUFDO3dCQUNQLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQy9ELE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3BELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssa0JBQWtCLEVBQUU7NEJBQ2xELE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQ0FDaEUsT0FBTyxRQUFRLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxZQUFZLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDOzRCQUNySCxDQUFDLENBQUMsQ0FBQzs0QkFDSCxJQUFJLGdCQUFnQixLQUFLLENBQUMsQ0FBQztnQ0FDdkIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO29DQUNsQixJQUFJLEVBQUUsUUFBUTtvQ0FDZCxTQUFTLEVBQUUsMEJBQTBCO29DQUNyQyxJQUFJLEVBQUU7d0NBQ0YsSUFBSSxFQUFFLGNBQWM7cUNBQ3ZCO2lDQUNKLENBQUMsQ0FBQzt5QkFDVjtxQkFDSjtnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUMsQ0FBQztBQUVILGtCQUFlLElBQUksQ0FBQyJ9