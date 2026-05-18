// mi_api2.js
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());

// URI MongoDB
const uri = "mongodb+srv://lusswicho045_db_user:ylPFTNSBNUy0zEEA@ecolog.alns23b.mongodb.net/?appName=ECOLOG";

const client = new MongoClient(uri);

let db;

// Puerto para Render
const PORT = process.env.PORT || 3000;

async function conectarDB() {

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

        console.log(datos);
        console.log(datos.alias);

        await db.collection("saves").updateOne(

            { id: datos.id },

            { $set: datos },

            { upsert: true }
        );

        console.log("SAVE GUARDADO 🔥");

        res.send("Guardado en MongoDB");

    } catch(error) {

        console.log(error);

        res.status(500).send("Error");
    }
});

// Ruta básica para probar si el server vive 😈
app.get("/", (req, res) => {

    res.send("API funcionando 🗣️🔥");
});

// Iniciar servidor
app.listen(PORT, () => {

    console.log(`Servidor funcionando en puerto ${PORT} 🔥`);
});