import axios from 'axios';
import { Router } from 'express';
import { URLSearchParams } from 'url';

export const ressourcesProxyUmap = () => {
  const routeur = Router();

  routeur.use('/umap-proxy', async (requete, reponse) => {
    const nonce =
      new URLSearchParams(requete.url).get('nonce')?.replaceAll(' ', '+') || '';
    const urlUmap = new URL(
      requete.url.replace(`&nonce=${nonce}`, ''),
      'https://umap.incubateur.anct.gouv.fr',
    ).toString();
    const reponseUmap = await axios.get(urlUmap);

    for (const [key, value] of Object.entries(reponseUmap.headers)) {
      reponse.setHeader(key, value);
    }

    if (reponseUmap.status >= 300) {
      return reponse.sendStatus(reponseUmap.status);
    }

    const contenu = reponseUmap.data;
    // console.log('[DEBUG] contenu: ', urlUmap, contenu);

    const contenuModifiee =
      typeof contenu === 'string'
        ? contenu
            .replaceAll('/static/', '/umap-proxy/static/')
            .replaceAll(
              /<link rel=["']stylesheet["']\s*href=["']([^"']*)["']/g,
              `<link rel="stylesheet" href="$1?nonce=${nonce}" nonce="${nonce}"`,
            )
            .replaceAll(/<script /g, `<script nonce="${nonce}"`)

            .replaceAll(
              /<script nonce="[^"]*"\s+src=["']([^"']*)["']/g,
              `<script src="$1?nonce=${nonce}" `,
            )
            .replaceAll(
              /<script nonce="[^"]*"\s+type=["']module["']\s*src=["']([^"']*)["']/g,
              `<script type="module" src="$1?nonce=${nonce}"`,
            )
        : JSON.stringify(contenu);

    if (
      urlUmap.indexOf(
        'map/les-actions-scolaires-de-cybersecurite-2025-2026_3158',
      ) !== -1
    ) {
      // eslint-disable-next-line no-console
      console.log('[DEBUG] Contenu page: ', contenu, contenuModifiee);
    }

    // console.log('[DEBUG] Nonce copié: ', nonce, urlUmap);

    reponse.setHeader('access-control-allow-origin', '*');
    reponse.removeHeader('Cross-Origin-Embedder-Policy');
    reponse.removeHeader('Cross-Origin-Resource-Policy');
    reponse.setHeader(
      'Content-Security-Policy',
      `script-src 'self' 'nonce-${nonce}'; frame-src 'self';`,
    );
    reponse.send(contenuModifiee);
  });

  routeur.use('/fr/datalayer', () => {});

  return routeur;
};
