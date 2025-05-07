import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  // Core ESLint recommended config with modified no-unused-vars rule
  {
    ...js.configs.recommended,
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        { 
          "varsIgnorePattern": "^(React|App)$",
          "argsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ]
    }
  },

  // Main application files (JS/JSX)
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["**/__tests__/**"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect",
        runtime: "automatic",
      },
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "off",
      "react/react-in-jsx-scope": "off"
    },
  },

  // Test files configuration
  {
    files: ["**/__tests__/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": "off"
    },
  },
];
