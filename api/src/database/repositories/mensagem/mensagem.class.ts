import { mensagemModel, mensagemModelStatic } from '@api/database/models/mensagem';
import logger from '@api/util/logger';
import Database from '@api/database';
import { empresaModel, cadastroSetoresModel } from '@api/database/models';
import { Op, Sequelize } from 'sequelize';

export type MessageData = mensagemModel & {
    cadastroSetore: cadastroSetoresModel & { empresa: empresaModel };
}

/**
 * Essa classe é um repositorio com os método que acessam a tabela `mensagem`.
 *
 * @export
 * @class MensagemRepository
 */
export default class MensagemRepository {

    /**
     * Dados do modelo da tabela.
     *
     * @private
     * @type {mensagemModelStatic}
     * @memberof MensagemRepository
     */
    private mensagemModel: mensagemModelStatic;

    /**
     * Inicia a classe e model da tabela.
     * @memberof MensagemRepository
     */
    public constructor() {
        this.mensagemModel = Database.models.mensagem;
    }

    /**
     * Procura os registros de mensagens que não foram enviadas
     *
     * @returns {Promise<MessageData[]>}
     * @memberof MensagemRepository
     */
    public async findAllUnsent(): Promise<MessageData[]> {
        try {
            return await this.mensagemModel.findAll({
                attributes: ['titulo', 'id', 'mensagem', 'idEmpresa', 'idCadastroSetores'],
                include: [
                    {
                        model: Database.models.cadastroSetores,
                        attributes: ['id'],
                        include: [{
                            model: Database.models.empresa,
                            attributes: ['id'],
                        }]
                    },
                ],
                where: {
                    enviado: false,
                }
            }) as MessageData[];
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'MensagemRepository'-> 'findAllUnsent'. Error: ${ex}`);
            throw ex;
        }
    };

    /**
     * atualiza os registros recebidos no parametro para enviados
     *
     * @memberof MensagemRepository
     */
    public async updateToSent(ids: number[]): Promise<void> {
        try {
            await this.mensagemModel.update({
                enviado: true,
                dataEnviada: Sequelize.cast(new Date(), 'DATETIMEOFFSET'),
            },
                {
                    where: {
                        id: {
                            [Op.in]: ids,
                        }
                    },
                });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'MensagemRepository'-> 'updateToSent'. Error: ${ex}`);
            throw ex;
        }
    };


    /**
     * Insere uma nova mensagem.
     *
     * @param {object} data
     * @returns {Promise<mensagemModel>}
     * @memberof MensagemRepository
     */
    public async insert(data: object): Promise<mensagemModel> {
        try {
            return await this.mensagemModel.create({
                ...data,
                enviado: false,
                dataCadastro: Sequelize.cast(new Date(), 'DATETIMEOFFSET'),
            });
        } catch (ex) {
            logger.error(`Erro ao realizar consulta no repository :'MensagemRepository'-> 'insert'. Error: ${ex}`);
            throw ex;
        }
    };
};
