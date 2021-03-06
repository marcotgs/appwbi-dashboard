import { Response } from 'express';
import { JsonController, Authorized, Get, Res, Post, Body, Delete, Param } from 'routing-controllers';
import { CadastroRotinasRepository, RoutineData } from '@api/database/repositories';
import logger from '@api/util/logger';
import BaseController from './base-controller.class';
import { ModuleBody } from '@api/DTO';
import { RoutineResponse } from '@shared/interfaces';
import Formatter from '@api/util/formatter';

/**
 * Controller que contém os métodos de CRUD da tabela cadastro_rotinas.
 *
 * @export
 * @class RoutineController
 * @extends {BaseController}
 */
@JsonController('/routine')
export default class RoutineController extends BaseController {
    private cadastroRotinasRepository: CadastroRotinasRepository;

    /**
     * Cria uma nova instância RoutineController.
     * Inicia respositório de dados.
     * @memberof RoutineController
     */
    public constructor() {
        super();
        this.cadastroRotinasRepository = new CadastroRotinasRepository();
    }

    /**
     * Recupera uma lista de rotinas.
     *
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof RoutineController
     */
    @Authorized()
    @Get('/')
    public async getRoutines(
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const results = await this.cadastroRotinasRepository.findAll();
            const response = results.map((result): RoutineResponse => this.formaRoutineResponse(result));
            return this.sendResponse(res, 200, response);
        } catch (ex) {
            logger.error(`Erro na requisição de 'getRoutines' no controller 'RoutineController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Adiciona ou edita uma rotina.
     *
     * @param {ModuleBody} body
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof RoutineController
     */
    @Authorized()
    @Post('/')
    public async postRoutine(
        @Body() body: ModuleBody,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            if (!body.id) {
                const results = await this.cadastroRotinasRepository.insert(body);
                body.id = results.id;
            } else {
                const routineData = await this.cadastroRotinasRepository.findById(body.id);
                const newValue = { ...routineData, ...body };
                await this.cadastroRotinasRepository.update(body.id, newValue);
            }
            const response = this.formaRoutineResponse(await this.cadastroRotinasRepository.findById(body.id));
            return this.sendResponse(res, 200, response);
        } catch (ex) {
            logger.error(`Erro na requisição de 'postRoutine' no controller 'RoutineController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Deleta uma rotina.
     *
     * @param {number} id
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof RoutineController
     */
    @Authorized()
    @Delete('/:id')
    public async deleteRoutine(
        @Param('id') id: number,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            await this.cadastroRotinasRepository.delete(id);
            return this.sendResponse(res, 200);
        } catch (ex) {
            logger.error(`Erro na requisição de 'deleteRoutine' no controller 'RoutineController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    private formaRoutineResponse(result: RoutineData): RoutineResponse {
        const resultJSON = result.toJSON() as RoutineData;
        return {
            ...resultJSON,
            descricaoFormatada: Formatter.removeAccents(resultJSON.descricao),
            podeDeletar: (resultJSON.cadastroProcessos.length === 0),
            cadastroModulo: {
                ...resultJSON.cadastroModulo,
                descricaoFormatada: Formatter.removeAccents(resultJSON.cadastroModulo.descricao),
            },
            acessoNiveisPermissao: {
                ...resultJSON.acessoNiveisPermissao,
                descricaoFormatada: Formatter.removeAccents(resultJSON.acessoNiveisPermissao.descricao)
            },
        };
    }
}