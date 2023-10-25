const donnees = {
  videosAgir: [{ idVideo: 1 }, { idVideo: 2 }],
  metiers: [
    {
      metier: "Pentester",
      id: "pentester",
      identite: "Julie",
      idVideo: "pentester",
    },
    {
      metier: "Responsable de la sécurité des systèmes d’information (RSSI)",
      id: "rssi",
      identite: "Edouard",
      idVideo: "rssi",
    },
    {
      metier: "Analyste réponse aux incidents",
      id: "analyste-incidents",
      identite: "Gregory et Barbara",
      idVideo: "analyste-incidents",
    },
  ],
  ressourcesEnseignant: [
    {
      titre: "Formez vos élèves à la cyber",
      accroche:
        "Vous pouvez vous-même formez vos élèves à la cybersécurité grâce au kit pédagogique CyberEnjeux et à la présentation.",
      ressources: [
        {
          nom: "Télécharger 13 fiches et cartes pédagogiques sur la cybersécurité et une présentation clé en main",
          fichier: "PPTX – 61,88 Ko",
          url: "#",
          classe: "telechargement",
        },
        {
          nom: "Organiser un hackaton CyberEnjeux dans votre établissement pour former vos élèves par la création de jeux",
          fichier: "PDF – 61,88 Ko",
          url: "#",
          classe: "telechargement",
        },
        {
          nom: "Découvrez plus d’informations sur Eduscol",
          details:
            "Eduscol la page éducation et cybersécurité du Ministère de l’Éducation Nationale et de la Jeunesse",
          fichier: "Accéder à Eduscol",
          url: "#",
          classe: "site",
        },
      ],
    },
    {
      titre: "Parlez des métiers cyber",
      accroche: "Des ressources pour pouvoir parler de la cyber à vos élèves :",
      ressources: [
        {
          nom: "Panorama des métiers de la cybersécurité",
          fichier: "PDF – 61,88 Ko",
          url: "#",
          classe: "telechargement",
        },
        {
          nom: "Référentiel des compétences des métiers de la cybersécurité (PDF)",
          fichier: "PDF – 61,88 Ko",
          url: "#",
          classe: "telechargement",
        },
      ],
    },
    {
      titre: "Guidez les élèves vers des formations labélisées",
      ressources: [
        {
          nom: "Découvrir les formations",
          details:
            "Sur son site l’ANSSI répertorie toutes les formations cyber labelisées, n’hésitez pas à en prendre connaissances pour en parler à vos élèves.",
          fichier: "Accéder aux formations cyber labelisées ",
          url: "#",
          classe: "site",
        },
      ],
    },
  ],
  formationsEnseignant: [
    {
      nom: "Trouvez des formations sur le numérique et la cyber sur la plateforme M@gistère.",
      fichier: "Accèdez à M@gistère",
      url: "#",
      classe: "telechargement",
    },
    {
      nom: "Développez vos compétences et vos connaissances sur la cybersécurité.",
      fichier: "Accèdez au MOOC",
      url: "#",
      classe: "telechargement",
    },
  ],
};

const lesFormationsEnseignant = () => donnees.formationsEnseignant;
const lesRessourcesEnseignant = () => donnees.ressourcesEnseignant;

const videoAgirAleatoire = () => {
  const indexVideo = Math.floor(Math.random() * donnees.videosAgir.length);
  const { idVideo } = donnees.videosAgir[indexVideo];
  return `agir-video-${idVideo}-placeholder.png`;
};

const tousLesMetiers = () => donnees.metiers;

const metiersAuHasard = (combien) => {
  const nbMetiers = donnees.metiers.length;
  const indexDepart = Math.floor(Math.random() * nbMetiers);

  const selection = [];
  for (let i = 0; i < combien; i++)
    selection.push(donnees.metiers[(indexDepart + i) % nbMetiers]);

  return selection;
};

module.exports = {
  lesFormationsEnseignant,
  lesRessourcesEnseignant,
  metiersAuHasard,
  tousLesMetiers,
  videoAgirAleatoire,
};
