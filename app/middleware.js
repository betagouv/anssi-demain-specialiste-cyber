const rateLimit = require("express-rate-limit");
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

const protectionLimiteTrafic = () => {
  const uneMinute = 60 * 1000;
  const maxParFenetreParIp = 600;

  return rateLimit({
    windowMs: uneMinute,
    max: maxParFenetreParIp,
    handler: (requete, reponse) => {
      reponse.render("erreurTropDeTrafic");
    },
    keyGenerator: (requete) =>
      // Utilise l'IP de l'utilisateur : https://doc.scalingo.com/platform/internals/routing
      requete.headers["x-real-ip"],
  });
};

module.exports = { patienteJusqueMep, protectionLimiteTrafic };
