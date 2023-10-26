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
    const { metier: idMetier } = req.query;
    rep.render("metiers", {
      fichesMetiers: idMetier ? autresMetiers(idMetier) : tousLesMetiers(),
      ...(idMetier && { focusMetier: leMetier(idMetier) }),
    });
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
  .get("/plan-site", (req, rep) => rep.render("plan-site"))
  .get("/partenaires", (req, rep) => rep.render("partenaires"));

app.listen(port, () => {
  console.log(
    `DemainSpécialisteCyber est démarré et écoute sur le port ${port} !…`,
  );
});
