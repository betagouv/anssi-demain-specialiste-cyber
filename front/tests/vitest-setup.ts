import '@testing-library/jest-dom/vitest';
import '@lab-anssi/ui-kit/dist/webcomponents';
import { vi } from 'vitest';

Object.defineProperty(HTMLElement.prototype, 'attachInternals', {
  configurable: true,
  value: vi.fn(() => ({
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn(),
    reportValidity: vi.fn(),
    form: null,
    labels: [],
    validity: {},
    validationMessage: '',
    willValidate: false,
  })),
});

Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', {
  configurable: true,
  get() {
    if (!this.__adoptedStyleSheets) {
      this.__adoptedStyleSheets = [];
    }
    return this.__adoptedStyleSheets;
  },
  set(value) {
    this.__adoptedStyleSheets = value;
  },
});
