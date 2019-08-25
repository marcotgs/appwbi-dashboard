
import { LoginBody } from "@api/classes";
import { validate } from "class-validator";
import logger from "@api/util/logger";
import { ApiResponseErrors, ApiResponseError } from "@api/interfaces";

export default class LoginValidator {

    public async validate(body: LoginBody): Promise<ApiResponseErrors | null> {
        try {
            const errors = await validate(body);
            if (errors.length !== 0) {
                const result: ApiResponseErrors = {
                    errors: errors.map((e): ApiResponseError => ({
                        type: e.property,
                        message: e.constraints[Object.keys(e.constraints)[0]],
                    }))
                };
                return result;
            }
            return null;
        } catch (ex) {
            logger.debug(`Erro na validação dos dados do login: Erro: ${ex}`);
            throw ex;
        }
    }
}