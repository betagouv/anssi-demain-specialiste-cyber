const environnement = () => ({
  ipAutorisees: () => process.env.ADRESSES_IP_AUTORISEES?.split(",") ?? [],
  activerFiltrageIp: () => environnement().ipAutorisees().length > 0
});

module.exports = { environnement };
