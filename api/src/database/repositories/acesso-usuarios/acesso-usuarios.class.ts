import { Sequelize } from "sequelize/types";
import { Repository } from "@api/database/repositories";
import acessoUsuariosModelInit, { acessoUsuariosModelStatic, acessoUsuariosModel } from "@api/database/models/acesso-usuarios";
import logger from "@api/util/logger";

export default class AcessoUsuariosRepository extends Repository {

    private acessoUsuariosModel: acessoUsuariosModelStatic;

    public constructor(sequelize: Sequelize) {
        super(sequelize);
        this.acessoUsuariosModel = acessoUsuariosModelInit(this.databaseContext);
    }

    public async findById(id: number): Promise<acessoUsuariosModel> {
        try {
            return await this.acessoUsuariosModel.findByPk(id, {
                attributes: ["email"],
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'AcessoUsuarios'-> 'findById'. Error: ${ex}`);
            throw ex;
        }
    };

    public async getByEmail(email: string): Promise<acessoUsuariosModel> {
        try {
            return await this.acessoUsuariosModel.findOne({
                where: {
                    email: email,
                },
                attributes: ["id", "email", ["password_salt", "passwordSalt"]],
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'AcessoUsuarios'-> 'getByEmail'. Error: ${ex}`);
            throw ex;
        }
    };

    public async authenticate(email: string, password: string): Promise<boolean> {
        try {
            const data = await this.acessoUsuariosModel.findOne({
                where: {
                    email,
                    password,
                },
                attributes: ["id", "email"],
            });
            return (data !== null);
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'AcessoUsuarios'-> 'authenticate'. Error: ${ex}`);
            throw ex;
        }
    };

};
