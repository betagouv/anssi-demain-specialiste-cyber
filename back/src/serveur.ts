import express from "express"

const app = express()

app.get("/", (requete, reponse) => {
    reponse.send("Bonjour DSC")
})

const serveur = app.listen(3000, () => {
    console.log("Le serveur écoute sur le port 3000")
})

serveur.on("error", (erreur) => {
    console.error(erreur)
    process.exit(1)
})