$(document).ready(() => {
  $(".action-copier").on("click", async (e) => {
    const $bouton = $(e.target);
    $bouton.addClass("copie-en-cours");
    setTimeout(() => {
      $bouton.removeClass("copie-en-cours");
    }, 5000);
    const src = $bouton.parent().prevAll("video").attr("src");
    await navigator.clipboard.writeText(src);
  });
});
