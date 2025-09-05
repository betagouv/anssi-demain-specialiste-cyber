# DemainSpécialisteCyber

Site web « DemainSpécialisteCyber »

## Développement

### Ajouter pre commit

Afin de s’assurer que chaque commit respecte les règles d’usage de l’équipe, on peut ajouter `pre-commit` qui s’assurera que les fichiers ajoutés / modifiés respectent nos usages.

- **Installer pre-commit :** `pip install pre-commit`
- **Mettre en place le hook git** `pre-commit install`

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

- La base de données `dsc` est créée automatiquement lors du premier lancement grâce au fichier d'initialisation `docker-entrypoint-initdb.d/initialise.sql`

- Revenir à la racine, installer les dépendances Node et lancer le projet en mode "dev"

```shell
$ cd ..
$ npm install
$ npm run dev
```

- Arrivé ici, le site doit être consultable sur http://127.0.0.1:3005

## Le build et la PROD

TODO
