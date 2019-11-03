import { empresaModel, empresaModelStatic } from '@api/database/models/empresa';
import logger from '@api/util/logger';
import Database from '@api/database';

/**
 * Essa classe é um repositorio com os método que acessam a tabela `empresas`.
 *
 * @export
 * @class EmpresaRepository
 */
export default class EmpresaRepository {

    /**
     * Dados do modelo da tabela.
     *
     * @private
     * @type {empresaModelStatic}
     * @memberof EmpresaRepository
     */
    private empresaModel: empresaModelStatic;

    /**
     * Inicia a classe e model da tabela.
     * @memberof EmpresaRepository
     */
    public constructor() {
        this.empresaModel = Database.models.empresa;
    }

    /**
     * Procura os registros de empresas.
     *
     * @returns {Promise<empresaModel[]>}
     * @memberof EmpresaRepository
     */
    public async findAll(): Promise<empresaModel[]> {
        try {
            return await this.empresaModel.findAll({
                attributes: ['nome', 'id', ],
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'EmpresaRepository'-> 'findAll'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura uma empresa pelo id.
     *
     * @param {number} id
     * @returns {Promise<empresaModel>}
     * @memberof EmpresaRepository
     */
    public async findById(id: number): Promise<empresaModel> {
        try {
            return await this.empresaModel.findByPk(id, {
                attributes: ['nome', 'id'],
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'EmpresaRepository'-> 'findById'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Deleta uma empresa.
     *
     * @param {number} id
     * @returns {Promise<number>}
     * @memberof EmpresaRepository
     */
    public async delete(id: number): Promise<number> {
        try {
            return await this.empresaModel.destroy({
                where: {
                    id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'EmpresaRepository'-> 'delete'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Insere uma nova empresa.
     *
     * @param {object} data
     * @returns {Promise<empresaModel>}
     * @memberof EmpresaRepository
     */
    public async insert(data: object): Promise<empresaModel> {
        try {
            return await this.empresaModel.create(data);
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'EmpresaRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Atualiza uma empresa.
     *
     * @param {object} data
     * @returns {Promise<empresaModel>}
     * @memberof EmpresaRepository
     */
    public async update(id: number, data: object): Promise<void> {
        try {
            await this.empresaModel.update({
                ...data,
            },
            {
                where: {
                    id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'EmpresaRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };
};
