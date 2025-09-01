import Knex from 'knex';
import config from '../../knexfile';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { Utilisateur } from '../metier/utilisateur';
import { AdaptateurChiffrement, ObjetChiffre } from './adaptateurChiffrement';
import { AdaptateurHachage } from './adaptateurHachage';

type DonneesUtilisateurEnClair = {
  email: string;
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

  async ajoute(utilisateur: Utilisateur) {
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

  async existe(emailHache: string) {
    const utilisateur = await this.knex('utilisateurs')
      .where({ email_hache: emailHache })
      .first();
    return !!utilisateur;
  }

  async tous(): Promise<Utilisateur[]> {
    throw new Error();
  }
  async taille(): Promise<number> {
    throw new Error();
  }

  private hydrateUtilisateur(utilisateur: UtilisateurBDD): Utilisateur {
    const donnees = this.dechiffreDonneesUtilisateur(utilisateur);
    return new Utilisateur({
      cguAcceptees: true,
      email: donnees.email,
      infolettreAcceptee: true,
      nom: '',
      prenom: '',
      siretEntite: '',
    });
  }

  private utilisateurBDDAvecDonneesChiffrees(
    utilisateur: Utilisateur
  ): UtilisateurBDD {
    const donneesEnClair: DonneesUtilisateurEnClair = {
      email: utilisateur.email,
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
