import eslint from "@eslint/js"
import globals from "globals"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

export default [
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser
      },
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "object-shorthand": "error",
      "no-loop-func": "error",
      "no-new-object": "error",
      "no-array-constructor": "error",
      "no-prototype-builtins": "error",
      "prefer-spread": "error",
      "prefer-rest-params": "error",
      "default-param-last": "error",
      "no-useless-constructor": "error",
      "no-duplicate-imports": "error",
      "prefer-destructuring": ["error", {
        "VariableDeclarator": {
          "array": true,
          "object": true
        },
        "AssignmentExpression": {
          "array": false,
          "object": false
        }
      }]
    }
  },
  eslintPluginPrettierRecommended
]
