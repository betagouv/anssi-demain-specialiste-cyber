const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./vues");
app.use(express.static("public"));

app.get("/", (req, rep) => {
  const indexVideoAgir = Math.floor(Math.random() * 2) + 1;
  const videoAgir = `agir-video-${indexVideoAgir}-placeholder.png`;
  rep.render("index", { videoAgir });
});

app.listen(port, () => {
  console.log(
    `DemainSpécialisteCyber est démarré et écoute sur le port ${port} !…`,
  );
});
