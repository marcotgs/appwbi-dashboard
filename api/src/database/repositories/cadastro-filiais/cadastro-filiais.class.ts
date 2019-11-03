import { cadastroFiliaisModel, cadastroFiliaisModelStatic } from '@api/database/models/cadastro-filiais';
import logger from '@api/util/logger';
import Database from '@api/database';

/**
 * Essa classe é um repositorio com os método que acessam a tabela `cadastro_filiais`.
 *
 * @export
 * @class CadastroFiliaisRepository
 */
export default class CadastroFiliaisRepository {

    /**
     * Dados do modelo da tabela.
     *
     * @private
     * @type {cadastroFiliaisModelStatic}
     * @memberof CadastroFiliaisRepository
     */
    private cadastroFiliaisModel: cadastroFiliaisModelStatic;

    /**
     * Inicia a classe e model da tabela.
     * @memberof CadastroFiliaisRepository
     */
    public constructor() {
        this.cadastroFiliaisModel = Database.models.cadastroFiliais;
    }

    /**
     * Procura os registros de filiais.
     *
     * @returns {Promise<cadastroFiliaisModel[]>}
     * @memberof CadastroFiliaisRepository
     */
    public async findAll(): Promise<cadastroFiliaisModel[]> {
        try {
            return await this.cadastroFiliaisModel.findAll({
                attributes: ['descricao', 'id', 'filial'],
                include: [
                    {
                        model: Database.models.empresa,
                        attributes: ['nome', 'id'],
                    }
                ]
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroFiliaisRepository'-> 'findAll'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura uma filial pelo id.
     *
     * @param {number} id
     * @returns {Promise<cadastroFiliaisModel>}
     * @memberof CadastroFiliaisRepository
     */
    public async findById(id: number): Promise<cadastroFiliaisModel> {
        try {
            return await this.cadastroFiliaisModel.findByPk(id, {
                attributes: ['descricao', 'id', 'filial'],
                include: [
                    {
                        model: Database.models.empresa,
                        attributes: ['nome', 'id'],
                    }
                ]
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroFiliaisRepository'-> 'findById'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Deleta uma filial.
     *
     * @param {number} id
     * @returns {Promise<number>}
     * @memberof CadastroFiliaisRepository
     */
    public async delete(id: number): Promise<number> {
        try {
            return await this.cadastroFiliaisModel.destroy({
                where: {
                    id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroFiliaisRepository'-> 'delete'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Insere uma nova filial.
     *
     * @param {object} data
     * @returns {Promise<cadastroFiliaisModel>}
     * @memberof CadastroFiliaisRepository
     */
    public async insert(data: object): Promise<cadastroFiliaisModel> {
        try {
            return await this.cadastroFiliaisModel.create(data);
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroFiliaisRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Atualiza uma filial.
     *
     * @param {object} data
     * @returns {Promise<cadastroFiliaisModel>}
     * @memberof CadastroFiliaisRepository
     */
    public async update(id: number, data: object): Promise<void> {
        try {
            await this.cadastroFiliaisModel.update({
                ...data,
            },
            {
                where: {
                    id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroFiliaisRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };
};
