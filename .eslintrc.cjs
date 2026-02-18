module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  ignorePatterns: ["node_modules/", "coverage/"],
  overrides: [
    {
      files: ["**/__tests__/**/*.js", "**/*.test.js"],
      env: {
        jest: true,
      },
    },
  ],
};

