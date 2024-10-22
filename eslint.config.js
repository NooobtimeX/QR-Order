import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    // Specify files to be linted only in the directories you care about
    files: [
      "components/**/*.{js,mjs,cjs,ts}",
      "layouts/**/*.{js,mjs,cjs,ts}",
      "pages/**/*.{js,mjs,cjs,ts}",
      "prisma/**/*.{js,mjs,cjs,ts}",
      "server/**/*.{js,mjs,cjs,ts}",
    ],
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "script" },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
