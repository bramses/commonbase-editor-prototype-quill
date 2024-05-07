// an express server that hosts index.html and serves the static files in the public directory

import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SEARCH_URL = process.env.quoordinates_server
const RANDOM_URL = process.env.quoordinates_server_random

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// post body.text to the server
app.post("/query", (req, res) => {
    const { text } = req.body;
    console.log(text);

    fetch(SEARCH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: text }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.json({ status: "error" });
        });    
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
