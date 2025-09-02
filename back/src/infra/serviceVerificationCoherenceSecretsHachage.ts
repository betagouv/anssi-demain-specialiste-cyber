import {
  EntrepotSecretHachage,
  SecretHachage,
} from './entrepotSecretHachagePostgres';
import { AdaptateurHachage } from './adaptateurHachage';
import { AdaptateurEnvironnement } from './adaptateurEnvironnement';

const verifieQueChaqueSecretEstCoherent = async (
  tousLesSecretsDeHachageDeLaConfig: { version: number; secret: string }[],
  empreintesDesSecretsAppliques: SecretHachage[],
  adaptateurHachage: AdaptateurHachage
) => {
  for (let i = 0; i < tousLesSecretsDeHachageDeLaConfig.length; i += 1) {
    const { version: versionDeLaConfig, secret: valeurSecretEnClair } =
      tousLesSecretsDeHachageDeLaConfig[i];
    const leSecretAppliqueCorrespondant = empreintesDesSecretsAppliques.find(
      ({ version: versionEnBase }) => versionEnBase === versionDeLaConfig
    );

    if (!leSecretAppliqueCorrespondant) {
      throw new Error(
        `💥 La version ${versionDeLaConfig} du secret noté dans la config est manquante dans la persistance.`
      );
    }
    const estValide = await adaptateurHachage.compareBCrypt(
      valeurSecretEnClair,
      leSecretAppliqueCorrespondant.empreinte
    );

    if (!estValide) {
      throw new Error(
        `💥 La version ${versionDeLaConfig} du secret de la config a une valeur différente de celle déjà appliquée.`
      );
    }
  }

  for (const empreinte of empreintesDesSecretsAppliques) {
    const { version: versionAppliquee } = empreinte;
    if (
      !tousLesSecretsDeHachageDeLaConfig.some(
        ({ version: versionDansLaConfig }) =>
          versionAppliquee === versionDansLaConfig
      )
    ) {
      throw new Error(
        `💥 La version ${versionAppliquee} du secret déjà appliquée est manquante dans la config.`
      );
    }
  }
};

export const fabriqueServiceVerificationCoherenceSecretsHachage = ({
  adaptateurHachage,
  entrepotSecretHachage,
  adaptateurEnvironnement,
}: {
  entrepotSecretHachage: EntrepotSecretHachage;
  adaptateurHachage: AdaptateurHachage;
  adaptateurEnvironnement: AdaptateurEnvironnement;
}) => ({
  verifieCoherenceSecrets: async () => {
    if (adaptateurEnvironnement.maintenance().actif()) {
      // eslint-disable-next-line no-console
      console.log('🏗 Pas de vérification des sels en mode maintenance');
      return;
    }
    const empreintesDesSecretsAppliques = await entrepotSecretHachage.tous();
    const tousLesSecretsDeHachageDeLaConfig = adaptateurEnvironnement
      .hachage()
      .tousLesSecretsDeHachage();

    if (tousLesSecretsDeHachageDeLaConfig.length === 0) {
      throw new Error('💥 Aucun secret de hachage dans la config.');
    }

    await verifieQueChaqueSecretEstCoherent(
      tousLesSecretsDeHachageDeLaConfig,
      empreintesDesSecretsAppliques,
      adaptateurHachage
    );
  },
});
