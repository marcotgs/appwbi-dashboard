/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { ApiPayload } from '@shared/interfaces';


/**
 * Classe abastrata que define alguns métodos padrões de Controllers.
 *
 * @export
 * @abstract
 * @class BaseController
 */
export default abstract class BaseController {

    /**
     * Esse método define um método default para retornar um Response em método dentro de um Controller.
     *
     * @template T
     * @param {Response} res
     * @param {number} statusCode
     * @param {T} [data]
     * @returns {Response}
     * @memberof BaseController
     */
    public sendResponse<T = any>(res: Response, statusCode: number, data?: T): Response {
        if (!data) {
            return res.status(statusCode).send();
        }
        let result: ApiPayload<T> = {
            status: statusCode,
            data,
        };
        return res.status(statusCode).set('Content-type', 'application/json; charset=utf-8').json(result);
    }
}