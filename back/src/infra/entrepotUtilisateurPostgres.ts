import Knex from 'knex';
import config from '../../knexfile';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { Utilisateur } from '../metier/utilisateur';
import { AdaptateurChiffrement, ObjetChiffre } from './adaptateurChiffrement';
import { AdaptateurHachage } from './adaptateurHachage';

type DonneesUtilisateurEnClair = {
  email: string;
  prenom: string;
  nom: string;
  siret: string;
  infolettreAcceptee: boolean;
};

type UtilisateurBDD = {
  email_hache: string;
  donnees: ObjetChiffre;
};

export class EntrepotUtilisateurPostgres implements EntrepotUtilisateur {
  knex: Knex.Knex;
  adaptateurHachage: AdaptateurHachage;
  adaptateurChiffrement: AdaptateurChiffrement;

  constructor({
    adaptateurHachage,
    adaptateurChiffrement,
  }: {
    adaptateurHachage: AdaptateurHachage;
    adaptateurChiffrement: AdaptateurChiffrement;
  }) {
    this.knex = Knex(config);
    this.adaptateurHachage = adaptateurHachage;
    this.adaptateurChiffrement = adaptateurChiffrement;
  }

  async ajoute(utilisateur: Utilisateur): Promise<void> {
    await this.knex('utilisateurs').insert(
      this.utilisateurBDDAvecDonneesChiffrees(utilisateur)
    );
  }

  async parEmailHache(emailHache: string): Promise<Utilisateur | undefined> {
    if (!emailHache) return undefined;
    const utilisateur = await this.knex('utilisateurs')
      .where({ email_hache: emailHache })
      .first();
    if (!utilisateur) return undefined;
    return this.hydrateUtilisateur(utilisateur);
  }

  async existe(emailHache: string): Promise<boolean> {
    const utilisateur = await this.knex('utilisateurs')
      .where({ email_hache: emailHache })
      .first();
    return !!utilisateur;
  }

  async tous(): Promise<Utilisateur[]> {
    const utilisateursBDD = await this.knex('utilisateurs');
    return utilisateursBDD.map(this.hydrateUtilisateur);
  }

  async taille(): Promise<number> {
    const resultat = await this.knex('utilisateurs').count({ count: '*' });
    return Number(resultat[0].count);
  }

  private hydrateUtilisateur(utilisateur: UtilisateurBDD): Utilisateur {
    const donnees = this.dechiffreDonneesUtilisateur(utilisateur);
    return new Utilisateur({
      email: donnees.email,
      infolettreAcceptee: donnees.infolettreAcceptee,
      nom: donnees.nom,
      prenom: donnees.prenom,
      siretEntite: donnees.siret,
    });
  }

  private utilisateurBDDAvecDonneesChiffrees(
    utilisateur: Utilisateur
  ): UtilisateurBDD {
    const donneesEnClair: DonneesUtilisateurEnClair = {
      email: utilisateur.email,
      prenom: utilisateur.prenom,
      nom: utilisateur.nom,
      siret: utilisateur.siretEntite,
      infolettreAcceptee: utilisateur.infolettreAcceptee,
    };
    const donneesChiffrees = this.adaptateurChiffrement.chiffre(donneesEnClair);
    return {
      donnees: donneesChiffrees,
      email_hache: this.adaptateurHachage.hache(utilisateur.email),
    };
  }

  private dechiffreDonneesUtilisateur(
    utilisateur: UtilisateurBDD
  ): DonneesUtilisateurEnClair {
    const { donnees } = utilisateur;
    return this.adaptateurChiffrement.dechiffre(donnees);
  }
}
