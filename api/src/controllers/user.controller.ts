import { Response } from 'express';
import sha256 from 'crypto-js/sha256';
import jwt from 'jsonwebtoken';
import SendGrid from '@sendgrid/mail';
import { Post, Res, JsonController, Body } from 'routing-controllers';
import Database from '@api/database';
import { AcessoUsuariosRepository } from '@api/database/repositories/acesso-usuarios';
import { LoginBody, ChangePasswordBody } from '@api/classes';
import { BodyValidator } from '@api/classes';
import BaseController from '@api/controllers/base-controller.class';
import { ApiResponseErrors, LoginResponse } from '@api/interfaces';
import logger from '@api/util/logger';


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
     * Cria uma nova instância UserController.
     * Inicia respositório de dados.
     * @memberof UserController
     */
    public constructor() {
        super();
        this.acessoUsuariosRepository = new AcessoUsuariosRepository(Database.context);
    }


    /**
     * Esse método realiza a validação dos dados do login.
     * 
     * POST: /api/login
     * @param {Request} req
     * @param {Response} res
     * @memberof UserController
     */
    @Post('/sendEmailChangePassword')
    public async sendEmailChangePassword(
        @Body() body: ChangePasswordBody,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const bodyValidationResults = await new BodyValidator().validate(body);
            if (bodyValidationResults) {
                // Retorna 400 se os dados do body estiverem inválidos.
                return this.sendResponse(res, 400, bodyValidationResults);
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
                    subject: '[APPWBI] Alteração de senha!',
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
                // Retorna 400 se os dados de login estiverem inválidos.
                return this.sendResponse(res, 400, loginValidationResults);
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

            const token = jwt.sign({ id: userData.id, email: userData.email }, process.env.JWT_SECRET, {
                expiresIn: '180d',
            });

            const date = new Date();
            date.setDate(date.getDate() + 180);
            const result: LoginResponse = {
                expiresIn: date.valueOf(),
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
