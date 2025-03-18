import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import { postsModel } from "./models/posts.model.js";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());

app.get("/posts", async (req, res) => {
    try {
        const posts = await postsModel.getPosts();
        return res.json(posts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error at getting posts" });
    }
});

app.post("/posts", async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body;

    const newPost = {
        titulo,
        img,
        descripcion,
        likes: likes || 0,
    };

    try {
        const post = await postsModel.createPost(newPost);
        return res.json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error at posting" });
    }
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
