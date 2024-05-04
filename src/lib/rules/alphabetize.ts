/**
 * @fileoverview Enforce arrange in alphabetical order for type fields, enum values, input object fields, operation selections and more.
 * @author Michael Poulgrain
 */
"use strict";
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/createRule";
import { findObjectTypeDecorator } from "../utils/findObjectTypeDecorator";
import { getAllProperties } from "../utils/getAllProperties";
enum FieldTypes {
    ObjectTypeDefinition,
    InterfaceTypeDefinition,
    InputObjectTypeDefinition,
}

enum valueTypes {
    EnumTypeDefinition,
}
enum selectionTypes {
    OperationDefinition,
    FragmentDefinition,
}

enum variableTypes {
    OperationDefinition,
}

enum argumentTypes {
    FieldDefinition,
    Field,
    DirectiveDefinition,
    Directive,
}

type InputNameRuleConfig = {
    fields?: FieldTypes[];
    values?: valueTypes[];
    selections?: selectionTypes[];
    variabes?: variableTypes[];
    arguments?: argumentTypes[];
    definitions?: boolean;
};
type MessageIds = "errorStringGeneric" | "fixParameter";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = createRule<[InputNameRuleConfig], MessageIds>({
    name: "input-name",
    defaultOptions: [
        {
            fields: [],
            values: [],
            selections: [],
            variabes: [],
            arguments: [],
            definitions: false,
        },
    ],
    meta: {
        type: "suggestion",
        hasSuggestions: true,
        docs: {
            description:
                'Require mutation argument to be always called "input" and input type to be called Mutation name + "Input". Using the same name for all input parameters will make your schemas easier to consume and more predictable. Using the same name as mutation for InputType will make it easier to find mutations that InputType belongs to.',
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
        const options: InputNameRuleConfig = {
            fields: [],
            values: [],
            selections: [],
            variabes: [],
            arguments: [],
            definitions: false,
            ...context.options[0],
        };

        return {
            ClassDeclaration(node) {
                const objectTypeDecoratorIndex = findObjectTypeDecorator(node);
                if (objectTypeDecoratorIndex === -1) return null;

                const fieldProperties = getAllProperties(node);
                console.log(fieldProperties);
                const fieldNames = fieldProperties?.map((property) => property.key?.name);
                
                return;
            },
        };
    },
});

export default rule;
