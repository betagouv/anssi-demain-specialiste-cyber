#!/usr/bin/env bash

if [[ -z "${OVH_S3_KEY}" ]] || [[ -z "${OVH_S3_SECRET}" ]]; then
  echo "Script de téléchargement des fichiers S3 annulé car les variables OVH_S3_KEY et OVH_S3_SECRET ne sont pas définies"
  exit 1
fi

VERT="\033[0;32m"
NC="\033[0m"

bucket="demain-specialiste-cyber-prod"
signatureVide=$(echo -n "" | sha256sum | tr -d "[:space:]-")

mkdir -p public
mkdir -p public/videos

listeObjet=$(curl --request GET "https://${bucket}.s3.gra.perf.cloud.ovh.net/" \
  -H "Content-Type: application/json" \
  -H "Host: ${bucket}.s3.gra.perf.cloud.ovh.net" \
  -H "x-amz-content-sha256: $signatureVide" \
  --user $OVH_S3_KEY:$OVH_S3_SECRET \
  --aws-sigv4 "aws:amz:gra:s3" \
  --retry 5 \
  --retry-max-time 120 \
  --silent)
printf "${VERT}✔${NC}️ Récupération de la liste des objets S3\n"


analyseReponseXML () { local IFS=\> ; read -d \< E C ;}

tousFichiers=()
while analyseReponseXML; do
    if [[ $E = "Key" ]]; then
        tousFichiers+=("$C")
    fi
done < <(echo "$listeObjet")
printf "${VERT}✔${NC}️ Analyse de la réponse XML\n"


telechargeFichier () {
  nomFichier="$1"
  typeContenu="video/mp4"
  if [[ "$nomFichier" == *.png ]]; then
    typeContenu="image/png"
  fi
  curl --request GET "https://${bucket}.s3.gra.perf.cloud.ovh.net/${nomFichier}" \
    -H "Content-Type: ${typeContenu}" \
    -H "Host: ${bucket}.s3.gra.perf.cloud.ovh.net" \
    -H "x-amz-content-sha256: $signatureVide" \
    --user $OVH_S3_KEY:$OVH_S3_SECRET \
    --aws-sigv4 "aws:amz:gra:s3" \
    --retry 5 \
    --retry-max-time 120 \
    --silent \
    --output "./public/videos/${nomFichier}"
  printf "\t${VERT}✔${NC}️ Téléchargement du fichier ${nomFichier}\n"
}

for nomFichier in "${tousFichiers[@]}"; do
  telechargeFichier $nomFichier
done

printf "${VERT}✔${NC}️ Tous les fichiers ont étés téléchargés\n"
