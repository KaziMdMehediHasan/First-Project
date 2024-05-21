import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "warn",
      "no-unused-expressions": "error",
      // to enforce using type for object type definitions, can be type or interface 
      // "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "prefer-const": "error",
    },
    ignores: [".dist/", "**/node_modules/"],
    // "globals": {
    //   "process": "read-only"
    // },
    // "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];