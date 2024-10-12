import express from "express";
import { jokes } from "./data.js";
const app = express();
const PORT = 8080;

app.get("/jokes", (req, res) => {
    res.json(jokes);
})

app.listen(PORT, () => {
    console.log(`Sever Stared on Port : ${PORT}`)
})