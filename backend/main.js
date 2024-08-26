import express from "express";
import {readFile} from "../data/index.js";

const app = express();
app.get("/possession",async(req,res) =>{
    res.send(await readFile("./data.json"))
})
app.listen(3000,() => {
    console.log("Je teste")
})