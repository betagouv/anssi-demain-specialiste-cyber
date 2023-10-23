$(document).ready(() => {
  const glisseMetiersVers = (sens) => {
    const $carrouselMetier = $("#carrousel-fiches-metiers");
    const uneImage = $carrouselMetier.find("img").width();
    const decalageCourant = $carrouselMetier.scrollLeft();
    const troisQuart = uneImage * (3 / 4);
    $carrouselMetier.scrollLeft(decalageCourant + troisQuart * sens);
  };
  $(".fleche-droite", "#metiers").on("click", () => glisseMetiersVers(+1));
  $(".fleche-gauche", "#metiers").on("click", () => glisseMetiersVers(-1));

  const glisseStatsVers = (sens) => {
    const $carrouselStats = $("#infos");
    const uneImage = $carrouselStats.find(".info").width();
    const decalageCourant = $carrouselStats.scrollLeft();
    const troisQuart = uneImage * (3 / 4);
    $carrouselStats.scrollLeft(decalageCourant + troisQuart * sens);
  };
  $(".fleche-droite", "#stats").on("click", () => glisseStatsVers(+1));
  $(".fleche-gauche", "#stats").on("click", () => glisseStatsVers(-1));
});
