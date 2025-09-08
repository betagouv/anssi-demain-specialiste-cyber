import express from 'express';

export interface MoteurDeRendu {
  rends: (reponse: express.Response, vue: string, options: object) => void;
}

export const moteurDeRenduExpress: MoteurDeRendu = {
  rends(reponse, vue, options) {
    reponse.render(vue, options);
  },
};
