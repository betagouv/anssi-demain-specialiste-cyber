const environnement = () => ({
  dateDeMep: () => new Date(process.env.DATE_DE_MEP_FORMAT_ISO),
});

module.exports = { environnement };
