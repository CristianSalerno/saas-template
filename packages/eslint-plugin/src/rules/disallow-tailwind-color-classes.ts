import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://developer.ultratech.com/eslint/rule/${name}`,
);

export const rule: ReturnType<typeof createRule> = createRule({
  create(context) {
    return {
      JSXAttribute(node) {
        if (
          node.name.name === "className" &&
          node.value &&
          node.value.type === AST_NODE_TYPES.Literal
        ) {
          const classNames = node.value.value?.toString().split(" ") ?? [];
          classNames.forEach((className: string) => {
            if (
              /(?:bg|text|border|from|via|to)-(?:gray|red|yellow|green|blue|indigo|purple|pink).*/.test(
                className,
              )
            ) {
              context.report({
                node,
                loc: node.loc,
                messageId: "avoid-tailwind-color-classes",
                data: {
                  className,
                },
              });
            }
          });
        }
      },
    };
  },
  name: "disallow-tailwind-color-classes",
  meta: {
    fixable: "whitespace",
    docs: {
      description: "disallow the use of Tailwind color classes",
      recommended: "error",
    },
    messages: {
      "avoid-tailwind-color-classes": `Avoid using Tailwind color classes. Found: '{{className}}'`,
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
});
