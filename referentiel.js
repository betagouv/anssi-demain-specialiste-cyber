const donnees = {
  metiers: [
    { metier: "Pentester", identite: "Julie", idVideo: "pentester" },
    {
      metier: "Responsable de la sécurité des systèmes d’information (RSSI)",
      identite: "Edouard",
      idVideo: "rssi",
    },
    {
      metier: "Analyste réponse aux incidents",
      identite: "Gregory et Barbara",
      idVideo: "analyste-incidents",
    },
  ],
};

const metiersAuHasard = (combien) => {
  const nbMetiers = donnees.metiers.length;
  const indexDepart = Math.floor(Math.random() * nbMetiers);

  const selection = [];
  for (let i = 0; i < combien; i++)
    selection.push(donnees.metiers[(indexDepart + i) % nbMetiers]);

  return selection;
};

module.exports = { metiersAuHasard };
