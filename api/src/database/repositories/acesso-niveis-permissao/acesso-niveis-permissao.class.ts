import { acessoNiveisPermissaoModel, acessoNiveisPermissaoModelStatic } from '@api/database/models/acesso-niveis-permissao';
import logger from '@api/util/logger';
import Database from '@api/database';

/**
 * Essa classe é um repositorio com os método que acessam a tabela `cadastro_modulos`.
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
     * Procura os registros de modulos paginados.
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
};
