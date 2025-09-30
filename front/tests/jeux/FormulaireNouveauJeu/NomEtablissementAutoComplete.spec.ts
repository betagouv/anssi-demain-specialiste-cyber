import { render, waitFor } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import NomEtablissementAutoComplete from '../../../src/jeux/FormulaireNouveauJeu/NomEtablissementAutoComplete.svelte';
import { type ReferentielEtablissement } from '../../../src/jeux/FormulaireNouveauJeu/ReferentielEtablissement';
import { findByRoleDeep } from '../../shadow-dom-utilitaires';

describe("Le champ de saisie du nom de l'établissement", () => {
  const user = userEvent.setup();
  const referentielEtablissement: ReferentielEtablissement = {
    trouveParNom: vi
      .fn()
      .mockImplementation(() =>
        Promise.resolve(['Lycée 1', 'Lycée 42', 'Lycée de la mer']),
      ),
  };
  it('est visible', async () => {
    render(NomEtablissementAutoComplete, { referentielEtablissement });

    const champ = await findByRoleDeep('textbox', {
      name: 'Nom de votre établissement',
    });
    expect(champ).toBeVisible();
  });

  it("recherche le nom de l'établissement lorsqu'on tape un texte", async () => {
    render(NomEtablissementAutoComplete, { referentielEtablissement });

    const champ = await findByRoleDeep('textbox', {
      name: 'Nom de votre établissement',
    });
    await user.type(champ, 'lycée');
    await waitFor(() =>
      expect(
        referentielEtablissement.trouveParNom,
      ).toHaveBeenCalledExactlyOnceWith('lycée'),
    );
  });

  it("affiche les propositions trouvées lorsqu'on tape quelque chose", async () => {
    const { getByText } = render(NomEtablissementAutoComplete, {
      referentielEtablissement,
    });

    const champ = await findByRoleDeep('textbox', {
      name: 'Nom de votre établissement',
    });
    await user.type(champ, 'l');
    await waitFor(() => expect(getByText('Lycée 1')).toBeVisible());
    expect(getByText('Lycée 42')).toBeVisible();
    expect(getByText('Lycée de la mer')).toBeVisible();
  });

  it("masque les propositions lorsqu'on clique sur l'une d'elle", async () => {
    const { findByText, queryByText } = render(NomEtablissementAutoComplete, {
      referentielEtablissement,
    });

    const champ = await findByRoleDeep('textbox', {
      name: 'Nom de votre établissement',
    });
    await user.type(champ, 'l');
    const option1 = await findByText('Lycée 1');
    await user.click(option1);

    expect(queryByText('Lycée 42')).toBeNull();
    expect(queryByText('Lycée de la mer')).toBeNull();
  });

  it("remonte la valeur de l'option cliquée", async () => {
    const { findByText } = render(NomEtablissementAutoComplete, {
      referentielEtablissement,
    });

    const champ = await findByRoleDeep('textbox', {
      name: 'Nom de votre établissement',
    });
    await user.type(champ, 'l');
    const option1 = await findByText('Lycée 1');
    await user.click(option1);

    expect((champ as HTMLInputElement).value).toEqual('Lycée 1');
  });
});
