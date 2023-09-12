const express = require("express");
const { metiersAuHasard, videoAgirAleatoire } = require("./referentiel");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./vues");
app.use(express.static("public"));

app.get("/", (req, rep) => {
  rep.render("index", {
    videoAgir: videoAgirAleatoire(),
    fichesMetiers: metiersAuHasard(3),
  });
});

app.listen(port, () => {
  console.log(
    `DemainSpécialisteCyber est démarré et écoute sur le port ${port} !…`,
  );
});
