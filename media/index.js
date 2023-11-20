require("dotenv").config();
const express = require("express");
const { environnement } = require("./environnement");
const middleware = require("./middleware");

const app = express();
const port = process.env.PORT || 3001;

if (environnement().activerFiltrageIp()) {
  app.use(middleware.filtreIpAutorisees());
}

app.use(express.static("public", { maxAge: 3_600_000 }));

app.use(middleware.gestionnaireErreur);

app.listen(port, () =>
  console.log(
    `DemainSpécialisteCyber-media est démarré et écoute sur le port ${port} !…`,
  ),
);
