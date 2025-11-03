import axios from 'axios';
import { Router } from 'express';

export const ressourcesProxyUmap = () => {
  const routeur = Router();

  routeur.use('/umap-proxy', async (_requete, reponse) => {
    const urlUMap = new URL(
      'https://umap.incubateur.anct.gouv.fr/fr/map/les-actions-scolaires-de-cybersecurite-2025-2026_3158?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true',
    ).toString();
    const reponseUmap = await axios.get(urlUMap);
    const contenu = reponseUmap.data;
    const contenuModifie =
      typeof contenu === 'string'
        ? contenu.replaceAll(
            /\/static\/umap(.*?\.css)/g,
            'https://umap.incubateur.anct.gouv.fr/static/umap$1',
          )
        : '';

    reponse.setHeader(
      'Content-Security-Policy',
      `frame-src 'self' https://umap.incubateur.anct.gouv.fr; `,
    );
    reponse.send(contenuModifie);
  });

  routeur.use('/static/umap', async (requete, reponse) => {
    const urlUMap = new URL(
      `/static/umap/${requete.path}`,
      'https://umap.incubateur.anct.gouv.fr',
    ).toString();
    try {
      const reponseUmap = await axios.get(urlUMap);
      reponse
        .setHeader('Content-type', 'application/javascript; charset=utf-8')
        .send(reponseUmap.data);
    } catch (_err) {
      /* empty */
    }
  });
  return routeur;
};
