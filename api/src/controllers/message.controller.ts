import { Response } from 'express';
import { JsonController, Authorized, Get, Res, Post, Body, Delete, Param } from 'routing-controllers';
import { CadastroProcessosRepository } from '@api/database/repositories';
import logger from '@api/util/logger';
import BaseController from './base-controller.class';
import { ModuleBody, MessageBody } from '@api/DTO';
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
    private cadastroProcessosRepository: CadastroProcessosRepository;

    /**
     * Cria uma nova instância MessageController.
     * Inicia respositório de dados.
     * @memberof MessageController
     */
    public constructor() {
        super();
        this.cadastroProcessosRepository = new CadastroProcessosRepository();
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
            if (!body.id) {
                const results = await this.cadastroProcessosRepository.insert(body);
                body.id = results.id;
            } else {
                const processData = await this.cadastroProcessosRepository.findById(body.id);
                const newValue = { ...processData, ...body };
                await this.cadastroProcessosRepository.update(body.id, newValue);
            }
            const response = this.formatProcessResponse(await this.cadastroProcessosRepository.findById(body.id));
            return this.sendResponse(res, 200, response);
        } catch (ex) {
            logger.error(`Erro na requisição de 'postProcess' no controller 'MessageController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }
}