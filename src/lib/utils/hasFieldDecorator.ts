/**
 * @fileoverview Require mutation argument to be always called "input" and input type to be called Mutation name + "Input". Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.
 * @author Michael Poulgrain
 */
"use strict";
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

export function hasFieldDecorator(node: TSESTree.ClassElement): boolean {
    if (node.type !== AST_NODE_TYPES.PropertyDefinition) return false;
    if (!node.decorators) return false;
    return node.decorators.some(
        (decorator) =>
            decorator.expression.type === AST_NODE_TYPES.CallExpression &&
            decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
            decorator.expression.callee.name === "Field"
    );
}
