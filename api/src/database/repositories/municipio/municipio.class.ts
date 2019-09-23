import { Sequelize } from 'sequelize/types';
import { Repository } from '@api/database/repositories';
import logger from '@api/util/logger';
import { municipioModelStatic } from '@api/database/models';
import municipioModelInit, { municipioModel } from '@api/database/models/municipio';
import Database from '@api/database';
import estadoModelInit, { estadoModel } from '@api/database/models/estado';


/**
 * Essa classe é um repositorio com os método que acessam a tabela `municipio`.
 *
 * @export
 * @class MunicipioRepository
 * @extends {Repository}
 */
export default class MunicipioRepository extends Repository {

    /**
     * Dados do modelo da tabela.
     *
     * @private
     * @type {municipioModelStatic}
     * @memberof MunicipioRepository
     */
    private municipioModel: municipioModelStatic;

    /**
     * Inicia a classe e model da tabela.
     * @param {Sequelize} sequelize
     * @memberof MunicipioRepository
     */
    public constructor(sequelize: Sequelize) {
        super(sequelize);
        this.municipioModel = this.addAssociations();
    }


    /**
     * Procura um registro pelo código ibge da cidade.
     *
     * @param {number} ibgeCode
     * @returns {Promise<municipioModel>}
     * @memberof MunicipioRepository
     */
    public async findByIbgeCode(ibgeCode: number): Promise<municipioModel> {
        try {
            return await this.municipioModel.findOne({
                where: {
                    codigoCompletoCidadeIbge: ibgeCode,
                }
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'Municipio'-> 'findByIbgeCode'. Error: ${ex}`);
            throw ex;
        }
    };

    public async findById(id: number): Promise<municipioModel & { estado?: estadoModel }> {
        try {
            return await this.municipioModel.findByPk(id, {
                include: [
                    {
                        model: estadoModelInit(Database.context)
                    }
                ]
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'Municipio'-> 'findById'. Error: ${ex}`);
            throw ex;
        }
    };

    private addAssociations(): municipioModelStatic {
        const municipio = municipioModelInit(this.databaseContext);
        const estado = estadoModelInit(this.databaseContext);
        estado.hasMany(municipio, {
            foreignKey: 'id_estado',
        });
        municipio.belongsTo(estado, {
            foreignKey: 'id_estado',
        });
        return municipio;
    }

};
