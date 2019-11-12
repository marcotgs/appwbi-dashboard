import { cadastroProcessosModel, cadastroProcessosModelStatic } from '@api/database/models/cadastro-processos';
import logger from '@api/util/logger';
import Database from '@api/database';
import { cadastroRotinasModel, acessoNiveisPermissaoModel, cadastroModulosModel } from '@api/database/models';

export type ProcessData = cadastroProcessosModel & {
    cadastroRotina: cadastroRotinasModel & { cadastroModulo: cadastroModulosModel };
    acessoNiveisPermissao: acessoNiveisPermissaoModel;
}

/**
 * Essa classe é um repositorio com os método que acessam a tabela `cadastro_processos`.
 *
 * @export
 * @class CadastroProcessosRepository
 */
export default class CadastroProcessosRepository {

    /**
     * Dados do modelo da tabela.
     *
     * @private
     * @type {cadastroProcessosModelStatic}
     * @memberof CadastroProcessosRepository
     */
    private cadastroProcessosModel: cadastroProcessosModelStatic;

    /**
     * Inicia a classe e model da tabela.
     * @memberof CadastroProcessosRepository
     */
    public constructor() {
        this.cadastroProcessosModel = Database.models.cadastroProcessos;
    }

    /**
     * Procura os registros de processos.
     *
     * @returns {Promise<ProcessData[]>}
     * @memberof CadastroProcessosRepository
     */
    public async findAll(): Promise<ProcessData[]> {
        try {
            return await this.cadastroProcessosModel.findAll({
                attributes: ['descricao', 'id', 'icone', 'funcao'],
                include: [
                    {
                        model: Database.models.acessoNiveisPermissao,
                        attributes: ['descricao', 'id'],
                    },
                    {
                        model: Database.models.cadastroRotinas,
                        attributes: ['descricao', 'id'],
                        include: [
                            {
                                model: Database.models.cadastroModulos,
                                attributes: ['descricao', 'id'],
                            }
                        ]
                    }
                ]
            }) as ProcessData[];
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroProcessosRepository'-> 'findAll'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura um processo pelo id.
     *
     * @param {number} id
     * @returns {Promise<ProcessData>}
     * @memberof CadastroProcessosRepository
     */
    public async findById(id: number): Promise<ProcessData> {
        try {
            return await this.cadastroProcessosModel.findByPk(id, {
                attributes: ['descricao', 'id', 'icone', 'funcao'],
                include: [
                    {
                        model: Database.models.acessoNiveisPermissao,
                        attributes: ['descricao', 'id'],
                    },
                    {
                        model: Database.models.cadastroRotinas,
                        attributes: ['descricao', 'id'],
                        include: [
                            {
                                model: Database.models.cadastroModulos,
                                attributes: ['descricao', 'id'],
                            }
                        ]
                    }
                ]
            }) as ProcessData;
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroProcessosRepository'-> 'findById'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Deleta um processo.
     *
     * @param {number} id
     * @returns {Promise<number>}
     * @memberof CadastroProcessosRepository
     */
    public async delete(id: number): Promise<number> {
        try {
            return await this.cadastroProcessosModel.destroy({
                where: {
                    id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroProcessosRepository'-> 'delete'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Insere uma novo processo.
     *
     * @param {object} data
     * @returns {Promise<cadastroProcessosModel>}
     * @memberof CadastroProcessosRepository
     */
    public async insert(data: object): Promise<cadastroProcessosModel> {
        try {
            return await this.cadastroProcessosModel.create(data);
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroProcessosRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Atualiza um processo.
     *
     * @param {object} data
     * @returns {Promise<cadastroProcessosModel>}
     * @memberof CadastroProcessosRepository
     */
    public async update(id: number, data: object): Promise<void> {
        try {
            await this.cadastroProcessosModel.update({
                ...data,
            },
            {
                where: {
                    id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroProcessosRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };
};
