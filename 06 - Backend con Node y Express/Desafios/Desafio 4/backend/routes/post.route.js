import { Router } from "express";
import { postController } from "../controller/post.controller.js";

const postRouter = Router();

postRouter.get("/posts", postController.readPost);
postRouter.post("/posts", postController.createPost);
postRouter.delete("/posts/:id", postController.deletePost);
postRouter.put("/posts/like/:id", postController.updatePost);

export default postRouter;