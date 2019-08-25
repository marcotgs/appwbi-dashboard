import { Sequelize } from "sequelize";
import logger from "@api/util/logger";

export default class Database {

    public static context: Sequelize;

    public static async  connect(): Promise<void> {
        const sequelize = new Sequelize(process.env["DB_SERVER_DATABASE"], process.env["DB_SERVER_USERNAME"], process.env["DB_SERVER_PASSWORD"], {
            host: process.env["DB_SERVER"],
            dialect: "mssql",
        });
        try {
            await sequelize.authenticate();
            this.context = sequelize;
            logger.debug("Conexão com o banco de dados estabelecida com sucesso.");
        } catch (err) {
            logger.error("Não foi possivel conectar com o banco de dados:", err);
        }
    }
}