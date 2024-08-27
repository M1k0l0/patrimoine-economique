import express from "express";
import { readFile, writeFile } from "../data/index.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/possession", async (req, res) => {
    const data = await readFile("./data.json");
    res.json(data);
});

app.put("/possession/:libelle", async (req, res) => {
    const { libelle } = req.params;
    const { dateFin } = req.body;
    const data = await readFile("./data.json");
    const possessions = data.data[1].data.possessions;
    const possession = possessions.find(p => p.libelle === libelle);

    if (possession) {
        possession.dateFin = dateFin;
        await writeFile("./data.json", data);
        res.json(possession);
    } else {
        res.status(404).json({ error: 'Possession not found' });
    }
});

app.post("/possession", async (req, res) => {
    const { libelle, valeur, dateDebut, dateFin, taux } = req.body;
    const data = await readFile("./data.json");
    const possessions = data.data[1].data.possessions;
    const newPossession = { libelle, valeur, dateDebut, dateFin, taux };
    possessions.push(newPossession);
    await writeFile("./data.json", data);
    res.status(201).json(newPossession);
});

app.get("/patrimoine/range", async (req, res) => {
    const { dateDebut, dateFin, jour, type } = req.query; 

    const data = await readFile("./data.json");
    const possessions = data.data[1].data.possessions;

    const filteredPossessions = possessions.filter(p => {
        const isInRange = new Date(p.dateDebut) >= new Date(dateDebut) &&
            new Date(p.dateFin) <= new Date(dateFin);
        return isInRange;
    });

    const totalValue = filteredPossessions.reduce((sum, p) => sum + p.valeur, 0);
    res.json({ totalValue });
});

app.put("/possession/:libelle/close", async (req, res) => {
    const { libelle } = req.params;
    const currentDate = new Date().toISOString();

    const data = await readFile("./data.json");
    const possessions = data.data[1].data.possessions;
    const possession = possessions.find(p => p.libelle === libelle);

    if (possession) {
        possession.dateFin = currentDate;
        await writeFile("./data.json", data);
        res.json(possession);
    } else {
        res.status(404).json({ error: 'Possession not found' });
    }
});

app.get("/patrimoine/:valeur", async (req, res) => {
    const { valeur } = req.params;

    const data = await readFile("./data.json");
    const possessions = data.data[1].data.possessions;
    const filteredPossessions = possessions.filter(p => p.valeur <= parseFloat(valeur));
    res.json(filteredPossessions);
});

app.post("/newValue", async (req, res) => {
    const body = req.body;
    res.status(201).json(body);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});