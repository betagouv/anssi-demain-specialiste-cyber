import express from "express"

const app = express()

app.get("/", (requete, reponse) => {
    reponse.send("Bonjour DSC")
})

const port = process.env.PORT || 3000;

const serveur = app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`)
})

serveur.on("error", (erreur) => {
    console.error(erreur)
    process.exit(1)
})