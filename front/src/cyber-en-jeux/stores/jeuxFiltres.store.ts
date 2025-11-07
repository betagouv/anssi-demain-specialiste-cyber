import { derived } from 'svelte/store';
import type { Categorie, Niveau, Thematique, Jeu } from '../../jeu.type';
import { lesCategories, lesNiveaux, lesThematiques } from '../../jeu.type';
import { jeuxStore } from './jeux.store';
import { rechercheParCategorie } from './rechercheParCategorie.store';
import { rechercheParNiveau } from './rechercheParNiveau.store';
import { rechercheParThematique } from './rechercheParThematique.store';
import { rechercheTextuelle } from './rechercheTextuelle.store';

export type JeuxFiltres = {
  resultat: Jeu[];
  thematiques: Thematique[];
  categories: Categorie[];
  niveaux: Niveau[];
};

export const jeuxFiltres = derived(
  [
    jeuxStore,
    rechercheParThematique,
    rechercheParCategorie,
    rechercheParNiveau,
    rechercheTextuelle,
  ],
  ([$store]): JeuxFiltres => {
    const resultat = $store.filter(
      (jeu: Jeu) =>
        rechercheParThematique.ok(jeu) &&
        rechercheParCategorie.ok(jeu) &&
        rechercheParNiveau.ok(jeu) &&
        rechercheTextuelle.ok(jeu),
    );

    const thematiques = lesThematiques($store);
    const categories = lesCategories($store);
    const niveaux = lesNiveaux($store);

    return { resultat, categories, thematiques, niveaux };
  },
);
