/**
 * @fileoverview Enforce descriptions in type definitions and operations.
 * @author Michael Poulgrain
 */
"use strict";
import type { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/createRule";
export type OptionString = "array" | "generic" | "array-simple";

type Options = [
    {
        default: OptionString;
        readonly?: OptionString;
    }
];
type MessageIds = "errorStringNoArguments" | "errorStringNoDescription";
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = createRule<Options, MessageIds>({
    name: "require-description",
    defaultOptions: [{ default: "array" }],
    meta: {
        type: "problem", // `problem`, `suggestion`, or `layout`
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
            ClassDeclaration(node: TSESTree.ClassDeclaration) {
                //if (node.decorators)
                node.decorators?.forEach((decorator) => {
                    const expression = decorator.expression;
                    if (
                        expression.type === "CallExpression" &&
                        expression.callee.type === "Identifier" &&
                        (expression.callee.name === "ObjectType" || expression.callee.name === "InputType")
                    ) {
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

export default rule;
