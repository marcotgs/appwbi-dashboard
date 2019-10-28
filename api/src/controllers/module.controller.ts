import { Response } from 'express';
import { JsonController, Authorized, Get, Res, Post, Body, Delete, Param } from 'routing-controllers';
import { CadastroModulosRepository } from '@api/database/repositories';
import logger from '@api/util/logger';
import BaseController from './base-controller.class';
import { ModuleBody } from '@api/DTO';
import { ModuleResponse } from '@shared/interfaces';

/**
 * Controller que contém os métodos de CRUD da tabela cadastro_modulos
 *
 * @export
 * @class ModuleController
 * @extends {BaseController}
 */
@JsonController('/module')
export default class ModuleController extends BaseController {
    private cadastroModulosRepository: CadastroModulosRepository;

    /**
     * Cria uma nova instância ModuleController.
     * Inicia respositório de dados.
     * @memberof ModuleController
     */
    public constructor() {
        super();
        this.cadastroModulosRepository = new CadastroModulosRepository();
    }

    @Authorized()
    @Get('/')
    public async getModules(
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const results = await this.cadastroModulosRepository.findAll();
            return this.sendResponse(res, 200, results);
        } catch (ex) {
            logger.error(`Erro na requisição de 'getModules' no controller 'ModulesController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    @Authorized()
    @Post('/')
    public async postModule(
        @Body() body: ModuleBody,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            if (!body.id) {
                const results = await this.cadastroModulosRepository.insert(body);
                body.id = results.id;
            } else {
                const moduleData = await this.cadastroModulosRepository.findById(body.id);
                const newValue = { ...moduleData, ...body };
                await this.cadastroModulosRepository.update(body.id, newValue);
            }
            const response = await this.cadastroModulosRepository.findById(body.id);
            return this.sendResponse(res, 200, response);
        } catch (ex) {
            logger.error(`Erro na requisição de 'getModules' no controller 'ModulesController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    @Authorized()
    @Delete('/:id')
    public async deleteModule(
        @Param('id') id: number,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            await this.cadastroModulosRepository.delete(id);
            return this.sendResponse(res, 200);
        } catch (ex) {
            logger.error(`Erro na requisição de 'getModules' no controller 'ModulesController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }
}