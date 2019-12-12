/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import sha256 from 'crypto-js/sha256';
import jwt from 'jsonwebtoken';
import SendGrid from '@sendgrid/mail';
import { Post, Res, JsonController, Body, Put } from 'routing-controllers';
import { LoginBody, ChangePasswordBody, SendEmailChangePasswordBody } from '@api/DTO';
import { BodyValidator, JwtTokenService } from '@api/services';
import BaseController from '@api/controllers/base-controller.class';
import { ApiResponseErrors, LoginResponse } from '@shared/interfaces';
import logger from '@api/util/logger';
import { AcessoUsuariosRepository } from '@api/database/repositories';


/**
 * Controller que contém dos dados de autenticação da API.
 *
 * @export
 * @class AuthController
 * @extends {BaseController}
 */
@JsonController('/auth')
export default class AuthController extends BaseController {

    // Repositorio de acesso_usuarios.
    private acessoUsuariosRepository: AcessoUsuariosRepository;

    // Service que gera o token jwt.
    private jwtTokenService: JwtTokenService;

    /**
     * Cria uma nova instância UserController.
     * Inicia respositório de dados.
     * @memberof AuthController
     */
    public constructor() {
        super();
        this.jwtTokenService = new JwtTokenService();
        this.acessoUsuariosRepository = new AcessoUsuariosRepository();
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
            //Retorna 200 com os dados de autenticação.
            return this.sendResponse(res, 200, result);
        } catch (ex) {
            logger.error(`Erro na requisição de login. Erro -> ${ex}`);
            return this.sendResponse(res, 500);
        }
    }

}
