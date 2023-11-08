# DemainSpécialisteCyber

Site web vitrine de la campagne « DemainSpécialisteCyber »

## Infrastructure

### Les vidéos et le CDN

Les vidéos sont dans le répertoire `/media`. Elles sont déployées séparément, dans un CDN, pour des soucis d'optimisation de bande passante.  
C'est ce qui explique l'organisation type « mono-repo » et l'utilisation de `process.env.URL_SERVEUR_MEDIA`.

## Pour le développement

L'installation de l'environnement local se fait via le script dédié :

```sh
$ ./scripts/installation-dev.sh
```

Cette installation permet aussi de télécharger tous les médias statiques disponibles dans le Storage OVH S3.
Ce script peut être lancé séparament avec : 

```sh
$ ./scripts/telecharge-fichiers-s3.sh
```

Le lancement se fait via le script dédié :

```sh
$ ./scripts/start-dev.sh
```

C'est `concurrently` qui est utilisé pour lancer les 2 serveurs web. Il faudra accepter de l'installer lors de la première exécution du script.

### Généralités

- Prettier est exécuté en `pre-commit hook`.