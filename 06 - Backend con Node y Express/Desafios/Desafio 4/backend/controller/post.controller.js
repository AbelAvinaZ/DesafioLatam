import { getDatabaseError } from "../lib/errors/database.error.js";
import { postsModel } from "../models/posts.model.js";


const readPost = async (req, res) => {
    try {
        const posts = await postsModel.getPosts();
        return res.json(posts);
    } catch (error) {
        console.log(error);
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }
        return res.status(500).json({ msg: "Error at getting posts" });
    }
};

const createPost = async (req, res) => {
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
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }
        return res.status(500).json({ msg: "Error at posting" });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postsModel.deletePost(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.json({ message: "Post deleted" });
    } catch (error) {
        console.log(error);
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }

        return res.status(500).json({ message: "Error at deleting" });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postsModel.updatePost(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.json(post);
    } catch (error) {
        console.log(error);
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }
        return res.status(500).json({ message: "Error at updating" });
    }
};

export const postController = {
    readPost,
    createPost,
    deletePost,
    updatePost,
};