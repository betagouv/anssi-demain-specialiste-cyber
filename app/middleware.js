const rateLimit = require("express-rate-limit");
const ipfilter = require("express-ipfilter").IpFilter;
const { environnement } = require("./environnement");

const filtreIpAutorisees = () => {
  const ips = environnement().ipAutorisees();
  return ipfilter(ips, { mode: "allow", log: false });
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

const protectionLimiteTrafic = () => {
  const uneMinute = 60 * 1000;
  const maxParFenetreParIp = environnement().limiteDeRequetesParIpParMinute();

  return rateLimit({
    windowMs: uneMinute,
    max: maxParFenetreParIp,
    handler: (_, reponse) => {
      reponse.end();
    },
    keyGenerator: (requete) =>
      // Utilise l'IP de l'utilisateur : https://doc.scalingo.com/platform/internals/routing
      requete.headers["x-real-ip"],
  });
};

module.exports = {
  filtreIpAutorisees,
  patienteJusqueMep,
  protectionLimiteTrafic,
};
