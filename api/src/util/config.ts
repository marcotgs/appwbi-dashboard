import logger from "./logger";
import dotenv from "dotenv";

/**
 * Essa classe é responsável por carregar as configurações da aplicação em determinado ambiente.
 * Para mais detalhes ler o arquivo de Readme desta API.
 *
 * @class Config
 */
class Config {
    public init(): void {
        if (process.env.NODE_ENV === "production") {
            logger.debug("Usando arquivo .env para ler as configurações de produção");
            dotenv.config({ path: ".env" });
        } else {
            logger.debug("Usando arquivo .env.dev para ler as configurações de desenvolvimento");
            dotenv.config({ path: ".env.dev" });
        }
    }
}

export default new Config();