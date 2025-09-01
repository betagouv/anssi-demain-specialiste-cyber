# DemainSpécialisteCyber

Site web « DemainSpécialisteCyber »

## Développement

### Créer une migration KNEX

On peut créer de nouveaux fichier de migration via un script NPM :

```shell
cd back
npm run cree-migration -- <nom_du_fichier_de_migration>
```

### Démarrage

- Créer un fichier de variables d'environnement, en se basant sur le fichier `.env.template`

- Démarrer le conteneur de base de données

```shell
$ docker compose up db
$ docker compose up db -d # démarre en mode daemon
```

- Se connecter au conteneur de la base de données et créer une nouvelle base `dsc` pour un utilisateur postgres.

```shell
$ docker compose exec db createdb -U postgres dsc
```

- Revenir à la racine, installer les dépendances Node et lancer le projet en mode "dev"

```shell
$ cd ..
$ npm install
$ npm run dev
```

- Arrivé ici, le site doit être consultable sur http://127.0.0.1:3000

## Le build et la PROD

TODO
