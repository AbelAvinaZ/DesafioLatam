import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { readFile, writeFile } from "node:fs/promises";

const app = express();

app.use(bodyParser.json());

app.use(cors());

const getSongs = async () => {
    const fsResponse = await readFile("repositorio.json", "utf-8");
    const songs = JSON.parse(fsResponse);
    return songs;
};

app.post("/canciones", async (req, res) => {
    const { id, titulo, artista, tono } = req.body;
    const newSong = {
        id: id,
        titulo,
        artista,
        tono,
    };

    let songs = await getSongs();
    songs.push(newSong);
    await writeFile("repositorio.json", JSON.stringify(songs));
    res.status(201).json(newSong);
});

app.get("/canciones", async (req, res) => {
    const songs = await getSongs();
    res.json(songs);
});

app.put("/canciones/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { titulo, artista, tono } = req.body;

    let songs = await getSongs();
    const song = songs.find((song) => song.id === id);

    if (!song) {
        return res.status(404).json({ msg: "song not found" });
    }

    songs = songs.map((song) =>
        song.id === id ? { id, titulo, artista, tono } : song
    );

    await writeFile("repositorio.json", JSON.stringify(songs));
    res.json(songs);
});

app.delete("/canciones/:id", async (req, res) => {
    const id = Number(req.params.id);

    let songs = await getSongs();
    const song = songs.find((song) => song.id === id);

    if (!song) {
        return res.status(404).json({ msg: "song not found" });
    };

    songs = songs.filter((song) => song.id !== id);

    await writeFile("repositorio.json", JSON.stringify(songs));
    res.json(songs);
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
});