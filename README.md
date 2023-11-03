# DemainSpécialisteCyber

Site web vitrine de la campagne « DemainSpécialisteCyber »

## Infrastructure

### Les vidéos et le CDN

Les vidéos sont dans le répertoire `/media`. Elles sont déployées séparément, dans un CDN, pour des soucis d'optimisation de bande passante.  
C'est ce qui explique l'organisation type « mono-repo » et l'utilisation de `process.env.URL_SERVEUR_MEDIA`.

## Pour le développement

### Généralités

- Prettier est exécuté en `pre-commit hook`.
- Pour développer en local, `concurrently` est utilisé pour lancer à la fois l'app et le serveur de média :

```sh
$ npm run start:dev
```
