import { Response } from "express";
import sha256 from "crypto-js/sha256";
import jwt from "jsonwebtoken";
import { Post, Res, JsonController, Body } from "routing-controllers";
import Database from "@api/database";
import { AcessoUsuariosRepository } from "@api/database/repositories/acesso-usuarios";
import { LoginBody } from "@api/classes";
import { LoginValidator } from "@api/classes";
import BaseController from "@api/controllers/base-controller.class";
import { ApiResponseErrors, LoginResponse } from "@api/interfaces";


@JsonController("/user")
export default class UserController extends BaseController {


    private acessoUsuariosRepository: AcessoUsuariosRepository;

    public constructor() {
        super();
        this.acessoUsuariosRepository = new AcessoUsuariosRepository(Database.context);
    }

    /**
     *
     * POST: /api/login
     * @param {Request} req
     * @param {Response} res
     * @memberof UserController
     */
    @Post("/login")
    public async login(@Body() loginData: LoginBody, @Res() res: Response): Promise<Response> {
        try {
            const loginValidationResults = await new LoginValidator().validate(loginData);
            if (loginValidationResults) {
                return this.sendResponse(res, 400, loginValidationResults);
            }

            const userData = await this.acessoUsuariosRepository.getByEmail(loginData.email);
            if (!userData) {
                const response: ApiResponseErrors = {
                    errors: [{
                        message: "Esse email não pertence a uma conta. Confira-o.",
                    }],
                };
                return this.sendResponse(res, 404, response);
            }

            const saltedPassword = sha256(`${userData.passwordSalt}${loginData.password}`).toString();
            if (!await this.acessoUsuariosRepository.authenticate(loginData.email, saltedPassword)) {
                const response: ApiResponseErrors = {
                    errors: [{
                        message: "Sua senha está incorreta. Confira-a.",
                    }],
                };
                return this.sendResponse(res, 401, response);
            }

            const token = jwt.sign({ id: userData.id, email: userData.email }, process.env["JWT_SECRET"], {
                expiresIn: "30d",
            });

            const date = new Date();
            date.setDate(date.getDate() + 30);
            const result: LoginResponse = {
                expiresIn: date.valueOf(),
                token,
            };
            return this.sendResponse(res, 200, result);
        } catch (ex) {
            return this.sendResponse(res, 500);
        }
    }
}