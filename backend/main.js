import express from "express";
import {readFile} from "../data/index.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/possession",async(req,res) =>{
    res.send(await readFile("./data.json"))
})
app.get("/patrimoine/:valeur",async(req,res) =>{
    const valeur = req.params.valeur
    const data = await readFile("./data.json")

    const possessions = data.data[1].data.possessions
    const filterPossession = () => {
       return possessions.filter((valeur) => possessions.valeur <= valeur )
    }
    res.send(filterPossession())
})

app.post("/newValue",async(req,res) => {
    const body = req.body
    res.send(body)
})

app.listen(3000,() => {
    console.log("Je teste")
})