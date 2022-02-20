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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZS1kZXNjcmlwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcnVsZXMvcmVxdWlyZS1kZXNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxZQUFZLENBQUM7O0FBRWIsb0RBQWlEO0FBVWpELGdGQUFnRjtBQUNoRixrQkFBa0I7QUFDbEIsZ0ZBQWdGO0FBRWhGLE1BQU0sSUFBSSxHQUFHLElBQUEsdUJBQVUsRUFBc0I7SUFDekMsSUFBSSxFQUFFLHFCQUFxQjtJQUMzQixjQUFjLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN0QyxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsU0FBUztRQUNmLElBQUksRUFBRTtZQUNGLFdBQVcsRUFBRSwwREFBMEQ7WUFDdkUsV0FBVyxFQUFFLEtBQUs7U0FDckI7UUFDRCxRQUFRLEVBQUU7WUFDTixzQkFBc0IsRUFBRSwwQkFBMEI7WUFDbEQsd0JBQXdCLEVBQUUsd0NBQXdDO1NBQ3JFO1FBQ0QsTUFBTSxFQUFFLEVBQUUsRUFBRSx1Q0FBdUM7S0FDdEQ7SUFFRCxNQUFNLENBQUMsT0FBTztRQUNWLE9BQU87WUFDSCxnQkFBZ0IsQ0FBQyxJQUErQjtnQkFDNUMsc0JBQXNCO2dCQUN0QixJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO29CQUNuQyxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO29CQUN4QyxJQUNJLFVBQVUsQ0FBQyxJQUFJLEtBQUssZ0JBQWdCO3dCQUNwQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZO3dCQUN2QyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFlBQVksSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsRUFDckY7d0JBQ0UsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQzlDLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQzs0QkFDakMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO2dDQUNsQixJQUFJLEVBQUUsU0FBUztnQ0FDZixTQUFTLEVBQUUsd0JBQXdCO2dDQUNuQyxJQUFJLEVBQUU7b0NBQ0YsSUFBSSxFQUFFLGNBQWM7aUNBQ3ZCOzZCQUNKLENBQUMsQ0FBQzt3QkFDUCxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvRCxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUNwRCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLGtCQUFrQixFQUFFOzRCQUNsRCxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0NBQ2hFLE9BQU8sUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssWUFBWSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQzs0QkFDckgsQ0FBQyxDQUFDLENBQUM7NEJBQ0gsSUFBSSxnQkFBZ0IsS0FBSyxDQUFDLENBQUM7Z0NBQ3ZCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztvQ0FDbEIsSUFBSSxFQUFFLFFBQVE7b0NBQ2QsU0FBUyxFQUFFLDBCQUEwQjtvQ0FDckMsSUFBSSxFQUFFO3dDQUNGLElBQUksRUFBRSxjQUFjO3FDQUN2QjtpQ0FDSixDQUFDLENBQUM7eUJBQ1Y7cUJBQ0o7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFDLENBQUM7QUFFSCxrQkFBZSxJQUFJLENBQUMifQ==