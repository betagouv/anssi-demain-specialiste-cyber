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
    $("body")[0].style.setProperty(
      "--carrousel-decalage-gauche",
      `${decalageCourant}px`,
    );

    $(".contenu-personnage").hide();
    $(
      `.contenu-personnage[data-id-personnage='${idxPersonnageVisible}']`,
    ).show();
  });

  $(".contenu-personnage[data-id-personnage='0']").show();

  $("img", $carrouselPersonnage).each(function (idx) {
    const cibleScroll = idx * largeurImage;
    $(this).css("--cible-scroll", `${cibleScroll}px`);
  });
});
