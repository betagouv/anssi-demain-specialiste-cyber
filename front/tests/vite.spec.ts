import fs from 'fs';
import { resolve } from 'path';
import { describe, expect, it } from 'vitest';

describe('vite', () => {
  const files = Object.fromEntries(
    fs
      .readdirSync('pages')
      .map((file) => [
        file.replace('.html', ''),
        resolve(__dirname, '..', 'pages', file, 'index.html'),
      ])
  );

  it('ok', () => {
    expect(files).toStrictEqual({
      catalogue: resolve(
        __dirname,
        '..',
        '..',
        'front',
        'pages',
        'catalogue',
        'index.html'
      ),
    });
  });
});
