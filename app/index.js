require("dotenv").config();
const express = require("express");
const {
  autresMetiers,
  leMetier,
  metiersAuHasard,
  videoAgirAleatoire,
  tousLesMetiers,
  tousLesPersonnages,
  lesRessourcesEnseignant,
  lesFormationsEnseignant,
  tousLesIdsMetiers,
} = require("./referentiel");
const middleware = require("./middleware");
const { query, validationResult } = require("express-validator");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./vues");
app.use(express.static("public", { maxAge: 3_600_000 }));

app.use(middleware.patienteJusqueMep);
app.use(middleware.protectionLimiteTrafic());

app
  .get("/", (req, rep) => {
    rep.render("index", {
      videoAgir: videoAgirAleatoire(),
      fichesMetiers: metiersAuHasard(3),
      personnages: tousLesPersonnages(),
    });
  })
  .get(
    "/les-metiers",
    [query("metier").isString().trim().isIn(tousLesIdsMetiers())],
    (req, rep) => {
      const donneesReponse = {
        fichesMetiers: tousLesMetiers(),
      };
      const { metier: idMetier } = req.query;
      if (!validationResult(req).errors.length) {
        donneesReponse.fichesMetiers = autresMetiers(idMetier);
        donneesReponse.focusMetier = leMetier(idMetier);
      }
      rep.render("metiers", donneesReponse);
    },
  )
  .get("/espace-enseignant", (req, rep) => {
    rep.render("espace-enseignant", {
      ressources: lesRessourcesEnseignant(),
      formations: lesFormationsEnseignant(),
    });
  })
  .get("/la-campagne", (req, rep) => {
    rep.render("campagne", { personnages: tousLesPersonnages() });
  })
  .get("/plan-site", (req, rep) => rep.render("plan-site"))
  .get("/partenaires", (req, rep) => rep.render("partenaires"))
  .get("/mentions-legales", (req, rep) => rep.render("mentions-legales"))
  .get("/politique-confidentialite", (req, rep) =>
    rep.render("politique-confidentialite"),
  )
  .get("/a-propos", (req, rep) => rep.render("a-propos"))
  .get("/accessibilite", (req, rep) => rep.render("accessibilite"));

app.listen(port, () => {
  console.log(
    `DemainSpécialisteCyber est démarré et écoute sur le port ${port} !…`,
  );
});
