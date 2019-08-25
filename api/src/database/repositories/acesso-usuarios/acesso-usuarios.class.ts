import { Sequelize } from "sequelize/types";
import { Repository } from "@api/database/repositories";
import acessoUsuariosModelInit, { acessoUsuariosModelStatic, acessoUsuariosModel } from "@api/database/models/acesso-usuarios";

export default class AcessoUsuariosRepository extends Repository {

    private acessoUsuariosModel: acessoUsuariosModelStatic;

    public constructor(sequelize: Sequelize) {
        super(sequelize);
        this.acessoUsuariosModel = acessoUsuariosModelInit(this.databaseContext);
    }

    public async getByEmail(email: string): Promise<acessoUsuariosModel> {
        try {
            return await this.acessoUsuariosModel.findOne({
                where: {
                    email: email,
                },
                rejectOnEmpty: true,
            });
        } catch {
            return null;
        }
    }

};
