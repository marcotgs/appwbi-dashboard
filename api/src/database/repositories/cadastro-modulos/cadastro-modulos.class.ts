import { Op } from 'sequelize';
import { cadastroModulosModel, cadastroModulosModelStatic } from '@api/database/models/cadastro-modulos';
import logger from '@api/util/logger';
import Database from '@api/database';

/**
 * Essa classe é um repositorio com os método que acessam a tabela `cadastro_modulos`.
 *
 * @export
 * @class CadastroModulosRepository
 */
export default class CadastroModulosRepository {

    /**
     * Dados do modelo da tabela.
     *
     * @private
     * @type {cadastroModulosModelStatic}
     * @memberof CadastroModulosRepository
     */
    private cadastroModulosModel: cadastroModulosModelStatic;

    /**
     * Inicia a classe e model da tabela.
     * @memberof CadastroModulosRepository
     */
    public constructor() {
        this.cadastroModulosModel = Database.models.cadastroModulos;
    }

    /**
     * Procura os registros de modulos, rotinas e processos de acordo com o nivel de permissão do usuário.
     *
     * @param {number} idAcessoNiveisPermissao
     * @returns {Promise<cadastroModulosModel[]>}
     * @memberof CadastroModulosRepository
     */
    public async findModulesByAccessLevel(idAcessoNiveisPermissao: number): Promise<cadastroModulosModel[]> {
        try {
            return await this.cadastroModulosModel.findAll({
                where: {
                    idAcessoNiveisPermissao: {
                        [Op.lte]: idAcessoNiveisPermissao,
                    }
                },
                attributes: ['descricao', 'icone', 'id'],
                include: [
                    {
                        model: Database.models.cadastroRotinas,
                        where: {
                            idAcessoNiveisPermissao: {
                                [Op.lte]: idAcessoNiveisPermissao,
                            },
                        },
                        attributes: ['descricao', 'icone', 'id'],
                        include: [
                            {
                                model: Database.models.cadastroProcessos,
                                where: {
                                    idAcessoNiveisPermissao: {
                                        [Op.lte]: idAcessoNiveisPermissao,
                                    },
                                },
                                attributes: ['descricao', 'icone', 'id', 'funcao'],
                            }
                        ],
                    }
                ],
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroModulosRepository'-> 'findModulosByIdAcessoPermissão'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura os registros de modulos.
     *
     * @returns {Promise<cadastroModulosModel[]>}
     * @memberof CadastroModulosRepository
     */
    public async findAll(): Promise<cadastroModulosModel[]> {
        try {
            return await this.cadastroModulosModel.findAll({
                attributes: ['descricao', 'id', 'icone'],
                include: [
                    {
                        model: Database.models.acessoNiveisPermissao,
                        attributes: ['descricao', 'id'],
                    }]
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroModulosRepository'-> 'findAll'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura um modulo pelo id.
     *
     * @param {number} id
     * @returns {Promise<cadastroModulosModel>}
     * @memberof CadastroModulosRepository
     */
    public async findById(id: number): Promise<cadastroModulosModel> {
        try {
            return await this.cadastroModulosModel.findByPk(id, {
                attributes: ['descricao', 'id', 'icone'],
                include: [
                    {
                        model: Database.models.acessoNiveisPermissao,
                        attributes: ['descricao', 'id'],
                    }]
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroModulosRepository'-> 'findById'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Deleta um módulo.
     *
     * @param {number} id
     * @returns {Promise<number>}
     * @memberof CadastroModulosRepository
     */
    public async delete(id: number): Promise<number> {
        try {
            return await this.cadastroModulosModel.destroy({
                where: {
                    id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroModulosRepository'-> 'delete'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Insere um novo módulo.
     *
     * @param {object} data
     * @returns {Promise<cadastroModulosModel>}
     * @memberof CadastroModulosRepository
     */
    public async insert(data: object): Promise<cadastroModulosModel> {
        try {
            return await this.cadastroModulosModel.create(data);
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroModulosRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Atualiza um modulo.
     *
     * @param {object} data
     * @returns {Promise<cadastroModulosModel>}
     * @memberof CadastroModulosRepository
     */
    public async update(id: number, data: object): Promise<void> {
        try {
            await this.cadastroModulosModel.update({
                ...data,
            },
            {
                where: {
                    id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'CadastroModulosRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };
};
