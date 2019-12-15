import { Response } from 'express';
import { JsonController, Authorized, Res, Post, Body } from 'routing-controllers';
import { MensagemRepository } from '@api/database/repositories';
import logger from '@api/util/logger';
import BaseController from './base-controller.class';
import { MessageBody } from '@api/DTO';
import { BodyValidator } from '@api/services';

/**
 * Controller que contém os métodos de mensagem (push).
 *
 * @export
 * @class MessageController
 * @extends {BaseController}
 */
@JsonController('/message')
export default class MessageController extends BaseController {
    private mensagemRepository: MensagemRepository;

    /**
     * Cria uma nova instância MessageController.
     * Inicia respositório de dados.
     * @memberof MessageController
     */
    public constructor() {
        super();
        this.mensagemRepository = new MensagemRepository();
    }

    /**
     * Adiciona uma nova mensagem.
     *
     * @param {ModuleBody} body
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof MessageController
     */
    @Authorized()
    @Post('/')
    public async postMessage(
        @Body() body: MessageBody,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const bodyValidationResults = await new BodyValidator().validate(body);
            if (bodyValidationResults) {
                // Retorna 422 se os dados do body estiverem inválidos.
                return this.sendResponse(res, 422, bodyValidationResults);
            }
            await this.mensagemRepository.insert(body);
            return this.sendResponse(res, 200, true);
        } catch (ex) {
            logger.error(`Erro na requisição de 'postMessage' no controller 'MessageController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }
}