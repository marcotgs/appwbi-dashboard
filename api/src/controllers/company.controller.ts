import { Response } from 'express';
import { JsonController, Authorized, Get, Res, Post, Body, Delete, Param } from 'routing-controllers';
import { EmpresaRepository } from '@api/database/repositories';
import logger from '@api/util/logger';
import BaseController from './base-controller.class';
import { CompanyBody } from '@api/DTO';

/**
 * Controller que contém os métodos de CRUD da tabela cadastro_empresaes.
 *
 * @export
 * @class CompanyController
 * @extends {BaseController}
 */
@JsonController('/company')
export default class CompanyController extends BaseController {
    private empresaRepository: EmpresaRepository;

    /**
     * Cria uma nova instância CompanyController.
     * Inicia respositório de dados.
     * @memberof CompanyController
     */
    public constructor() {
        super();
        this.empresaRepository = new EmpresaRepository();
    }

    /**
     * Recupera uma lista de empresa.
     *
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof CompanyController
     */
    @Authorized()
    @Get('/')
    public async getCompanies(
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const results = await this.empresaRepository.findAll();
            return this.sendResponse(res, 200, results);
        } catch (ex) {
            logger.error(`Erro na requisição de 'getCompanies' no controller 'CompanyController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Adiciona ou edita uma empresa.
     *
     * @param {CompanyBody} body
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof CompanyController
     */
    @Authorized()
    @Post('/')
    public async postCompany(
        @Body() body: CompanyBody,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            if (!body.id) {
                const results = await this.empresaRepository.insert(body);
                body.id = results.id;
            } else {
                const companyData = await this.empresaRepository.findById(body.id);
                const newValue = { ...companyData, ...body };
                await this.empresaRepository.update(body.id, newValue);
            }
            const response = await this.empresaRepository.findById(body.id);
            return this.sendResponse(res, 200, response);
        } catch (ex) {
            logger.error(`Erro na requisição de 'postCompany' no controller 'CompanyController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Deleta uma empresa.
     *
     * @param {number} id
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof CompanyController
     */
    @Authorized()
    @Delete('/:id')
    public async deleteCompany(
        @Param('id') id: number,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            await this.empresaRepository.delete(id);
            return this.sendResponse(res, 200);
        } catch (ex) {
            logger.error(`Erro na requisição de 'deleteCompany' no controller 'CompanyController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }
}