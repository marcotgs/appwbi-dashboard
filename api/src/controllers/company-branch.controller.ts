import { Response } from 'express';
import { JsonController, Authorized, Get, Res, Post, Body, Delete, Param } from 'routing-controllers';
import { CadastroFiliaisRepository } from '@api/database/repositories';
import logger from '@api/util/logger';
import BaseController from './base-controller.class';
import { CompanyBranchBody } from '@api/DTO';

/**
 * Controller que contém os métodos de CRUD da tabela cadastro_filiais.
 *
 * @export
 * @class CompanyBranchController
 * @extends {BaseController}
 */
@JsonController('/company-branch')
export default class CompanyBranchController extends BaseController {
    private filiailRepository: CadastroFiliaisRepository;

    /**
     * Cria uma nova instância CompanyBranchController.
     * Inicia respositório de dados.
     * @memberof CompanyBranchController
     */
    public constructor() {
        super();
        this.filiailRepository = new CadastroFiliaisRepository();
    }

    /**
     * Recupera uma lista de filiais.
     *
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof CompanyBranchController
     */
    @Authorized()
    @Get('/')
    public async getCompaniesBranchs(
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const results = await this.filiailRepository.findAll();
            return this.sendResponse(res, 200, results);
        } catch (ex) {
            logger.error(`Erro na requisição de 'getCompaniesBranchs' no controller 'CompanyBranchController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Adiciona ou edita uma filial.
     *
     * @param {CompanyBranchBody} body
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof CompanyBranchController
     */
    @Authorized()
    @Post('/')
    public async postCompanyBranch(
        @Body() body: CompanyBranchBody,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            if (!body.id) {
                const results = await this.filiailRepository.insert(body);
                body.id = results.id;
            } else {
                const companyData = await this.filiailRepository.findById(body.id);
                const newValue = { ...companyData, ...body };
                await this.filiailRepository.update(body.id, newValue);
            }
            const response = await this.filiailRepository.findById(body.id);
            return this.sendResponse(res, 200, response);
        } catch (ex) {
            logger.error(`Erro na requisição de 'postCompanyBranch' no controller 'CompanyBranchController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Deleta uma filial.
     *
     * @param {number} id
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof CompanyBranchController
     */
    @Authorized()
    @Delete('/:id')
    public async deleteCompanyBranch(
        @Param('id') id: number,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            await this.filiailRepository.delete(id);
            return this.sendResponse(res, 200);
        } catch (ex) {
            logger.error(`Erro na requisição de 'deleteCompanyBranch' no controller 'CompanyBranchController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }
}