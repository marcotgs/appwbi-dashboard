import { acessoNiveisPermissaoModel, acessoNiveisPermissaoModelStatic } from '@api/database/models/acesso-niveis-permissao';
import logger from '@api/util/logger';
import Database from '@api/database';

/**
 * Essa classe é um repositorio com os método que acessam a tabela `[acesso_niveis_permissao]`.
 *
 * @export
 * @class acessoNiveisPermissaoRepository
 */
export default class AcessoNiveisPermissaoRepository {

    /**
     * Dados do modelo da tabela.
     *
     * @private
     * @type {acessoNiveisPermissaoModelStatic}
     * @memberof acessoNiveisPermissaoRepository
     */
    private acessoNiveisPermissaoModel: acessoNiveisPermissaoModelStatic;

    /**
     * Inicia a classe e model da tabela.
     * @memberof acessoNiveisPermissaoRepository
     */
    public constructor() {
        this.acessoNiveisPermissaoModel = Database.models.acessoNiveisPermissao;
    }

    /**
     * Procura os registros de permissões.
     *
     * @returns {Promise<acessoNiveisPermissaoModel[]>}
     * @memberof acessoNiveisPermissaoRepository
     */
    public async findAll(): Promise<acessoNiveisPermissaoModel[]> {
        try {
            return await this.acessoNiveisPermissaoModel.findAll({
                attributes: ['descricao', 'id'],
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'acessoNiveisPermissaoRepository'-> 'findAll'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura uma permissão pelo id.
     *
     * @param {number} id
     * @returns {Promise<acessoNiveisPermissaoModel>}
     * @memberof CadastroSetoresRepository
     */
    public async findById(id: number): Promise<acessoNiveisPermissaoModel> {
        try {
            return await this.acessoNiveisPermissaoModel.findByPk(id, {
                attributes: ['descricao', 'id']
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroSetoresRepository'-> 'findById'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Deleta uma permissão.
     *
     * @param {number} id
     * @returns {Promise<number>}
     * @memberof CadastroSetoresRepository
     */
    public async delete(id: number): Promise<number> {
        try {
            return await this.acessoNiveisPermissaoModel.destroy({
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
     * Insere uma nova permissão.
     *
     * @param {object} data
     * @returns {Promise<acessoNiveisPermissaoModel>}
     * @memberof CadastroSetoresRepository
     */
    public async insert(data: object): Promise<acessoNiveisPermissaoModel> {
        try {
            return await this.acessoNiveisPermissaoModel.create({
                ...data,
                controlaAlcada: 0,
                nivel: 0,
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroSetoresRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Atualiza uma permissão.
     *
     * @param {object} data
     * @returns {Promise<acessoNiveisPermissaoModel>}
     * @memberof CadastroSetoresRepository
     */
    public async update(id: number, data: object): Promise<void> {
        try {
            await this.acessoNiveisPermissaoModel.update({
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
