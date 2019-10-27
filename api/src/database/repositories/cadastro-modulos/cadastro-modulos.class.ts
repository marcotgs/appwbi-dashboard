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
};
