import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import { loggerMiddleware } from "./middlewares/reportes.js";
import { getJoyas, getJoyasFiltradas } from './controllers/joyasController.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());
app.use(loggerMiddleware);

app.get('/joyas', getJoyas);
app.get('/joyas/filtros', getJoyasFiltradas);



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
