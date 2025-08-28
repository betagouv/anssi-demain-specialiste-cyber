import { defineConfig } from 'vitest/config';
export default defineConfig({
  root: './src',
  test: {
    include: ['./**/*.{test,spec}.ts'],
    root: './tests',
    env: {
      GRIST_URL_BASE: 'http://example.com/',
      GRIST_CLE_API: 'ma_cle_api',
      GRIST_RESSOURCES_CYBER_ID_DOCUMENT: 'mon_id_document',
      GRIST_RESSOURCES_CYBER_ID_TABLE: 'mon_id_table',
    },
  },
});
