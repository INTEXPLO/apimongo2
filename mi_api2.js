// mi_api2.js
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());

// Reemplaza con tu URI de conexión a MongoDB
const uri = "mongodb+srv://lusswicho045_db_user:ylPFTNSBNUy0zEEA@ecolog.alns23b.mongodb.net/?appName=ECOLOG";

const client = new MongoClient(uri);

let db;

async function () {

    try {

        await client.connect();

        db = client.db("juego");

        console.log("MongoDB conectado xd 🗣️🔥");

    } catch(error) {

        console.log(error);
    }
}

conectarDB();

app.post("/guardar", async (req, res) => {

    try {
        
        const datos = req.body;

        // Aquí puedes realizar validaciones o transformaciones si es necesario
        console.log(datos)
        console.log(datos.alias)
        await db.collection("saves").updateOne(
            { id: datos.id },
            { $set: datos },
            { upsert: true }
        );

        console.log("SAVE GUARDADO 🔥");

        res.send("Guardado en MongoDB");
        
    // Si quieres enviar una respuesta con el ID del documento guardado, puedes hacerlo así:
    } catch(error) {

        console.log(error);

        res.status(500).send("Error");
    }
});
// Iniciar el servidor
app.listen(3000, () => {

    console.log("Servidor funcionando 🔥");
});