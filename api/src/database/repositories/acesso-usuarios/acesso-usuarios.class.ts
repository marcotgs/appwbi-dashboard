import { FindOptions } from 'sequelize/types';
import { Sequelize } from 'sequelize';
import { acessoUsuariosModelStatic, acessoUsuariosModel } from '@api/database/models/acesso-usuarios';
import logger from '@api/util/logger';
import Database from '@api/database';

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
     * Procura um registro por id na tabela.
     *
     * @param {number} id
     * @returns {Promise<acessoUsuariosModel>}
     * @memberof AcessoUsuariosRepository
     */
    public async findById(id: number, options: Omit<FindOptions, 'where'> = {} ): Promise<acessoUsuariosModel> {
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
