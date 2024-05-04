import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

export function findObjectTypeDecorator(node: TSESTree.ClassDeclaration) {
    return node.decorators?.findIndex(
        (decorator) =>
            decorator.expression.type === AST_NODE_TYPES.CallExpression &&
            decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
            decorator.expression.callee.name === "ObjectType"
    );
}
