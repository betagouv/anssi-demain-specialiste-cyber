$(document).ready(() => {
  // Cette API n'est pas disponible sur Firefox et Safari
  if (navigator.connection) {
    const vitesseMbps = navigator.connection.downlink;
    if (vitesseMbps > 3) {
      $("video").each(function () {
        const source = $(this).attr("src");
        $(this).attr("src", source.replace("720p", "1080p"));
      });
    }
  }
});
