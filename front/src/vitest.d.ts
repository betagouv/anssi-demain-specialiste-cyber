import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import 'vitest';

declare module 'vitest' {
  // Declaration merging requires an interface with no local members.
  // FIX: See jest-dom https://github.com/testing-library/jest-dom/pull/742
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Matchers<
    R extends void | Promise<void> = void | Promise<void>,
    _T = unknown,
  > extends TestingLibraryMatchers<unknown, R> {}
}
