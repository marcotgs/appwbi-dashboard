/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import { ApiPayload } from "@api/interfaces";


export default abstract class BaseController {

    public sendResponse<T = any>(res: Response, statusCode: number, data?: T): Response {
        if (!data) {
            return res.status(statusCode);
        }
        let result: ApiPayload<T> = {
            status: statusCode,
            data,
        };
        return res.status(statusCode).json(result);
    }
}