import { Response } from 'express';
import { JsonController, Authorized, Get, Res, Post, Body, Delete, Param, QueryParam } from 'routing-controllers';
import { CadastroSetoresRepository, SectorData } from '@api/database/repositories';
import logger from '@api/util/logger';
import BaseController from './base-controller.class';
import { ModuleBody } from '@api/DTO';
import Formatter from '@api/util/formatter';
import { SectorResponse } from '@shared/interfaces';

/**
 * Controller que contém os métodos de CRUD da tabela cadastro_setores.
 *
 * @export
 * @class SectorController
 * @extends {BaseController}
 */
@JsonController('/sector')
export default class SectorController extends BaseController {
    private cadastroSetoresRepository: CadastroSetoresRepository;

    /**
     * Cria uma nova instância SectorController.
     * Inicia respositório de dados.
     * @memberof SectorController
     */
    public constructor() {
        super();
        this.cadastroSetoresRepository = new CadastroSetoresRepository();
    }

    /**
     * Recupera uma lista de setor.
     *
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof SectorController
     */
    @Authorized()
    @Get('/')
    public async getSectors(
        @Res() res: Response,
        @QueryParam('companyId') companyId: number,
    ): Promise<Response> {
        try {
            const results = await this.cadastroSetoresRepository.findAll(companyId);
            const response = results.map((result): SectorResponse => this.formatSectorResponse(result));
            return this.sendResponse(res, 200, response);
        } catch (ex) {
            logger.error(`Erro na requisição de 'getSectors' no controller 'SectorController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Adiciona ou edita um setor.
     *
     * @param {ModuleBody} body
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof SectorController
     */
    @Authorized()
    @Post('/')
    public async postSector(
        @Body() body: ModuleBody,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            if (!body.id) {
                const results = await this.cadastroSetoresRepository.insert(body);
                body.id = results.id;
            } else {
                const sectorData = await this.cadastroSetoresRepository.findById(body.id);
                const newValue = { ...sectorData, ...body };
                await this.cadastroSetoresRepository.update(body.id, newValue);
            }
            const response = this.formatSectorResponse(await this.cadastroSetoresRepository.findById(body.id));
            return this.sendResponse(res, 200, response);
        } catch (ex) {
            logger.error(`Erro na requisição de 'postSector' no controller 'SectorController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Deleta um setor.
     *
     * @param {number} id
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof SectorController
     */
    @Authorized()
    @Delete('/:id')
    public async deleteSector(
        @Param('id') id: number,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            await this.cadastroSetoresRepository.delete(id);
            return this.sendResponse(res, 200);
        } catch (ex) {
            logger.error(`Erro na requisição de 'deleteSector' no controller 'SectorController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    private formatSectorResponse(result: SectorData): SectorResponse {
        const resultJSON = result.toJSON() as SectorData;
        return {
            ...resultJSON,
            descricaoFormatada: Formatter.removeAccents(resultJSON.descricao),
            podeDeletar: (resultJSON.acessoUsuarios && resultJSON.acessoUsuarios.length === 0),
            empresa: {
                ...resultJSON.empresa,
                numero: null,
                nomeFormatado: Formatter.removeAccents(resultJSON.empresa.nome)
            }
        };
    }
}