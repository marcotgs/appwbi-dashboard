import "reflect-metadata";
import errorHandler from "errorhandler";
import compression from "compression";  // compresses requests
import { createExpressServer } from "routing-controllers";
import bodyParser from "body-parser";
import Config from "@api/util/config";
import Database from "@api/database";
import { UserController } from "@api/controllers";


Config.init();

const app = createExpressServer({
    routePrefix: "/api",
    controllers: [UserController]
});
app.set("port", process.env.PORT || 3000); // porta

Database.connect().
    then((): void => {
        // Cria um servidor express.

        // Configurações do express 
        app.use(errorHandler());
        app.use(compression()); //compressão dos arquivos
        app.use(bodyParser.json()); // formatação dos dados de resposta/body da Api
        app.use(bodyParser.urlencoded({ extended: true })); // formatação dos dados de resposta/body da Api

        // app.get('*', (req, res) => {
        //     res.sendFile('dist/angular-cosmosdb/index.html', { root });
        // });
    });

/**
 * Start Express server
 */
const server = app.listen(process.env.PORT || 3000, (): void => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;
