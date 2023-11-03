const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("public"));

app.listen(port, () =>
  console.log(
    `DemainSpécialisteCyber-media est démarré et écoute sur le port ${port} !…`,
  ),
);
