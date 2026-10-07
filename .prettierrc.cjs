const importOrder = [
  '<BUILTIN_MODULES>',
  '<THIRD_PARTY_MODULES>',
  '^@style/',
  '^[.]',
];

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
module.exports = {
  tabWidth: 2,
  singleQuote: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-svelte'],
  importOrder: [],
  importOrderTypeScriptVersion: '6.0.3',
  overrides: [
    {
      files: '**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}',
      options: { importOrder },
    },
    {
      files: '*.svelte',
      options: { parser: 'svelte', importOrder },
    },
  ],
};
