/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { JsonController, Authorized, Get, Res, Post, Body, Delete, Param } from 'routing-controllers';
import { EmpresaRepository, SegmentoRepository, MunicipioRepository } from '@api/database/repositories';
import logger from '@api/util/logger';
import BaseController from './base-controller.class';
import { CompanyBody } from '@api/DTO';
import { municipioModel, estadoModel, empresaModel } from '@api/database/models';

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
    private segmentoRepository: SegmentoRepository;
    private municipioRepository: MunicipioRepository;

    /**
     * Cria uma nova instância CompanyController.
     * Inicia respositório de dados.
     * @memberof CompanyController
     */
    public constructor() {
        super();
        this.empresaRepository = new EmpresaRepository();
        this.segmentoRepository = new SegmentoRepository();
        this.municipioRepository = new MunicipioRepository();
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
            const response = results.map((e: empresaModel & { municipio: municipioModel & { estado: estadoModel } }): any => {
                const json = e.toJSON() as any;
                const object = {
                    ...json,
                    cidade: json.municipio.nome,
                    codigoCompletoCidadeIbge: json.municipio.codigoCompletoCidadeIbge,
                    estado: json.municipio.estado.sigla,
                };
                delete object.municipio;
                return object;
            });
            return this.sendResponse(res, 200, response);
        } catch (ex) {
            logger.error(`Erro na requisição de 'getCompanies' no controller 'CompanyController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Recupera uma lista de segmentos.
     *
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof CompanyController
     */
    @Authorized()
    @Get('/segments')
    public async getCompanySegments(
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const results = await this.segmentoRepository.findAll();
            return this.sendResponse(res, 200, results);
        } catch (ex) {
            logger.error(`Erro na requisição de 'getCompanySegments' no controller 'CompanyController'. Erro -> ${ex}`);
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
                const municipio = await this.municipioRepository.findByIbgeCode(body.codigoCompletoCidadeIbge);
                const results = await this.empresaRepository.insert({ ...body, idMunicipio: municipio.id });
                body.id = results.id;
            } else {
                const companyData = await this.empresaRepository.findById(body.id) as empresaModel & {
                    municipio: municipioModel & { estado: estadoModel };
                };

                const newValue = { ...companyData.toJSON(), ...body } as any;
                if (body.codigoCompletoCidadeIbge !== companyData.municipio.codigoCompletoCidadeIbge) {
                    const municipio = await this.municipioRepository.findByIbgeCode(body.codigoCompletoCidadeIbge);
                    newValue.idMunicipio = municipio.id;
                }
                await this.empresaRepository.update(body.id, newValue);
            }
            const response = await this.empresaRepository.findById(body.id) as empresaModel & {
                municipio: municipioModel & { estado: estadoModel };
            };;
            return this.sendResponse(res, 200, {
                ...response.toJSON(),
                cidade: response.municipio.nome,
                codigoCompletoCidadeIbge: response.municipio.codigoCompletoCidadeIbge,
                estado: response.municipio.estado.sigla,
            });
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