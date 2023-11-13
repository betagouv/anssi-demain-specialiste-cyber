const ipfilter = require("express-ipfilter").IpFilter;
const IpDeniedError = require("express-ipfilter").IpDeniedError;
const { environnement } = require("./environnement");

const filtreIpAutorisees = () => {
  const ips = environnement().ipAutorisees();
  return ipfilter(ips, {
    // Utilise l'IP d'origine : https://doc.scalingo.com/platform/internals/routing
    detectIp: (requete) => requete.headers["x-real-ip"],
    mode: "allow",
    log: false,
  });
};

const patienteJusqueMep = (requete, reponse, suite) => {
  const { query } = requete;

  const ajd = new Date();
  const mep = environnement().dateDeMep();
  const doitPatienter = ajd < mep;
  const coupeFile = environnement().peutCoupeFileDateDeMep(query["coupe-file"]);

  if (doitPatienter && !coupeFile) {
    reponse.render("lancement", { dateDeMep: environnement().dateDeMep() });
    return;
  }

  suite();
};

const gestionnaireErreur = (erreur, _req, res, suite) => {
  // https://github.com/jetersen/express-ipfilter#error-handling
  if (erreur instanceof IpDeniedError) res.end();

  suite();
};

module.exports = {
  gestionnaireErreur,
  filtreIpAutorisees,
  patienteJusqueMep,
};
