<svelte:options customElement={{ tag: 'dsc-formulaire-nouveau-jeu', shadow: 'none' }} />

<script lang="ts">
  import axios from 'axios';
  import type { Validateur } from '../validateur';
  import type { JeuEnEdition } from './jeu';
  import { type ErreursValidationJeuEnEdition, ValidateurDeJeuEnEdition } from './ValidateurDeJeuEnEdition';

  interface Props {
    validateur: Validateur<JeuEnEdition>;
  }

  const { validateur = new ValidateurDeJeuEnEdition() }: Props = $props();

  let nom = $state('');
  let nomEtablissement = $state('');
  let sequence = $state('');
  let discipline = $state('');
  let classe = $state('');

  let erreurs = $state<ErreursValidationJeuEnEdition>({
    nom: undefined,
    nomEtablissement: undefined,
    sequence: undefined,
    classe: undefined,
    discipline: undefined
  });

  const soumets = async (event: Event) => {
    event.preventDefault();

    const jeu: JeuEnEdition = {
      nom,
      sequence,
      nomEtablissement,
      discipline,
      classe
    };
    if (!validateur.estValide(jeu)) {
      erreurs = validateur.valide(jeu);
      return;
    }

    await axios.post('/api/jeux', jeu);
  };
</script>

<form novalidate>
  <label>
    Nom du jeu
    <input type="text" bind:value={nom} required />
  </label>
  {#if erreurs.nom}
    <span class="erreur" role="alert">{erreurs.nom}</span>
  {/if}

  <label>
    Nom de votre établissement
    <input type="text" bind:value={nomEtablissement} required />
  </label>
  {#if erreurs.nomEtablissement}
    <span class="erreur" role="alert">{erreurs.nomEtablissement}</span>
  {/if}

  <div class="sequence">
    <p>Format de la séquence CyberEnJeux</p>
    <div class="boutons">
      <label>
        <input
          type="radio"
          name="sequence"
          value="heure"
          required
          bind:group={sequence}
        />
        Heure de cours
      </label>
      <label>
        <input
          type="radio"
          name="sequence"
          value="demi-journee"
          bind:group={sequence}
        />
        Demi-journee
      </label>
      <label>
        <input
          type="radio"
          name="sequence"
          value="journee"
          bind:group={sequence}
        />
        Journée
      </label>
    </div>
    {#if erreurs.sequence}
      <span class="erreur" role="alert">{erreurs.sequence}</span>
    {/if}
  </div>

  <label>
    Discipline
    <select placeholder="Sélectionner une option" bind:value={discipline}>
      <option value="francais">Français</option>
      <option value="langues-vivantes">Langues vivantes</option>
      <option value="arts-plastiques">Arts plastiques</option>
      <option value="education-musicale">Éducation musicale</option>
      <option value="histoire-des-arts">Histoire des arts</option>
      <option value="education-physique-et-sportive">Éducation physique et sportive</option>
      <option value="enseignement-moral-et-civique">Enseignement moral et civique</option>
      <option value="histoire-et-geographie">Histoire et géographie</option>
      <option value="sciences-et-technologie">Sciences et technologie</option>
      <option value="mathematiques">Mathématiques</option>
    </select>
  </label>
  {#if erreurs.discipline}
    <span class="erreur" role="alert">{erreurs.discipline}</span>
  {/if}

  <label>
    Classe
    <select placeholder="Sélectionner une option" bind:value={classe}>
      <option value="maternelle">Maternelle</option>
      <option value="cp">CP</option>
      <option value="ce1">CE1</option>
      <option value="ce2">CE2</option>
      <option value="cm1">CM1</option>
      <option value="cm2">CM2</option>
      <option value="6e">6e</option>
      <option value="5e">5e</option>
      <option value="4e">4e</option>
      <option value="3e">3e</option>
      <option value="seconde">Seconde</option>
      <option value="premiere">Première</option>
      <option value="terminale">Terminale</option>
      <option value="classe-prepa">Classe prépa</option>
      <option value="bts">BTS</option>
      <option value="superieur-hors-bts-et-prep">Supérieur (hors BTS et Prepa)</option>
    </select>
  </label>
  {#if erreurs.classe}
    <span class="erreur" role="alert">{erreurs.classe}</span>
  {/if}

  <button type="submit" onclick={soumets}>Terminer</button>
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 792px;

    .sequence {
      display: flex;
      flex-direction: column;

      .boutons {
        display: flex;
        flex-direction: column;
      }
    }

    .erreur {
      color: red;
    }

    input:user-invalid {
      border: 2px solid red;
    }
  }
</style>
