import { Sequelize } from 'sequelize';
import logger from '@api/util/logger';
import addAssociations from './associations';

export default class Database {

    public static context: Sequelize;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static models: any;

    public static async  connect(): Promise<Sequelize> {
        const sequelize = new Sequelize(process.env['DB_SERVER_DATABASE'], process.env['DB_SERVER_USERNAME'], process.env['DB_SERVER_PASSWORD'], {
            host: process.env['DB_SERVER'],
            dialect: 'mssql',
        });
        try {
            await sequelize.authenticate();
            this.context = sequelize;
            this.models = addAssociations(sequelize);
            logger.debug('Conexão com o banco de dados estabelecida com sucesso.');
            return sequelize;
        } catch (err) {
            logger.error('Não foi possivel conectar com o banco de dados:', err);
        }
    }
}