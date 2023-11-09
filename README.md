# DemainSpécialisteCyber

Site web vitrine de la campagne « DemainSpécialisteCyber »

## Infrastructure

### Les vidéos et le CDN

À l'exécution, les vidéos sont dans le répertoire `/media/public/videos`. Elles sont stockées séparément, dans un object storageOVH, et téléchargées au lancement de l'application. 
Cela permet de ne pas les inclure dans le source control de github.
C'est ce qui explique l'organisation type « mono-repo » et l'utilisation de `process.env.URL_SERVEUR_MEDIA`.

Pour ajouter un nouveau média:
- Uploader le fichier dans l'object storage OVH
  - **Pour le dev local**: relancer le script `./media/scripts/telecharge-fichiers-s3.sh`
- Utiliser le même nom de fichier dans le `pug`, en partant du principe qu'il sera disponible dans `/media/public/videos`
    - ⚠ Pour les vidéos, il faut respecter le format `NomDeVideo_{720p || 1080p}.mp4` (_ex: `RSSI_720p.mp4`_)

## Pour le développement
L'installation de l'environnement local se fait via le script dédié :

```sh
$ ./scripts/installation-dev.sh
```

Le lancement se fait via le script dédié :

```sh
$ ./scripts/start-dev.sh
```

C'est `concurrently` qui est utilisé pour lancer les 2 serveurs web. Il faudra accepter de l'installer lors de la première exécution du script.

### Généralités

- Prettier est exécuté en `pre-commit hook`.