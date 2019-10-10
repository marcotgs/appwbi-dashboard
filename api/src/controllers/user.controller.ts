/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import sha256 from 'crypto-js/sha256';
import jwt from 'jsonwebtoken';
import SendGrid from '@sendgrid/mail';
import { Post, Res, JsonController, Body, Put, Authorized, CurrentUser, Get } from 'routing-controllers';
import { AcessoUsuariosRepository } from '@api/database/repositories/acesso-usuarios';
import { LoginBody, ChangePasswordBody, SendEmailChangePasswordBody } from '@api/classes';
import { BodyValidator } from '@api/classes';
import BaseController from '@api/controllers/base-controller.class';
import { ApiResponseErrors, LoginResponse, acessoUsuariosResponse } from '@shared/interfaces';
import logger from '@api/util/logger';
import { acessoUsuariosModel, municipioModel, empresaModel, estadoModel, acessoNiveisPermissaoModel } from '@api/database/models';
import { MunicipioRepository } from '@api/database/repositories/municipio';
import Database from '@api/database';


/**
 * Controller que contém dos dados da API de usuário.
 *
 * @export
 * @class UserController
 * @extends {BaseController}
 */
@JsonController('/user')
export default class UserController extends BaseController {


    /**
     * Repositorio de acesso_usuarios.
     *
     * @private
     * @type {AcessoUsuariosRepository}
     * @memberof UserController
     */
    private acessoUsuariosRepository: AcessoUsuariosRepository;

    /**
    * Repositorio de municipio.
    *
    * @private
    * @type {AcessoUsuariosRepository}
    * @memberof UserController
    */
    private municipioRepository: MunicipioRepository;

    /**
     * Cria uma nova instância UserController.
     * Inicia respositório de dados.
     * @memberof UserController
     */
    public constructor() {
        super();
        this.acessoUsuariosRepository = new AcessoUsuariosRepository();
        this.municipioRepository = new MunicipioRepository();
    }

    /**
     * Esse método troca a senha do usuário.
     * 
     * PUT: /api/changePassword
     * @param {Request} req
     * @param {Response} res
     * @memberof UserController
     */
    @Put('/changePassword')
    public async changePassword(
        @Body() body: ChangePasswordBody,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const bodyValidationResults = await new BodyValidator().validate(body);
            if (bodyValidationResults) {
                // Retorna 422 se os dados do body estiverem inválidos.
                return this.sendResponse(res, 422, bodyValidationResults);
            }

            try {
                const payload: any = jwt.verify(body.resetPasswordToken, process.env.JWT_SECRET);
                const userData = await this.acessoUsuariosRepository.findByEmail(payload.email);
                if (!userData) {
                    const response: ApiResponseErrors = {
                        errors: [{
                            message: 'Esse email não pertence a uma conta. Confira-o.',
                        }],
                    };
                    // Retorna 404 se caso a conta relacionada ao email enviado não for encontrada.
                    return this.sendResponse(res, 404, response);
                }
                const saltedNewPassword = sha256(`${userData.passwordSalt}${body.newPassword}`).toString();
                await this.acessoUsuariosRepository.updatePassword(payload.email, saltedNewPassword);
                return this.sendResponse(res, 200);
            } catch (ex) {
                // Retorna 400 se o token  estiver invalido.
                return this.sendResponse(res, 400, {
                    errors: [{
                        message: 'Esse link já expirou. Solicite outro para alterar sua senha.',
                    }],
                });
            }
        } catch (ex) {
            logger.error(`Erro na requisição de changePassword. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }


    /**
     * Esse método envia um email de redefinição de senha.
     * 
     * POST: /api/sendEmailChangePassword
     * @param {Request} req
     * @param {Response} res
     * @memberof UserController
     */
    @Post('/sendEmailChangePassword')
    public async sendEmailChangePassword(
        @Body() body: SendEmailChangePasswordBody,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const bodyValidationResults = await new BodyValidator().validate(body);
            if (bodyValidationResults) {
                // Retorna 422 se os dados do body estiverem inválidos.
                return this.sendResponse(res, 422, bodyValidationResults);
            }

            const userData = await this.acessoUsuariosRepository.findByEmail(body.email);
            if (!userData) {
                const response: ApiResponseErrors = {
                    errors: [{
                        message: 'Esse email não pertence a uma conta. Confira-o.',
                    }],
                };
                // Retorna 404 se caso a conta relacionada ao email enviado não for encontrada.
                return this.sendResponse(res, 404, response);
            }

            const resetPasswordToken = jwt.sign({ email: userData.email }, process.env.JWT_SECRET, {
                expiresIn: '24h',
            });

            await this.acessoUsuariosRepository.updateResetPasswordToken(body.email, resetPasswordToken);

            const msg = {
                to: body.email,
                from: 'contato@appwbi.com.br',
                templateId: 'd-26cac983cafe468db185c1ac9a4bc71c',
                // eslint-disable-next-line @typescript-eslint/camelcase
                dynamic_template_data: {
                    subject: (body.forgotPassword) ? '[APPWBI] Esqueceu sua senha?' : '[APPWBI] Alteração de senha!',
                    title: (body.forgotPassword) ? 'Esqueceu sua senha?' : 'Alterar sua senha?',
                    link: process.env.AUTH_BASE_URL.concat(`/alterar-senha/${resetPasswordToken}`)
                },
            };

            await SendGrid.send(msg);
            //Retorna OK
            return this.sendResponse(res, 200);

        } catch (ex) {
            logger.error(`Erro na requisição de sendEmailChangePassword. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    /**
     * Esse método realiza a validação dos dados do login.
     * E quando sucesso retorna os dados de autenticação.
     * 
     * POST: /api/login
     * @param {Request} req
     * @param {Response} res
     * @memberof UserController
     */
    @Post('/login')
    public async login(@Body() loginData: LoginBody, @Res() res: Response): Promise<Response> {
        try {
            const loginValidationResults = await new BodyValidator().validate(loginData);
            if (loginValidationResults) {
                // Retorna 422 se os dados de login estiverem inválidos.
                return this.sendResponse(res, 422, loginValidationResults);
            }

            const userData = await this.acessoUsuariosRepository.findByEmail(loginData.email);
            if (!userData) {
                const response: ApiResponseErrors = {
                    errors: [{
                        message: 'Esse email não pertence a uma conta. Confira-o.',
                    }],
                };
                // Retorna 404 se caso a conta relacionada ao email enviado não for encontrada.
                return this.sendResponse(res, 404, response);
            }

            const saltedPassword = sha256(`${userData.passwordSalt}${loginData.password}`).toString();
            if (!await this.acessoUsuariosRepository.authenticate(loginData.email, saltedPassword)) {
                const response: ApiResponseErrors = {
                    errors: [{
                        message: 'Sua senha está incorreta. Confira-a.',
                    }],
                };
                //Retorna 401 se caso a senha estiver inválida.
                return this.sendResponse(res, 401, response);
            }

            const { token, expirationDate } = this.generateToken(userData);
            const result: LoginResponse = {
                expiresIn: expirationDate.valueOf(),
                token,
            };
            //Retorna 200 com os dados de autenticação.
            return this.sendResponse(res, 200, result);
        } catch (ex) {
            logger.error(`Erro na requisição de login. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
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
                body.password =  sha256(`${userData.passwordSalt}${body.password}`).toString();
            }

            const mergeData = { ...userData.toJSON(), ...body };
            this.acessoUsuariosRepository.updateUser(mergeData);

            const { token, expirationDate } = this.generateToken(body);
            const result: LoginResponse = {
                expiresIn: expirationDate.valueOf(),
                token,
            };
            return this.sendResponse(res, 200, result);
        } catch (ex) {
            logger.error(`Erro na requisição de updateProfile. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

    private generateToken(userData: acessoUsuariosModel | acessoUsuariosResponse): { token: string; expirationDate: Date } {
        const token = jwt.sign({
            email: userData.email,
            nome: userData.nome,
        }, process.env.JWT_SECRET, {
            expiresIn: '180d',
            subject: userData.id.toString(),
        });

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 180);
        return { token, expirationDate };
    }

}
