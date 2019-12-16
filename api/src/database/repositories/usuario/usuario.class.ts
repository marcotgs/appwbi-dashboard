import { usuarioModel, usuarioModelStatic } from '@api/database/models/usuario';
import logger from '@api/util/logger';
import Database from '@api/database';
import { Op, Sequelize } from 'sequelize';

export type UsuarioData = usuarioModel;

/**
 * Essa classe é um repositorio com os método que acessam a tabela `usuario`.
 *
 * @export
 * @class UsuarioRepository
 */
export default class UsuarioRepository {

    /**
     * Dados do modelo da tabela.
     *
     * @private
     * @type {usuarioModelStatic}
     * @memberof UsuarioRepository
     */
    private usuarioModel: usuarioModelStatic;

    /**
     * Inicia a classe e model da tabela.
     * @memberof UsuarioRepository
     */
    public constructor() {
        this.usuarioModel = Database.models.usuario;
    }

    /**
     * Procura os devices dos usuários de uma empresa
     *
     * @returns {Promise<UsuarioData[]>}
     * @memberof UsuarioRepository
     */
    public async findAllDevicesByCompany(companyId: number): Promise<UsuarioData[]> {
        try {
            return await this.usuarioModel.findAll({
                attributes: ['device'],
                where: {
                    idEmpresa: companyId,
                    device: {
                        [Op.not]: null,
                    }
                }
            }) as UsuarioData[];
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'UsuarioRepository'-> 'findAllDevicesByCompany'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura os devices dos usuários de um setor de uma empresa
     *
     * @returns {Promise<UsuarioData[]>}
     * @memberof UsuarioRepository
     */
    public async findAllDevicesByCompanySector(sectorId: number): Promise<UsuarioData[]> {
        try {
            return await this.usuarioModel.findAll({
                attributes: ['device'],
                where: {
                    idCadastroSetores: sectorId,
                    device: {
                        [Op.not]: null,
                    }
                }
            }) as UsuarioData[];
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'UsuarioRepository'-> 'findAllDevicesByCompanySector'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * Procura os devices de todos os usuários
     *
     * @returns {Promise<UsuarioData[]>}
     * @memberof UsuarioRepository
     */
    public async findAllDevices(): Promise<UsuarioData[]> {
        try {
            return await this.usuarioModel.findAll({
                attributes: ['device'],
            }) as UsuarioData[];
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'UsuarioRepository'-> 'findAllDevicesByCompanySector'. Error: ${ex}`);
            throw ex;
        }
    };
};
