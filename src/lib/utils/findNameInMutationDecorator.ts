/**
 * @fileoverview Require mutation argument to be always called "input" and input type to be called Mutation name + "Input". Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.
 * @author Michael Poulgrain
 */
"use strict";
import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

export function findNameInMutationDecorator(node: TSESTree.MethodDefinition) {
    const decorator = node.decorators?.find(
        (decorator) =>
            decorator.expression.type === AST_NODE_TYPES.CallExpression &&
            decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
            (decorator.expression.callee.name === "Mutation" || decorator.expression.callee.name === "Query")
    );
    if (
        !decorator ||
        decorator.expression.type !== AST_NODE_TYPES.CallExpression ||
        decorator.expression.arguments.length < 2 ||
        decorator.expression.arguments[1].type !== AST_NODE_TYPES.ObjectExpression
    )
        return null;
    const optionsObject = decorator.expression.arguments[1];
    const nameProperty = optionsObject.properties.find(
        (property) => property.type === AST_NODE_TYPES.Property && property.key.type === AST_NODE_TYPES.Identifier && property.key.name === "name"
    );
    if (!nameProperty || nameProperty.type !== AST_NODE_TYPES.Property) return null;
    if (nameProperty.value.type === AST_NODE_TYPES.Literal) return nameProperty.value.value;
    if (nameProperty.value.type === AST_NODE_TYPES.Identifier) {
        //TODO: maybe find the value of the variable? using Scope Manager. For now do nothing.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //const scope = context.getScope();
        return null;
    }
    return;
}
