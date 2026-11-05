<svelte:options
  customElement={{
    tag: 'dsc-fiche-famille-metier',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import Fiche, { type Menu } from '../composants/Fiche.svelte';
  import Heros from '../composants/Heros.svelte';

  type AccentDsfr = 'yellow-moutarde' | 'green-bourgeon' | 'blue-cumulus' | 'purple-glycine' | 'green-archipel';
  const accentParFamille: Record<string, AccentDsfr> = {
    Pilotage: 'yellow-moutarde',
    Conception: 'green-bourgeon',
    'Incidents et crises': 'blue-cumulus',
    'Conseil et recherche': 'purple-glycine',
    'Métiers connexes': 'green-archipel',
  };
  const accentPourFamille = (code: string): string => accentParFamille[code] ?? 'blue-france';

  type Témoignage = {
    nom: string;
    femme: boolean;
    lien: string;
  };

  type Fonction = {
    id: number;
    nom: string;
    missionPrincipale: string;
    lien: string;
    témoignage: Témoignage;
  };

  type Rôle = {
    nom: string;
    description: string;
  };

  type Profil = {
    id: number;
    titre: string;
    description: string;
    liens: {
      illustration: string;
    };
  };

  type RessourceAssociée = {
    id: number;
    titre: string;
    description: string;
    urlIllustration: string;
    lienExterne: string;
  };

  type FamilleDeMétier = {
    code: string;
    titre: string;
    sousTitre: string;
    description: string;
    rôles: Rôle[];
    profils: Profil[];
    fonctions: Fonction[];
    ressourcesAssociées: RessourceAssociée[];
  };

  let famille: FamilleDeMétier | undefined = $state(undefined);
  let toutesFamilles: FamilleDeMétier[] = $state([]);
  const autresFamilles = $derived(toutesFamilles.filter((f) => f.code !== famille?.code));
  const numeroFamille = $derived(famille ? toutesFamilles.findIndex((f) => f.code === famille!.code) + 1 : 0);

  const slugifie = (code: string): string =>
    code
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  onMount(async () => {
    const morceaux = window.location.pathname.split('/');
    const code = morceaux[morceaux.length - 1];
    const reponse = await axios.get<FamilleDeMétier>(`/api/familles-metier/${code}`);
    famille = reponse.data;

    const reponseTous = await axios.get<FamilleDeMétier[]>('/api/familles-metier');
    toutesFamilles = reponseTous.data;
  });

  const menu: Menu = [
    {
      id: 'menu-en-bref',
      label: 'En bref',
      href: '#en-bref',
      isCollapsible: false,
      type: 'link',
    },
    {
      id: 'menu-profils',
      label: 'Les profils de cette famille',
      href: '#profils',
      isCollapsible: false,
      type: 'link',
    },
    {
      id: 'menu-metiers',
      label: 'Les métiers de la famille',
      href: '#metiers',
      isCollapsible: false,
      type: 'link',
    },
    {
      id: 'menu-formations',
      label: 'Entraîne-toi dès maintenant',
      href: '#formations',
      isCollapsible: false,
      type: 'link',
    },
  ];
</script>

{#if famille}
  <Heros
    variant="alternatif"
    ariane={[
      { id: 'accueil', label: 'Accueil', href: '/' },
      { id: 'metiers', label: 'Découvrir les métiers', href: '/les-metiers' },
      { id: 'famille', label: famille.titre, href: '#' },
    ]}
    sansImageDeFond={true}
  >
    <dsfr-badge label={famille.code} type="accent" accent={accentPourFamille(famille.code)} slot="avant-titre"
    ></dsfr-badge>
    <h1 class="hero-titre" slot="titre">{famille.titre}</h1>
    <p class="hero-chapeau texte-article-lg" slot="description">{famille.sousTitre}</p>

    <div class={['hero-illustration', accentPourFamille(famille.code)]} slot="illustration">
      <span class="hero-numero">{numeroFamille}</span>
    </div>
  </Heros>

  <dsfr-container class="conteneur-fiche-famille">
    <Fiche menuId="menu-fiche-famille" {menu}>
      <section id="en-bref">
        <h2>En bref</h2>
        <p class="fr-text--lg">{famille.description}</p>
        <div class="tuiles-roles">
          {#each famille.rôles as rôle}
            <dsfr-tile
              title={rôle.nom}
              has-description
              description={rôle.description}
              action-markup="false"
              no-link
              size="md"
            ></dsfr-tile>
          {/each}
        </div>
      </section>

      <section id="profils">
        <h2>Les profils de cette famille</h2>
        <div class="conteneurs-profils">
          {#each famille.profils as profil}
            <dsfr-card
              title={profil.titre}
              has-description
              description={profil.description}
              has-header-badge
              href={`/metiers/${profil.id}`}
              size="md"
              src={profil.liens.illustration ?? '/assets/images/image-generique.svg'}
              enlarge
            >
              <dsfr-badge
                slot="headerbadges"
                label={famille.code}
                type="accent"
                accent={accentPourFamille(famille.code)}
              ></dsfr-badge>
              <img
                slot="img"
                src={profil.liens.illustration ?? '/assets/images/image-generique.svg'}
                alt={profil.titre}
              />
            </dsfr-card>
          {/each}
        </div>
      </section>

      <section id="metiers">
        <h2>Les métiers de la famille</h2>
        <p class="fr-text--lg sous-titre-section">D'après le Panorama des métiers de la cybersécurité de l'ANSSI.</p>

        <div class="conteneur-metiers">
          <dsfr-table
            caption="Les métiers de la famille"
            no-caption
            multiline
            layout-fixed
            columns={[
              { key: 'metier', label: 'Métier', rich: true, size: 'md' },
              { key: 'missions', label: 'Missions principales' },
              { key: 'temoignages', label: 'Témoignages de pros', rich: true, size: 'md' },
            ]}
            rows={famille.fonctions.map((f) => ({
              metier: f.nom,
              missions: f.missionPrincipale,
              temoignages: f.témoignage?.nom ?? '',
            }))}
          >
            {#each famille.fonctions as fonction, index}
              <div slot={`cell:metier:${index}`}>
                <strong>{fonction.nom}</strong>
                {#if fonction.lien}
                  <br />
                  <dsfr-link label="Voir la fiche métier" size="sm" href={fonction.lien} blank></dsfr-link>
                {/if}
              </div>
              <div slot={`cell:temoignages:${index}`}>
                {#if fonction.témoignage?.nom}
                  <dsfr-link label={fonction.témoignage.nom} size="sm" href={fonction.témoignage.lien} blank
                  ></dsfr-link>
                {/if}
              </div>
            {/each}
          </dsfr-table>
        </div>
      </section>

      <section id="formations">
        <h2>Entraîne-toi dès maintenant</h2>
        <p class="fr-text--lg sous-titre-section">
          Des parcours et des compétitions où l'on enquête et où l'on détecte, comme les pros.
        </p>
        <div class="cartes-ressources">
          {#each famille.ressourcesAssociées as ressource}
            <dsfr-card
              title={ressource.titre}
              has-description
              description={ressource.description}
              href={ressource.lienExterne}
              size="md"
              horizontal
              src={ressource.urlIllustration ?? '/assets/images/image-generique.svg'}
              alt={ressource.titre}
              enlarge
            >
            </dsfr-card>
          {/each}
        </div>
      </section>
    </Fiche>
  </dsfr-container>

  <section class="autres-familles">
    <dsfr-container>
      <h2>Explore les autres familles de métiers</h2>
      <div class="conteneur-autres-familles">
        {#each autresFamilles as autreFamille}
          <dsfr-card
            title={autreFamille.titre}
            href={`/familles-metier/${slugifie(autreFamille.code)}`}
            size="sm"
            has-badge
            enlarge
          >
            <dsfr-badge
              slot="badgesgroup"
              label={autreFamille.code}
              type="accent"
              accent={accentPourFamille(autreFamille.code)}
            ></dsfr-badge>
          </dsfr-card>
        {/each}
      </div>
    </dsfr-container>
  </section>

  <div class="retour-haut-page">
    <dsfr-container>
      <dsfr-link label="Haut de page" href="#" size="md" has-icon icon="arrow-up-fill"></dsfr-link>
    </dsfr-container>
  </div>
{/if}

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .hero {
    &-chapeau {
      margin-block-end: 0;
    }

    &-illustration {
      background-color: var(--image-couleur-fond);
      aspect-ratio: 588 / 331;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding-block: 2.75rem;

      &.yellow-moutarde {
        --image-couleur-fond: var(--background-contrast-yellow-moutarde);
        --numero-couleur-bordure: var(--artwork-motif-yellow-moutarde);
        --numero-couleur-texte: var(--text-label-yellow-moutarde);
      }
      &.green-emeraude {
        --image-couleur-fond: var(--background-contrast-green-emeraude);
        --numero-couleur-bordure: var(--artwork-motif-green-emeraude);
        --numero-couleur-texte: var(--text-label-green-emeraude);
      }
      &.blue-cumulus {
        --image-couleur-fond: var(--background-contrast-blue-cumulus);
        --numero-couleur-bordure: var(--artwork-motif-blue-cumulus);
        --numero-couleur-texte: var(--text-label-blue-cumulus);
      }
      &.purple-glycine {
        --image-couleur-fond: var(--background-contrast-purple-glycine);
        --numero-couleur-bordure: var(--artwork-motif-purple-glycine);
        --numero-couleur-texte: var(--text-label-purple-glycine);
      }
      &.green-archipel {
        --image-couleur-fond: var(--background-contrast-green-archipel);
        --numero-couleur-bordure: var(--artwork-motif-green-archipel);
        --numero-couleur-texte: var(--text-label-green-archipel);
      }
    }

    &-numero {
      --numero-dimension: 47.75%;

      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      border: 0.75rem solid var(--numero-couleur-bordure);
      color: var(--numero-couleur-texte);
      font-size: 5rem;
      font-weight: bold;
      width: var(--numero-dimension);
    }
  }

  .conteneur-fiche-famille {
    --espacement-sections-contenu: 3rem;
  }

  .tuiles-roles {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
    margin-block-start: 2rem;

    @include a-partir-de(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .conteneurs-profils {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
    margin-block-start: 2rem;

    @include a-partir-de(md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .sous-titre-section {
    margin-bottom: 2rem;
  }

  .conteneur-metiers {
    margin-block-start: 2rem;
  }

  .cartes-ressources {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .autres-familles {
    background: var(--background-alt-blue-france);
    padding: 4.5rem 1rem;

    @include a-partir-de(md) {
      padding-inline: 1.5rem;
    }
  }

  .conteneur-autres-familles {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
    margin-block-start: 2rem;

    @include a-partir-de(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include a-partir-de(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .retour-haut-page {
    padding-block: 1.5rem;
  }
</style>
