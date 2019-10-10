import logger from '@api/util/logger';
import Database from '@api/database';
import { municipioModelStatic } from '@api/database/models';
import { municipioModel } from '@api/database/models/municipio';
import estadoModelInit, { estadoModel } from '@api/database/models/estado';


/**
 * Essa classe é um repositorio com os método que acessam a tabela `municipio`.
 *
 * @export
 * @class MunicipioRepository
 */
export default class MunicipioRepository {

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
     * @memberof MunicipioRepository
     */
    public constructor() {
        this.municipioModel = Database.models.municipio;
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
};
