<script lang="ts">
  import axios from 'axios';

  export let idJeu: string;
  export let reactionsDuJeu: Record<string, number>;

  $: reactions = ['❤️', '👍', '🔥'].map((typeReaction) => ({
    id: typeReaction,
    emoji: typeReaction,
    compteur: reactionsDuJeu[typeReaction],
    actif: false,
  }));

  const ajouteReaction = async (e: CustomEvent) => {
    await axios.post(`/api/jeux/${idJeu}/reactions`, {
      type: e.detail,
      action: 'ajout',
    });
    reactions = reactions.map((reaction) => ({
      ...reaction,
      compteur:
        reaction.id === e.detail ? reaction.compteur + 1 : reaction.compteur,
      actif: reaction.id === e.detail ? true : reaction.actif,
    }));
  };

  const supprimeReaction = async (e: CustomEvent) => {
    await axios.post(`/api/jeux/${idJeu}/reactions`, {
      type: e.detail,
      action: 'retrait',
    });
    reactions = reactions.map((reaction) => ({
      ...reaction,
      compteur:
        reaction.id === e.detail ? reaction.compteur - 1 : reaction.compteur,
      actif: reaction.id === e.detail ? false : reaction.actif,
    }));
  };
</script>

<lab-anssi-reactions
  tooltip-texte="Ajouter une réaction"
  tooltip-id="tooltip-reaction"
  variant="tertiaire"
  {reactions}
  onajouteReaction={ajouteReaction}
  onsupprimeReaction={supprimeReaction}
>
</lab-anssi-reactions>
