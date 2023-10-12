const { environnement } = require("./environnement");

const patienteJusqueMep = (requete, reponse, suite) => {
  const ajd = new Date();
  const mep = environnement().dateDeMep();

  if (ajd < mep) {
    reponse.render("lancement", { dateDeMep: environnement().dateDeMep() });
    return;
  }

  suite();
};

module.exports = { patienteJusqueMep };
