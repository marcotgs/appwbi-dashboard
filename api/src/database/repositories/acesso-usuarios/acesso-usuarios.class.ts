import { FindOptions } from 'sequelize/types';
import { Sequelize } from 'sequelize';
import {
    acessoUsuariosModelStatic, acessoUsuariosModel,
    municipioModel, empresaModel, estadoModel,
    acessoNiveisPermissaoModel, cadastroSetoresModel
} from '@api/database/models';
import logger from '@api/util/logger';
import Database from '@api/database';

export type UserData = acessoUsuariosModel & {
    municipio: municipioModel & { estado: estadoModel };
    acessoNiveisPermissao: acessoNiveisPermissaoModel;
    empresa: empresaModel;
    cadastroSetore: cadastroSetoresModel;
}

/**
 * Essa classe é um repositorio com os método que acessam a tabela `acesso_usuarios`.
 *
 * @export
 * @class AcessoUsuariosRepository
 */
export default class AcessoUsuariosRepository {

    /**
     * Dados do modelo da tabela.
     *
     * @private
     * @type {acessoUsuariosModelStatic}
     * @memberof AcessoUsuariosRepository
     */
    private acessoUsuariosModel: acessoUsuariosModelStatic;

    /**
     * Inicia a classe e model da tabela.
     * @memberof AcessoUsuariosRepository
     */
    public constructor() {
        this.acessoUsuariosModel = Database.models.acessoUsuarios;
    }

    /**
    * Procura os registros usuários.
    *
    * @returns {Promise<acessoUsuariosModel[]>}
    * @memberof AcessoUsuariosRepository
    */
    public async findAll(): Promise<acessoUsuariosModel[]> {
        try {
            return await this.acessoUsuariosModel.findAll({
                attributes: [
                    'nome', 'sobrenome', 'email', 'ddd', 'telefone',
                    'endereco', 'numero', 'complemento', 'bairro', 'cep',
                    'dataNascimento', 'cargo', 'cgc', 'id'
                ],
                include: [
                    { model: Database.models.empresa },
                    { model: Database.models.acessoNiveisPermissao },
                    { model: Database.models.cadastroSetores },
                    {
                        model: Database.models.municipio,
                        include: [
                            {
                                model: Database.models.estado,
                            }
                        ],
                    }
                ],
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'AcessoUsuariosRepository'-> 'findAll'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura os registros usuários de uma determinada empresa.
     *
     * @param {number} companyId
     * @returns {Promise<acessoUsuariosModel[]>}
     * @memberof AcessoUsuariosRepository
     */
    public async findAllByIdEmpresa(companyId: number): Promise<acessoUsuariosModel[]> {
        try {
            return await this.acessoUsuariosModel.findAll({
                attributes: [
                    'nome', 'sobrenome', 'email', 'ddd', 'telefone',
                    'endereco', 'numero', 'complemento', 'bairro', 'cep',
                    'dataNascimento', 'cargo', 'cgc', 'id'
                ],
                where: {
                    idEmpresa: companyId,
                },
                include: [
                    { model: Database.models.empresa },
                    { model: Database.models.acessoNiveisPermissao },
                    { model: Database.models.cadastroSetores },
                    {
                        model: Database.models.municipio,
                        include: [
                            {
                                model: Database.models.estado,
                            }
                        ],
                    }
                ],
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'AcessoUsuariosRepository'-> 'findAll'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Deleta um usuário.
     *
     * @param {number} id
     * @returns {Promise<number>}
     * @memberof AcessoUsuariosRepository
     */
    public async delete(id: number): Promise<number> {
        try {
            return await this.acessoUsuariosModel.destroy({
                where: {
                    id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'AcessoUsuariosRepository'-> 'delete'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Insere uma novo usuário.
     *
     * @param {object} data
     * @returns {Promise<acessoUsuariosModel>}
     * @memberof AcessoUsuariosRepository
     */
    public async insert(data: object): Promise<acessoUsuariosModel> {
        try {
            return await this.acessoUsuariosModel.create({
                ...data,
                ativo: true,
                idTipoEndereco: 1,
                dataNascimento: Sequelize.cast(new Date((data as acessoUsuariosModel).dataNascimento), 'DATETIMEOFFSET'),
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'AcessoUsuariosRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };


    /**
     * Procura um registro por id na tabela.
     *
     * @param {number} id
     * @returns {Promise<acessoUsuariosModel>}
     * @memberof AcessoUsuariosRepository
     */
    public async findById(id: number, options: Omit<FindOptions, 'where'> = {}): Promise<acessoUsuariosModel> {
        try {
            return await this.acessoUsuariosModel.findByPk(id, options);
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'AcessoUsuarios'-> 'findById'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura um registro por email na tabela.
     *
     * @param {string} email
     * @returns {Promise<acessoUsuariosModel>}
     * @memberof AcessoUsuariosRepository
     */
    public async findByEmail(email: string): Promise<acessoUsuariosModel> {
        try {
            return await this.acessoUsuariosModel.findOne({
                where: {
                    email: email,
                },
                attributes: ['id', 'email', 'nome', ['password_salt', 'passwordSalt']],
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'AcessoUsuarios'-> 'getByEmail'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura se existe um usuário com determinado email.
     *
     * @param {string} email
     * @returns {Promise<boolean>}
     * @memberof AcessoUsuariosRepository
     */
    public async userWithEmailExists(email: string): Promise<boolean> {
        try {
            const count = await this.acessoUsuariosModel.count({
                where: {
                    email,
                },
            });
            return (count > 0);
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'AcessoUsuarios'-> 'userWithEmailExists'. Error: ${ex}`);
            throw ex;
        }
    };


    /**
     * verifica se existe um resgistro relacionados ao email e a senha recebidos por parametro.
     *
     * @param {string} email
     * @param {string} password
     * @returns {Promise<boolean>}
     * @memberof AcessoUsuariosRepository
     */
    public async authenticate(email: string, password: string): Promise<boolean> {
        try {
            const data = await this.acessoUsuariosModel.findOne({
                where: {
                    email,
                    password,
                },
                attributes: ['id', 'email'],
            });
            return (data !== null);
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'AcessoUsuarios'-> 'authenticate'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Atualiza o token de redefinição de senha.
     *
     * @param {string} email
     * @param {string} resetPasswordToken
     * @returns {Promise<void>}
     * @memberof AcessoUsuariosRepository
     */
    public async updateResetPasswordToken(email: string, resetPasswordToken: string): Promise<void> {
        try {
            await this.acessoUsuariosModel.update({ resetPasswordToken, },
                {
                    where: {
                        email: email,
                    },
                });
        } catch (ex) {
            logger.error(`Erro ao realizar update no repository :'AcessoUsuarios'-> 'updateResetPasswordToken'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
    * Atualiza a senha do usuário.
    *
    * @param {string} email
    * @param {string} resetPasswordToken
    * @returns {Promise<void>}
    * @memberof AcessoUsuariosRepository
    */
    public async updatePassword(email: string, newPassword: string): Promise<void> {
        try {
            await this.acessoUsuariosModel.update({ password: newPassword, resetPasswordToken: null },
                {
                    where: {
                        email: email,
                    },
                });
        } catch (ex) {
            logger.error(`Erro ao realizar update no repository :'AcessoUsuarios'-> 'updatePassword'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
      * Atualiza os dados do usuário.
      *
      * @param {acessoUsuariosModel} data
      * @returns {Promise<void>}
      * @memberof AcessoUsuariosRepository
      */
    public async updateUser(data: object): Promise<void> {
        try {
            await this.acessoUsuariosModel.update({
                ...data,
                dataNascimento: Sequelize.cast(new Date((data as acessoUsuariosModel).dataNascimento), 'DATETIMEOFFSET'),
            },
            {
                where: {
                    id: (data as acessoUsuariosModel).id,
                },
            });
        } catch (ex) {
            logger.error(`Erro ao realizar update no repository :'AcessoUsuarios'-> 'updateUser'. Error: ${ex}`);
            throw ex;
        }
    };


};
