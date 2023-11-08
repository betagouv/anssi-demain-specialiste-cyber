(() => {
  if (localStorage.getItem("optOutMatomo") !== "true") {
    window._paq = window._paq || [];
    const { _paq } = window;

    _paq.push(["disableCookies"]);
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);

    const u = "https://stats.beta.gouv.fr/";
    _paq.push(["setTrackerUrl", u + "matomo.php"]);
    _paq.push([
      "setSiteId",
      document.getElementById("script-matomo").getAttribute("data-site-id"),
    ]);
    const d = document,
      g = d.createElement("script"),
      s = d.getElementsByTagName("script")[0];
    g.async = true;
    g.src = u + "matomo.js";
    s.parentNode.insertBefore(g, s);
  }
})();
