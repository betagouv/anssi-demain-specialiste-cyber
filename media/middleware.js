const ipfilter = require("express-ipfilter").IpFilter;
const { environnement } = require("./environnement");
const { IpDeniedError } = require("express-ipfilter");

const filtreIpAutorisees = () => {
  const ips = environnement().ipAutorisees();
  return ipfilter(ips, {
    // Utilise l'IP d'origine : https://doc.scalingo.com/platform/internals/routing
    detectIp: (requete) => requete.headers["x-real-ip"],
    mode: "allow",
    log: false
  });
};

const gestionnaireErreur = (erreur, _req, res, suite) => {
  // https://github.com/jetersen/express-ipfilter#error-handling
  if (erreur instanceof IpDeniedError) res.end();

  suite();
};

module.exports = {
  filtreIpAutorisees,
  gestionnaireErreur
};
