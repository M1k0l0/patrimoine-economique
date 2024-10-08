const express = require('express');
const json = require('body-parser').json;
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(json());

let possessions = [ {
  "possesseur": {
      "nom": "John Doe"
  },
  "libelle": "MacBook Pro",
  "valeur": 4300000,
  "dateDebut": "2023-12-25T00:00:00.000Z",
  "dateFin": null,
  "tauxAmortissement": 5
},
{
  "possesseur": {
      "nom": "John Doe"
  },
  "libelle": "Compte épargne",
  "valeur": 500000,
  "dateDebut": "2019-01-06T00:00:00.000Z",
  "dateFin": null,
  "tauxAmortissement": -5
},
{
  "possesseur": {
      "nom": "John Doe"
  },
  "libelle": "Clothes",
  "valeur": 2000000,
  "dateDebut": "2020-01-01T00:00:00.000Z",
  "dateFin": null,
  "tauxAmortissement": 10
},
{
  "possesseur": {
      "nom": "John Doe"
  },
  "libelle": "Alternance",
  "valeur": 600000,
  "dateDebut": "2023-02-13T00:00:00.000Z",
  "dateFin": null,
  "tauxAmortissement": 0,
  "jour": 1,
  "valeurConstante": 600000
},
{
  "possesseur": {
      "nom": "John Doe"
  },
  "libelle": "Survie",
  "valeur": 300000,
  "dateDebut": "2023-02-13T00:00:00.000Z",
  "dateFin": null,
  "tauxAmortissement": 0,
  "jour": 2,
  "valeurConstante": -300000
},
{
  "possesseur": {
      "nom": "John Doe"
  },
  "libelle": "Redmi Note 9",
  "valeur": 800000,
  "dateDebut": "2022-12-29T00:00:00.000Z",
  "dateFin": null,
  "tauxAmortissement": 15
}];

let patrimoine = {};

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.get('/possession', (req, res) => {
  res.json(possessions);
});

app.post('/possession', (req, res) => {
  const { libelle, valeur, dateDebut, tauxAmortissement } = req.body;
  const newPossession = { 
    libelle, 
    valeur, 
    dateDebut, 
    tauxAmortissement,
    dateFin: null 
  };
  possessions.push(newPossession);
  res.status(201).json(newPossession);
});

app.put('/possession/:libelle/edit', (req, res) => {
  const { libelle } = req.params;
  const updatedDetails = req.body;
  const possession = possessions.find(p => p.libelle === libelle);
  if (possession) {
    Object.assign(possession, updatedDetails);
    res.json(possession);
  } else {
    res.status(404).send('Possession not found');
  }
});

app.post('/possession/:libelle/close', (req, res) => {
  const { libelle } = req.params;
  const possession = possessions.find(p => p.libelle === libelle);
  if (possession) {
    possession.dateFin = new Date().toISOString();
    res.json(possession);
  } else {
    res.status(404).send('Possession not found');
  }
});

app.get('/patrimoine/:date', (req, res) => {
  const { date } = req.params;
  res.json({ valeur: patrimoine[date] || 0 });
});

app.post('/patrimoine/range', (req, res) => {
  const { dateDebut, dateFin } = req.body;
  const startDate = new Date(dateDebut);
  const endDate = new Date(dateFin);
  const result = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d).toISOString().split('T')[0];
    let totalValue = 0;

    possessions.forEach(p => {
      const dateDebutPossession = new Date(p.dateDebut);
      const dateFinPossession = p.dateFin ? new Date(p.dateFin) : endDate;

      if (currentDate >= dateDebutPossession.toISOString().split('T')[0] &&
          currentDate <= dateFinPossession.toISOString().split('T')[0]) {

        let valeurPossession = p.valeur;

        if (p.tauxAmortissement) {
          const nbJours = Math.floor((new Date(currentDate) - dateDebutPossession) / (1000 * 60 * 60 * 24));
          const depreciation = valeurPossession * (p.tauxAmortissement / 100) * (nbJours / 365);
          valeurPossession -= depreciation;
        }

        if (p.valeurConstante && p.jour) {
          const nbJoursDepuisDebut = Math.floor((new Date(currentDate) - dateDebutPossession) / (1000 * 60 * 60 * 24)) + 1;
          if (nbJoursDepuisDebut >= p.jour) {
            valeurPossession += p.valeurConstante;
          }
        }

        totalValue += valeurPossession;
      }
    });

    result.push(totalValue);
  }

  res.json(result);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});