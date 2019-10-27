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
     * @param {number} id
     * @returns {Promise<acessoUsuariosModel>}
     * @memberof AcessoUsuariosRepository
     */
    public async findModulosByIdAcessoPermissão(idAcessoNiveisPermissao: number): Promise<cadastroModulosModel[]> {
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
            logger.error(`Erro ao realizar consulta no repository :'AcessoUsuarios'-> 'findById'. Error: ${ex}`);
            throw ex;
        }
    };
};
