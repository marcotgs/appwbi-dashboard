import { Response } from 'express';
import { JsonController, Authorized, Get, Res, CurrentUser, Post, Delete, Body, Param } from 'routing-controllers';
import { CadastroModulosRepository, AcessoUsuariosRepository, AcessoNiveisPermissaoRepository } from '@api/database/repositories';
import logger from '@api/util/logger';
import { MenuPermissionsResponse, PermissionResponse } from '@shared/interfaces';
import BaseController from './base-controller.class';
import { PermissionBody } from '@api/DTO';

/**
 * Controller que contém os métodos de permissão.
 *
 * @export
 * @class AccessPermissionController
 * @extends {BaseController}
 */
@JsonController('/access-permission')
export default class AccessPermissionController extends BaseController {

    // Repositorio de acesso_usuarios.
    private acessoUsuariosRepository: AcessoUsuariosRepository;

    // Repositorio de cadastro_modulos.
    private cadastroModulosRepository: CadastroModulosRepository;

    // Repositorio de acesso_niveis_permissao.
    private acessoNiveisPermissaoRepository: AcessoNiveisPermissaoRepository;

    /**
     * Cria uma nova instância AccessPermissionController.
     * Inicia respositório de dados.
     * @memberof AccessPermissionController
     */
    public constructor() {
        super();
        this.acessoUsuariosRepository = new AcessoUsuariosRepository();
        this.cadastroModulosRepository = new CadastroModulosRepository();
        this.acessoNiveisPermissaoRepository = new AcessoNiveisPermissaoRepository();
    }

    @Authorized()
    @Get('/')
    public async getPermissions(
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const results = await this.acessoNiveisPermissaoRepository.findAll() as PermissionResponse[];
            return this.sendResponse(res, 200, results);
        } catch (ex) {
            logger.error(`Erro na requisição de 'getModules' no controller 'AccessPermissionController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Adiciona ou edita uma permissão.
     *
     * @param {PermissionBody} body
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof PermissionController
     */
    @Authorized()
    @Post('/')
    public async postPermission(
        @Body() body: PermissionBody,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            body.id = Number(body.id);
            const permissionData = await this.acessoNiveisPermissaoRepository.findById(body.id);
            if (!permissionData) {
                await this.acessoNiveisPermissaoRepository.insert(body);
            } else {
                const newValue = { ...permissionData, ...body };
                await this.acessoNiveisPermissaoRepository.update(body.id, newValue);
            }
            const response = await this.acessoNiveisPermissaoRepository.findById(body.id);
            return this.sendResponse(res, 200, response);
        } catch (ex) {
            logger.error(`Erro na requisição de 'postPermission' no controller 'PermissionController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Deleta uma permissão.
     *
     * @param {number} id
     * @param {Response} res
     * @returns {Promise<Response>}
     * @memberof PermissionController
     */
    @Authorized()
    @Delete('/:id')
    public async deletePermission(
        @Param('id') id: number,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            await this.acessoNiveisPermissaoRepository.delete(id);
            return this.sendResponse(res, 200);
        } catch (ex) {
            logger.error(`Erro na requisição de 'deletePermission' no controller 'PermissionController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
    * Esse método retorna os menus que o usuário pode acessar dado o nivel de acesso dele.
    * 
    * POST: /api/access-permission/menu-permissions
    * @param {Request} req
    * @param {Response} res
    * @memberof AccessPermissionController
    */
    @Authorized()
    @Get('/menu-permissions')
    public async getMenuPermissions(
        @Res() res: Response,
        @CurrentUser() userId?: number
    ): Promise<Response> {
        try {
            const userData = await this.acessoUsuariosRepository.findById(userId, {
                attributes: ['idAcessoNiveisPermissao']
            });
            const results: MenuPermissionsResponse[] = await this.cadastroModulosRepository.findModulesByAccessLevel(
                userData.idAcessoNiveisPermissao
            );
            return this.sendResponse(res, 200, results);
        } catch (ex) {
            logger.error(`Erro na requisição de 'getMenuPermissions' no controller 'AccessPermissionController'. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }
}