$(document).ready(() => {
  $(".action-copier").on("click", async (e) => {
    const src = $(e.target).parent().prev("video").attr("src");
    await navigator.clipboard.writeText(src);
  });
});
