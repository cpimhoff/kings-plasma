import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import autoImportRules from "./.eslint.auto-import.json" assert { type: "json" };

export default tseslint.config(
  { ignores: ["dist", "dev-dist"] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...autoImportRules.globals },
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
);
