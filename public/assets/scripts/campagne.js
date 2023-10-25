$(document).ready(() => {
  const $carrouselPersonnage = $("#carrousel-personnages");
  const largeurImage = $carrouselPersonnage.find("img").width();

  const glissePersonnageVers = (sens) => {
    const decalageCourant = $carrouselPersonnage.scrollLeft();
    $carrouselPersonnage.scrollLeft(
      decalageCourant + (largeurImage / 2 + 1) * sens,
    );
  };
  $(".fleche-droite", "#campagne").on("click", () => glissePersonnageVers(+1));
  $(".fleche-gauche", "#campagne").on("click", () => glissePersonnageVers(-1));

  $carrouselPersonnage.on("scroll", () => {
    const decalageCourant = $carrouselPersonnage.scrollLeft();
    const idxPersonnageVisible = Math.floor(decalageCourant / largeurImage);
    $(".contenu-personnage").hide();
    $(`.contenu-personnage[data-id-personnage=${idxPersonnageVisible}]`).show();
  });

  const largeurTotaleCarrousel = $carrouselPersonnage[0].scrollWidth;
  $carrouselPersonnage.scrollLeft(largeurTotaleCarrousel / 4);
});
