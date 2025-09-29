import { describe, it, expect } from 'vitest';
import { aseptiseVersMarkdown } from '../../src/infra/markdown';

describe('Le markdown', () => {
  it("retourne la chaîne intacte lorsqu'elle ne contient aucun caractère spécial", () => {
    const markdown = aseptiseVersMarkdown('bonjour tout le monde');

    expect('bonjour tout le monde').toBe(markdown);
  });

  it.each([
    '!',
    '\\',
    '[',
    ']',
    '`',
    '{',
    '}',
    '*',
    '_',
    '<',
    '>',
    '(',
    ')',
    '#',
    '+',
    '-',
    '.',
    '|',
  ])(`échappe les %s`, (caractereAEchapper) => {
    const markdown = aseptiseVersMarkdown(caractereAEchapper);

    expect(`\\${caractereAEchapper}`).toBe(markdown);
  });
});
