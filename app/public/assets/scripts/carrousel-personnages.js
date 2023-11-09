$(document).ready(() => {
  const donneesPersonnages = JSON.parse(
    $("#carrousel-personnages-donnees").text(),
  );
  const $carrouselPersonnage = $("#carrousel-personnages");
  const $autoScroll = $("#autoscroll-carrousel-personnages");
  const { autoscroll = false } = JSON.parse(
    $autoScroll.text() === "" ? "{}" : $autoScroll.text(),
  );

  const afficheContenuPersonnage = (idx) => {
    const donnees = donneesPersonnages[idx];
    const $conteneur = $("#description-carrousel");
    $(".nom-personnage", $conteneur).text(`${donnees.nom}, ${donnees.age} ans`);
    $(".poste-personnage", $conteneur).text(donnees.poste);
    $(".accroche-personnage", $conteneur).text(donnees.accroche);
    $(".description-personnage", $conteneur).text(donnees.description);
  };

  const brancheComportementCarrousel = () => {
    $(".fleche-droite", "#campagne").off("click");
    $(".fleche-gauche", "#campagne").off("click");
    $carrouselPersonnage.off("scroll");

    const margeColonne = parseFloat(
      $carrouselPersonnage.css("column-gap").replace("px", ""),
    );
    const largeurImage = $carrouselPersonnage.find("img").width();

    const glissePersonnageVers = (sens) => {
      const decalageCourant = $carrouselPersonnage.scrollLeft();
      $carrouselPersonnage.scrollLeft(
        decalageCourant + ((3 * largeurImage) / 4 + margeColonne) * sens,
      );
    };
    $(".fleche-droite", "#campagne").on("click", () =>
      glissePersonnageVers(+1),
    );
    $(".fleche-gauche", "#campagne").on("click", () =>
      glissePersonnageVers(-1),
    );

    $carrouselPersonnage.on("scroll", () => {
      const decalageCourant = $carrouselPersonnage.scrollLeft();
      const idxPersonnageVisible = Math.round(
        decalageCourant / (largeurImage + margeColonne),
      );
      afficheContenuPersonnage(idxPersonnageVisible);
    });

    if (autoscroll) {
      setInterval(() => {
        const estAuDernierSlide =
          $carrouselPersonnage.scrollLeft() ===
          $carrouselPersonnage[0].scrollWidth - 2 * largeurImage;
        if (estAuDernierSlide) $carrouselPersonnage.scrollLeft(0);
        else glissePersonnageVers(+1);
      }, 5000);
    }
  };

  brancheComportementCarrousel();
  $carrouselPersonnage.scrollLeft(0);
  afficheContenuPersonnage(0);

  $(window).on("resize", () => {
    brancheComportementCarrousel();
  });
});
