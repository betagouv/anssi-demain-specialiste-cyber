export interface ReferentielEtablissement {
  trouveParNom: (nom: string) => Promise<string[]>;
}
