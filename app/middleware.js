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

module.exports = {
  filtreIpAutorisees,
  patienteJusqueMep,
};
