import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { hasFieldDecorator } from "./hasFieldDecorator";

export function getAllProperties(node: TSESTree.ClassDeclaration): TSESTree.PropertyDefinition[] | null {
    if (node.body.type !== AST_NODE_TYPES.ClassBody) return null;

    return node.body.body.filter((property) => hasFieldDecorator(property)) as TSESTree.PropertyDefinition[];
}
