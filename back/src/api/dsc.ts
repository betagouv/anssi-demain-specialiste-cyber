import express from "express";

export const creeServeur = () => {
  const app = express();

  app.get("/", (requete, reponse) => {
    reponse.send("Bonjour DSC");
  });

  app.get("/catalogue", (requete, reponse) => {
    reponse.sendFile(`./pages/catalogue.html`, {
      root: ".",
    });
  });

  return app;
};
