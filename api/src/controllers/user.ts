import { Request, Response, Router } from "express";
import { Sequelize, Model } from "sequelize";
import { check } from "express-validator";
import Database from "@api/database";
// eslint-disable-next-line @typescript-eslint/camelcase
import acesso_empresasModelInit from "@api/database/models/acesso_empresas";


export default class UserController {
    public router: Router = Router();
    public constructor() {
        this.router.get("/login", this.login);
    }

    /**
     *
     * POST: /api/login
     * @param {Request} req
     * @param {Response } res
     * @memberof User
     */
    private login(req: Request, res: Response): void {
        var teste = acesso_empresasModelInit(Database.sequelizeInstance);
        // check("email", "Email não é válido").isEmail();
        // check("password", "Senha inválida").isLength({ min: 1 });
        teste.findAll().then((users: any): void => {
            res.send(users);
        });
    }
}