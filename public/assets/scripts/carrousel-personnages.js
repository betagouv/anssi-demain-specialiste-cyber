$(document).ready(() => {
  const $carrouselPersonnage = $("#carrousel-personnages");
  const margeColonne = parseFloat(
    $carrouselPersonnage.css("column-gap").replace("px", ""),
  );
  const largeurImage = $carrouselPersonnage.find("img").width();
  const $autoScroll = $("#autoscroll-carrousel-personnages");
  const { autoscroll = false } = JSON.parse(
    $autoScroll.text() === "" ? "{}" : $autoScroll.text(),
  );

  const glissePersonnageVers = (sens) => {
    const decalageCourant = $carrouselPersonnage.scrollLeft();
    $carrouselPersonnage.scrollLeft(
      decalageCourant + ((3 * largeurImage) / 4 + margeColonne) * sens,
    );
  };
  $(".fleche-droite", "#campagne").on("click", () => glissePersonnageVers(+1));
  $(".fleche-gauche", "#campagne").on("click", () => glissePersonnageVers(-1));

  $carrouselPersonnage.on("scroll", () => {
    const decalageCourant = $carrouselPersonnage.scrollLeft();
    const idxPersonnageVisible = Math.round(
      decalageCourant / (largeurImage + margeColonne),
    );
    $(".contenu-personnage").hide();
    $(
      `.contenu-personnage[data-id-personnage='${idxPersonnageVisible}']`,
    ).show();
  });

  $(".contenu-personnage[data-id-personnage='0']").show();

  if (autoscroll) {
    setInterval(() => {
      const estAuDernierSlide =
        $carrouselPersonnage.scrollLeft() ===
        $carrouselPersonnage[0].scrollWidth - 2 * largeurImage;
      if (estAuDernierSlide) $carrouselPersonnage.scrollLeft(0);
      else glissePersonnageVers(+1);
    }, 5000);
  }
});
