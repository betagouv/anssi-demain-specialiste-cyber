const environnement = () => ({
  dateDeMep: () => new Date(process.env.DATE_DE_MEP_FORMAT_ISO),
  peutCoupeFileDateDeMep: (secret) =>
    process.env.COUPE_FILE_DATE_MEP &&
    secret === process.env.COUPE_FILE_DATE_MEP,
  limiteDeRequetesParIpParMinute: () =>
    Number(process.env.LIMITE_DE_REQUETES_PAR_IP_PAR_MINUTE),
  ipAutorisees: () => process.env.ADRESSES_IP_AUTORISEES?.split(",") ?? [],
});

module.exports = { environnement };
