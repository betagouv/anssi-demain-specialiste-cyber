export const aseptiseVersMarkdown = (message: string) =>
  [
    '\\',
    '!',
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
  ].reduce(
    (acc, caractere) => acc.replaceAll(caractere, `\\${caractere}`),
    message,
  );
