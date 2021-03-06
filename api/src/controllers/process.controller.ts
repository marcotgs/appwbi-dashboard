import { Response } from 'express';
import { JsonController, Authorized, Get, Res, Post, Body, Delete, Param } from 'routing-controllers';
import { CadastroProcessosRepository } from '@api/database/repositories';
import logger from '@api/util/logger';
import BaseController from './base-controller.class';
import { ModuleBody } from '@api/DTO';
import { ProcessResponse } from '@shared/interfaces';
import Formatter from '@api/util/formatter';
import { ProcessData } from '@api/database/repositories/cadastro-processos';

/**
 * Controller que contém os métodos de CRUD da tabela cadastro_processos.
 *
 * @export
 * @class ProcessController
 * @extends {BaseController}
 */
@JsonController('/process')
export default class ProcessController extends BaseController {
    private cadastroProcessosRepository: CadastroProcessosRepository;

    /**
     * Cria uma nova instância ProcessController.
     * Inicia respositório de dados.
     * @memberof ProcessController
     */
    public constructor() {
        super();
        this.cadastroProcessosRepository = new CadastroProcessosRepository();
    }

    /**
     * Recupera uma lista de processos.
     *
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof ProcessController
     */
    @Authorized()
    @Get('/')
    public async getProcesses(
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const results = await this.cadastroProcessosRepository.findAll();
            const response = results.map((result): ProcessResponse => this.formatProcessResponse(result));
            return this.sendResponse(res, 200, response);
        } catch (ex) {
            logger.error(`Erro na requisição de 'getProcesses' no controller 'ProcessController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Adiciona ou edita um processo.
     *
     * @param {ModuleBody} body
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof ProcessController
     */
    @Authorized()
    @Post('/')
    public async postProcess(
        @Body() body: ModuleBody,
        @Res() res: Response,
    ): Promise<Response> {
        try {
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
            logger.error(`Erro na requisição de 'postProcess' no controller 'ProcessController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Deleta um processo.
     *
     * @param {number} id
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof ProcessController
     */
    @Authorized()
    @Delete('/:id')
    public async deleteProcess(
        @Param('id') id: number,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            await this.cadastroProcessosRepository.delete(id);
            return this.sendResponse(res, 200);
        } catch (ex) {
            logger.error(`Erro na requisição de 'deleteProcess' no controller 'ProcessController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    private formatProcessResponse(result: ProcessData): ProcessResponse {
        const resultJSON = result.toJSON() as ProcessData;
        return {
            ...resultJSON,
            descricaoFormatada: Formatter.removeAccents(resultJSON.descricao),
            cadastroModulo: {
                ...resultJSON.cadastroModulo,
                descricaoFormatada: (resultJSON.cadastroModulo.descricao)
                    ? Formatter.removeAccents(resultJSON.cadastroModulo.descricao)
                    : '',
            },
            cadastroRotina: {
                ...resultJSON.cadastroRotina,
                descricaoFormatada: Formatter.removeAccents(resultJSON.cadastroRotina.descricao),
            },
            acessoNiveisPermissao: {
                ...resultJSON.acessoNiveisPermissao,
                descricaoFormatada: Formatter.removeAccents(resultJSON.acessoNiveisPermissao.descricao)
            },
        };
    }
}