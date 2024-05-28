const modifieCheckboxConsentement = (estOptOut) => {
  $("#consentement-matomo").prop("checked", !estOptOut);
  $("#label-consentement-matomo").text(
    estOptOut
      ? "Vous n'êtes actuellement pas suivi(e). Cochez cette case pour ne plus être exclu(e)."
      : "Vous êtes suivi(e) de manière anonyme. Décochez cette case pour vous exclure du suivi.",
  );
};

$(document).ready(() => {
  $("#consentement-matomo").on("change", () => {
    const optOutMatomo = !$("#consentement-matomo").is(":checked");
    localStorage.setItem("optOutMatomo", String(optOutMatomo));
    modifieCheckboxConsentement(optOutMatomo);
  });

  modifieCheckboxConsentement(localStorage.getItem("optOutMatomo") === "true");
});
