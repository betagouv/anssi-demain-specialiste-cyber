const environnement = () => ({
  dateDeMep: () => new Date(process.env.DATE_DE_MEP_FORMAT_ISO),
  peutCoupeFileDateDeMep: (secret) =>
    process.env.COUPE_FILE_DATE_MEP &&
    secret === process.env.COUPE_FILE_DATE_MEP,
  ipAutorisees: () => process.env.ADRESSES_IP_AUTORISEES?.split(",") ?? [],
  activerFiltrageIp: () => environnement().ipAutorisees().length > 0,
});

module.exports = { environnement };
