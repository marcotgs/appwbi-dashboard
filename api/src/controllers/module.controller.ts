import { Response } from 'express';
import { JsonController, Authorized, Get, Res, Post, Body } from 'routing-controllers';
import { CadastroModulosRepository } from '@api/database/repositories';
import logger from '@api/util/logger';
import BaseController from './base-controller.class';
import { ModuleBody } from '@api/DTO';

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
        @Body() body: ModuleBody ,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            if(!body.id){
                const results = await this.cadastroModulosRepository.insert(body);
                body.id = results.id;
            }
            const response = await this.cadastroModulosRepository.findById(body.id);
            return this.sendResponse(res, 200, response);
        } catch (ex) {
            logger.error(`Erro na requisição de 'getModules' no controller 'ModulesController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }
}