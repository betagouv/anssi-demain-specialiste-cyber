# Développement

Sommaire

1. [installer les dépendances de développement](#1-dépendances-de-développement) ;
1. [installer la toolchain](#2-installation-de-la-toolchain) ;
1. [initialiser le fichier de variables d'environnement](#3-initialisation-du-fichier-de-variables-denvironnement) ;
1. [installer les dépendances du projet](#4-installation-des-dépendances-du-projet) ;
1. [initialiser la base de données](#5-initialisation-de-la-base-de-données) ;
1. [installer Prek](#6-installation-de-prek) ;
1. [démarrer l'application en local](#7-démarrage-de-lapplication-en-local) ;
1. [construire l'application](#8-construire-lapplication) ;
1. [créer une migration Knex](#9-créer-une-migration-knex).

## 1. Dépendances de développement

Les outils suivants doivent être présents sur le poste :

- Docker ou un runtime OCI compatible avec Docker Compose ;
- le gestionnaire de paquets [Nix](https://nixos.org/download/) ;
- [direnv](https://direnv.net/docs/installation.html) (optionnel).

## 2. Installation de la toolchain

### Avec Nix

À la racine du projet, lancer :

```shell
nix-shell
```

### Avec direnv

À la racine du projet, lancer :

```shell
direnv allow
```

La toolchain est ensuite chargée automatiquement à l'ouverture du répertoire du projet.

## 3. Initialisation du fichier de variables d'environnement

Créer le fichier `back/.env` à partir du modèle :

```shell
cp back/.env.template back/.env
```

Renseigner ensuite les variables requises dans `back/.env`.

## 4. Installation des dépendances du projet

Installer les dépendances Node :

```shell
pnpm install --frozen-lockfile
```

## 5. Initialisation de la base de données

1. Démarrer PostgreSQL :

```shell
docker compose up -d db
```

La base `dsc` est créée automatiquement par `docker-entrypoint-initdb.d/initialise.sql` lors du premier démarrage.

2. Exécuter les migrations :

```shell
pnpm migre-bdd
```

3. Enregistrer les empreintes des secrets de hachage :

```shell
pnpm admin:dev

> await admin.sauvegardeLesEmpreintesDesSecretsDeHachage()
> .exit
```

4. Arrêter la stack Docker Compose :

```shell
docker compose down
```

## 6. Installation de Prek

Installer le hook Git du dépôt :

```shell
prek install
```

## 7. Démarrage de l'application en local

```shell
pnpm dev
```

Le site est ensuite consultable sur http://127.0.0.1:3005.

## 8. Construire l'application

```shell
pnpm build
```

## 9. Créer une migration Knex

Depuis le répertoire `back`, créer une migration nommée :

```shell
pnpm cree-migration -- <nom_de_la_migration>
```
