const environnement = () => ({
  dateDeMep: () => new Date(process.env.DATE_DE_MEP_FORMAT_ISO),
  peutCoupeFileDateDeMep: (secret) =>
    process.env.COUPE_FILE_DATE_MEP &&
    secret === process.env.COUPE_FILE_DATE_MEP,
});

module.exports = { environnement };
