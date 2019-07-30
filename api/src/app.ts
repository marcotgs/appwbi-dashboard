import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";

// Controllers (funções das rotas)
import * as homeController from "./controllers/home";


// Cria um servidor express.
const app = express();

// Configurações do express 
app.set("port", process.env.PORT || 3000); // porta
app.use(compression()); //compressão dos arquivos
app.use(bodyParser.json()); // formtação da reposta da Api.
app.use(bodyParser.urlencoded({ extended: true })); // formtação da reposta da Api.

/* 
    Rotas primárias da Api.
*/
app.get("/", homeController.index);

export default app;
