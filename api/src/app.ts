import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import apiRouter from "@api/controllers/api-routes";
import Config from "@api/util/config";
import Database from "@api/database";


Config.init();

Database.connect();

// Cria um servidor express.
const app = express();

// Configurações do express 
app.set("port", process.env.PORT || 3000); // porta
app.use(compression()); //compressão dos arquivos
app.use(bodyParser.json()); // formatação dos dados de resposta/body da Api
app.use(bodyParser.urlencoded({ extended: true })); // formatação dos dados de resposta/body da Api

// Rotas
app.use("/api", apiRouter);
// app.get('*', (req, res) => {
//     res.sendFile('dist/angular-cosmosdb/index.html', { root });
// });


export default app;
