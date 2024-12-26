/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  $schema: 'https://json.schemastore.org/prettierrc',
  singleQuote: true,
  printWidth: 120,
  trailingComma: 'all',
  jsxSingleQuote: true,
  arrowParens: 'always',
  bracketSameLine: true,
  tabWidth: 2,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  importOrder: ['<THIRD_PARTY_MODULES>', '^./(.*)$'],
  importOrderSortSpecifiers: true,
  tailwindFunctions: ['cn'],
};

export default config;
