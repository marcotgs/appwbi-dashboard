import { cadastroRotinasModel, cadastroRotinasModelStatic } from '@api/database/models/cadastro-rotinas';
import logger from '@api/util/logger';
import Database from '@api/database';
import { acessoNiveisPermissaoModel, cadastroModulosModel, cadastroProcessosModel } from '@api/database/models';

export type RoutineData = cadastroRotinasModel & {
    cadastroModulo: cadastroModulosModel;
    acessoNiveisPermissao: acessoNiveisPermissaoModel;
    cadastroProcessos: cadastroProcessosModel[];
}

/**
 * Essa classe é um repositorio com os método que acessam a tabela `cadastro_rotinas`.
 *
 * @export
 * @class CadastroRotinasRepository
 */
export default class CadastroRotinasRepository {

    /**
     * Dados do modelo da tabela.
     *
     * @private
     * @type {cadastroRotinasModelStatic}
     * @memberof CadastroRotinasRepository
     */
    private cadastroRotinasModel: cadastroRotinasModelStatic;

    /**
     * Inicia a classe e model da tabela.
     * @memberof CadastroRotinasRepository
     */
    public constructor() {
        this.cadastroRotinasModel = Database.models.cadastroRotinas;
    }

    /**
     * Procura os registros de rotinas.
     *
     * @returns {Promise<RoutineData[]>}
     * @memberof CadastroRotinasRepository
     */
    public async findAll(): Promise<RoutineData[]> {
        try {
            return await this.cadastroRotinasModel.findAll({
                attributes: ['descricao', 'id', 'icone'],
                include: [
                    {
                        model: Database.models.acessoNiveisPermissao,
                        attributes: ['descricao', 'id'],
                    },
                    {
                        model: Database.models.cadastroModulos,
                        attributes: ['descricao', 'id'],
                    },
                    {
                        model: Database.models.cadastroProcessos,
                        attributes: ['id'],
                    }
                ]
            }) as RoutineData[];
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroRotinasRepository'-> 'findAll'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura uma rotina pelo id.
     *
     * @param {number} id
     * @returns {Promise<RoutineData>}
     * @memberof CadastroRotinasRepository
     */
    public async findById(id: number): Promise<RoutineData> {
        try {
            return await this.cadastroRotinasModel.findByPk(id, {
                attributes: ['descricao', 'id', 'icone'],
                include: [
                    {
                        model: Database.models.acessoNiveisPermissao,
                        attributes: ['descricao', 'id'],
                    },
                    {
                        model: Database.models.cadastroModulos,
                        attributes: ['descricao', 'id'],
                    }
                ]
            }) as RoutineData;
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroRotinasRepository'-> 'findById'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Deleta uma rotina.
     *
     * @param {number} id
     * @returns {Promise<number>}
     * @memberof CadastroRotinasRepository
     */
    public async delete(id: number): Promise<number> {
        try {
            return await this.cadastroRotinasModel.destroy({
                where: {
                    id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroRotinasRepository'-> 'delete'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Insere uma nova rotina.
     *
     * @param {object} data
     * @returns {Promise<cadastroRotinasModel>}
     * @memberof CadastroRotinasRepository
     */
    public async insert(data: object): Promise<cadastroRotinasModel> {
        try {
            return await this.cadastroRotinasModel.create(data);
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroRotinasRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Atualiza uma rotina.
     *
     * @param {object} data
     * @returns {Promise<cadastroRotinasModel>}
     * @memberof CadastroRotinasRepository
     */
    public async update(id: number, data: object): Promise<void> {
        try {
            await this.cadastroRotinasModel.update({
                ...data,
            },
            {
                where: {
                    id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroRotinasRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };
};
