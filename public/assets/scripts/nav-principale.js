$(document).ready(() => {
  $("#burger").on("click", () => {
    $("#menu-burger").addClass("ouvert");
  });
  $("#fermeture-menu").on("click", () =>
    $("#menu-burger").removeClass("ouvert"),
  );
});
