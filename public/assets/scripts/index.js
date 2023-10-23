$(document).ready(() => {
  const $carrouselMetier = $("#carrousel-fiches-metiers");

  const glisseVers = (sens) => {
    const uneImage = $carrouselMetier.find("img").width();
    const decalageCourant = $carrouselMetier.scrollLeft();
    const troisQuart = uneImage * (3 / 4);
    $carrouselMetier.scrollLeft(decalageCourant + troisQuart * sens);
  };

  const $navigation = $("#metiers .carrousel-navigation ");
  $(".fleche-droite", $navigation).on("click", () => glisseVers(+1));
  $(".fleche-gauche", $navigation).on("click", () => glisseVers(-1));
});
