const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./vues");

app.get("/", (req, rep) => rep.render("index"));

app.listen(port, () => {
  console.log(
    `DemainSpécialisteCyber est démarré et écoute sur le port ${port} !…`,
  );
});
