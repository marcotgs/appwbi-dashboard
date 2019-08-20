import { Sequelize } from "sequelize";
import logger from "@api/util/logger";

export default class Database {

    public static sequelizeInstance: Sequelize;

    public static connect(): void {
        const sequelize = new Sequelize(process.env["DB_SERVER_DATABASE"], process.env["DB_SERVER_USERNAME"], process.env["DB_SERVER_PASSWORD"], {
            host: process.env["DB_SERVER"],
            dialect: "mssql",
        });
        sequelize.authenticate()
            .then((): void => {
                logger.debug("Conexão com o banco de dados estabelecida com sucesso.");
            })
            .catch((err: string): void => {
                logger.error("Não foi possivel conectar com o banco de dados:", err);
            });
        this.sequelizeInstance = sequelize;
    }
}