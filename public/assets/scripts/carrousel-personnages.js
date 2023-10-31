$(document).ready(() => {
  const $carrouselPersonnage = $("#carrousel-personnages");
  const largeurImage = $carrouselPersonnage.find("img").width();

  const glissePersonnageVers = (sens) => {
    const decalageCourant = $carrouselPersonnage.scrollLeft();
    $carrouselPersonnage.scrollLeft(
      decalageCourant + ((3 * largeurImage) / 4) * sens,
    );
  };
  $(".fleche-droite", "#campagne").on("click", () => glissePersonnageVers(+1));
  $(".fleche-gauche", "#campagne").on("click", () => glissePersonnageVers(-1));

  $carrouselPersonnage.on("scroll", () => {
    const decalageCourant = $carrouselPersonnage.scrollLeft();
    const idxPersonnageVisible = Math.round(decalageCourant / largeurImage);
    $(".contenu-personnage").hide();
    $(
      `.contenu-personnage[data-id-personnage='${idxPersonnageVisible}']`,
    ).show();
  });

  $(".contenu-personnage[data-id-personnage='0']").show();
});
