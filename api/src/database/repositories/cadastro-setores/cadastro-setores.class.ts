import { cadastroSetoresModel, cadastroSetoresModelStatic } from '@api/database/models/cadastro-setores';
import logger from '@api/util/logger';
import Database from '@api/database';

/**
 * Essa classe é um repositorio com os método que acessam a tabela `cadastro_setores`.
 *
 * @export
 * @class CadastroSetoresRepository
 */
export default class CadastroSetoresRepository {

    /**
     * Dados do modelo da tabela.
     *
     * @private
     * @type {cadastroSetoresModelStatic}
     * @memberof CadastroSetoresRepository
     */
    private cadastroSetoresModel: cadastroSetoresModelStatic;

    /**
     * Inicia a classe e model da tabela.
     * @memberof CadastroSetoresRepository
     */
    public constructor() {
        this.cadastroSetoresModel = Database.models.cadastroSetores;
    }

    /**
     * Procura os registros de setores.
     *
     * @returns {Promise<cadastroSetoresModel[]>}
     * @memberof CadastroSetoresRepository
     */
    public async findAll(): Promise<cadastroSetoresModel[]> {
        try {
            return await this.cadastroSetoresModel.findAll({
                attributes: ['descricao', 'id', 'codigo'],
                include: [
                    {
                        model: Database.models.empresa,
                        attributes: ['nome', 'id'],
                    }
                ]
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroSetoresRepository'-> 'findAll'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura um setor pelo id.
     *
     * @param {number} id
     * @returns {Promise<cadastroSetoresModel>}
     * @memberof CadastroSetoresRepository
     */
    public async findById(id: number): Promise<cadastroSetoresModel> {
        try {
            return await this.cadastroSetoresModel.findByPk(id, {
                attributes: ['descricao', 'id', 'codigo'],
                include: [
                    {
                        model: Database.models.empresa,
                        attributes: ['nome', 'id'],
                    }
                ]
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroSetoresRepository'-> 'findById'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Deleta um setor.
     *
     * @param {number} id
     * @returns {Promise<number>}
     * @memberof CadastroSetoresRepository
     */
    public async delete(id: number): Promise<number> {
        try {
            return await this.cadastroSetoresModel.destroy({
                where: {
                    id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroSetoresRepository'-> 'delete'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Insere uma novo setor.
     *
     * @param {object} data
     * @returns {Promise<cadastroSetoresModel>}
     * @memberof CadastroSetoresRepository
     */
    public async insert(data: object): Promise<cadastroSetoresModel> {
        try {
            return await this.cadastroSetoresModel.create(data);
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroSetoresRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Atualiza um setor.
     *
     * @param {object} data
     * @returns {Promise<cadastroSetoresModel>}
     * @memberof CadastroSetoresRepository
     */
    public async update(id: number, data: object): Promise<void> {
        try {
            await this.cadastroSetoresModel.update({
                ...data,
            },
            {
                where: {
                    id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroSetoresRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };
};
