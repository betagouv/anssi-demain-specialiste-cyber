import express from "express";

export const creeServeur = () => {
  const app = express();

  app.get("/", (_requete, reponse) => {
    reponse.send("Bonjour DSC");
  });

  app.get("/catalogue", (_requete, reponse) => {
    reponse.sendFile(`./pages/catalogue.html`, {
      root: ".",
    });
  });

  return app;
};
