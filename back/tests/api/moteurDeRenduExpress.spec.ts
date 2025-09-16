import { describe, expect, it } from 'vitest';
import { moteurDeRenduExpress } from '../../src/api/moteurDeRendu';
import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';

describe('Le moteur de rendu Express', () => {
  it('utilise le nonce de la réponse', () => {
    let optionsUtilisees: { nonce: string } | undefined;
    const reponse: MockResponse<Response> = createResponse();
    reponse.locals.nonce = 'mon_nonce';
    reponse.render = (_vue: string, options?: object) => {
      optionsUtilisees = options as { nonce: string };
    };
    const moteurDeRendu = moteurDeRenduExpress(() => ({ dsc: '', style: '' }));

    moteurDeRendu.rends(reponse, 'test');

    expect(optionsUtilisees?.nonce).toBe('mon_nonce');
  });
});
