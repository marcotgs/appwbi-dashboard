import { acessoNiveisPermissaoModel, acessoNiveisPermissaoModelStatic } from '@api/database/models/acesso-niveis-permissao';
import logger from '@api/util/logger';
import Database from '@api/database';
import {
    cadastroProcessosModel, cadastroRotinasModel,
    cadastroModulosModel, acessoUsuariosModel
} from '@api/database/models';

export type AccessPermissionData = acessoNiveisPermissaoModel & {
    cadastroModulos: cadastroModulosModel[];
    acessoUsuarios: acessoUsuariosModel[];
    cadastroRotinas: cadastroRotinasModel[];
    cadastroProcessos: cadastroProcessosModel[];
}

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
     * @returns {Promise<AccessPermissionData[]>}
     * @memberof acessoNiveisPermissaoRepository
     */
    public async findAll(): Promise<AccessPermissionData[]> {
        try {
            return await this.acessoNiveisPermissaoModel.findAll({
                attributes: ['descricao', 'id'],
                include: [
                    { model: Database.models.acessoUsuarios, attributes: ['id'], },
                    { model: Database.models.cadastroRotinas, attributes: ['id'], },
                    { model: Database.models.cadastroProcessos, attributes: ['id'], },
                    { model: Database.models.cadastroModulos, attributes: ['id'], },
                ],
            }) as AccessPermissionData[];
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'acessoNiveisPermissaoRepository'-> 'findAll'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura uma permissão pelo id.
     *
     * @param {number} id
     * @returns {Promise<AccessPermissionData>}
     * @memberof CadastroSetoresRepository
     */
    public async findById(id: number): Promise<AccessPermissionData> {
        try {
            return await this.acessoNiveisPermissaoModel.findByPk(id, {
                attributes: ['descricao', 'id'],
                include: [
                    { model: Database.models.acessoUsuarios, attributes: ['id'], },
                    { model: Database.models.cadastroRotinas, attributes: ['id'], },
                    { model: Database.models.cadastroProcessos, attributes: ['id'], },
                    { model: Database.models.cadastroModulos, attributes: ['id'], },
                ],
            }) as AccessPermissionData;
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
