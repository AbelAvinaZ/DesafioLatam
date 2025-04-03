import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import postRouter from "./routes/post.route.js";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());

app.use("/", postRouter);




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
