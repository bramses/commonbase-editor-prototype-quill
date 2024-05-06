// an express server that hosts index.html and serves the static files in the public directory

import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// post body.text to the server
app.post("/query", (req, res) => {
    const { text } = req.body;
    console.log(text);
    res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
