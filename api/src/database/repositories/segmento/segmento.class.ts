import { segmentoModel, segmentoModelStatic } from '@api/database/models/segmento';
import logger from '@api/util/logger';
import Database from '@api/database';

/**
 * Essa classe é um repositorio com os método que acessam a tabela `segmentos`.
 *
 * @export
 * @class SegmentoRepository
 */
export default class SegmentoRepository {

    /**
     * Dados do modelo da tabela.
     *
     * @private
     * @type {segmentoModelStatic}
     * @memberof SegmentoRepository
     */
    private segmentoModel: segmentoModelStatic;

    /**
     * Inicia a classe e model da tabela.
     * @memberof SegmentoRepository
     */
    public constructor() {
        this.segmentoModel = Database.models.segmento;
    }

    /**
     * Procura os registros de segmentos.
     *
     * @returns {Promise<segmentoModel[]>}
     * @memberof SegmentoRepository
     */
    public async findAll(): Promise<segmentoModel[]> {
        try {
            return await this.segmentoModel.findAll({
                attributes: [
                    'nome', 'id'
                ],
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'SegmentoRepository'-> 'findAll'. Error: ${ex}`);
            throw ex;
        }
    };
};
