/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import sha256 from 'crypto-js/sha256';
import { Post, Res, JsonController, Body, Authorized, CurrentUser, Get } from 'routing-controllers';
import { AcessoUsuariosRepository } from '@api/database/repositories/acesso-usuarios';
import BaseController from '@api/controllers/base-controller.class';
import { LoginResponse, acessoUsuariosResponse } from '@shared/interfaces';
import logger from '@api/util/logger';
import { acessoUsuariosModel, municipioModel, empresaModel, estadoModel, acessoNiveisPermissaoModel } from '@api/database/models';
import { MunicipioRepository } from '@api/database/repositories/municipio';
import Database from '@api/database';
import { JwtTokenService } from '@api/services';


/**
 * Controller que contém dos dados da API de usuário.
 *
 * @export
 * @class UserController
 * @extends {BaseController}
 */
@JsonController('/user')
export default class UserController extends BaseController {

    // Repositorio de acesso_usuarios.
    private acessoUsuariosRepository: AcessoUsuariosRepository;

    // Repositorio de municipio.
    private municipioRepository: MunicipioRepository;

    // Service que gera o token jwt.
    private jwtTokenService: JwtTokenService;

    /**
     * Cria uma nova instância UserController.
     * Inicia respositório de dados.
     * @memberof UserController
     */
    public constructor() {
        super();
        this.acessoUsuariosRepository = new AcessoUsuariosRepository();
        this.municipioRepository = new MunicipioRepository();
        this.jwtTokenService = new JwtTokenService();
    }

    /**
     * Esse método recupera os dados do usuário.
     *
     * Get: /api/userProfile
     * @param {Response} res
     * @param {number} [userId]
     * @returns {Promise<Response>}
     * @memberof UserController
     */
    @Authorized()
    @Get('/profile')
    public async getUserProfile(
        @Res() res: Response,
        @CurrentUser() userId?: number,
    ): Promise<Response> {
        try {
            const userData = await this.acessoUsuariosRepository.findById(
                userId,
                {
                    attributes: [
                        'nome', 'sobrenome', 'email', 'ddd', 'telefone',
                        'endereco', 'numero', 'complemento', 'bairro', 'cep',
                        'dataNascimento', 'cargo', 'cgc'
                    ],
                    include: [
                        { model: Database.models.empresa },
                        { model: Database.models.acessoNiveisPermissao },
                        {
                            model: Database.models.municipio,
                            include: [
                                {
                                    model: Database.models.estado,
                                }
                            ],
                        }
                    ],
                }
            ) as acessoUsuariosModel & {
                municipio: municipioModel & { estado: estadoModel };
                acessoNiveisPermissao: acessoNiveisPermissaoModel;
                empresa: empresaModel;
            };

            const userDataJSON = userData.toJSON() as any;

            const result: acessoUsuariosResponse = {
                cidade: userData.municipio.nome,
                codigoCompletoCidadeIbge: userData.municipio.codigoCompletoCidadeIbge,
                estado: userData.municipio.estado.sigla,
                perfil: userData.acessoNiveisPermissao.descricao,
                empresa: userData.empresa.nome,
            };

            delete userDataJSON.municipio;
            delete userDataJSON.acessoNiveisPermissao;
            delete userDataJSON.empresa;

            return this.sendResponse(res, 200, { ...result, ...userDataJSON });
        } catch (ex) {
            logger.error(`Erro na requisição de getUserProfile. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Esse método atualiza os dados do usuário.
     *
     * POST: /api/updateProfile
     * @param {acessoUsuariosModel} body
     * @param {Response} res
     * @param {number} [userId]
     * @returns {Promise<Response>}
     * @memberof UserController
     */
    @Authorized()
    @Post('/profile')
    public async updateProfile(
        @Body() body: acessoUsuariosResponse,
        @Res() res: Response,
        @CurrentUser() userId?: number,
    ): Promise<Response> {
        try {
            const userData = await this.acessoUsuariosRepository.findById(userId);
            const municipio = await this.municipioRepository.findByIbgeCode(body.codigoCompletoCidadeIbge);
            userData.idMunicipio = municipio.id;
            body.id = userData.id;

            if ((body.id && body.id !== userData.id) || body.email !== userData.email) {
                return this.sendResponse(res, 400);
            }

            if (body.password) {
                body.password = sha256(`${userData.passwordSalt}${body.password}`).toString();
            }

            const mergeData = { ...userData.toJSON(), ...body };
            this.acessoUsuariosRepository.updateUser(mergeData);

            const token = this.jwtTokenService.generateToken({
                data: {
                    email: userData.email,
                    nome: userData.nome,
                },
                subject: userData.id.toString(),
            });

            const result: LoginResponse = {
                expiresIn: (new Date().setDate(new Date().getDate() + 180)).valueOf(),
                token,
            };
            return this.sendResponse(res, 200, result);
        } catch (ex) {
            logger.error(`Erro na requisição de updateProfile. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

}
