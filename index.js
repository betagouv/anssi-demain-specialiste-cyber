require("dotenv").config();
const express = require("express");
const {
  metiersAuHasard,
  videoAgirAleatoire,
  tousLesMetiers,
  tousLesPersonnages,
  lesRessourcesEnseignant,
  lesFormationsEnseignant,
} = require("./referentiel");
const middleware = require("./middleware");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./vues");
app.use(express.static("public"));

app.use(middleware.patienteJusqueMep);

app
  .get("/", (req, rep) => {
    rep.render("index", {
      videoAgir: videoAgirAleatoire(),
      fichesMetiers: metiersAuHasard(3),
    });
  })
  .get("/les-metiers", (req, rep) => {
    rep.render("metiers", { fichesMetiers: tousLesMetiers() });
  })
  .get("/espace-enseignant", (req, rep) => {
    rep.render("espace-enseignant", {
      ressources: lesRessourcesEnseignant(),
      formations: lesFormationsEnseignant(),
    });
  })
  .get("/la-campagne", (req, rep) => {
    rep.render("campagne", { personnages: tousLesPersonnages() });
  })
  .get("/plan-site", (req, rep) => rep.render("plan-site"));

app.listen(port, () => {
  console.log(
    `DemainSpécialisteCyber est démarré et écoute sur le port ${port} !…`,
  );
});
