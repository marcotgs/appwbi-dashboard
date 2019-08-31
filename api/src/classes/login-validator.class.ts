
import { LoginBody } from "@api/classes";
import { validate } from "class-validator";
import logger from "@api/util/logger";
import { ApiResponseErrors, ApiResponseError } from "@api/interfaces";

/**
 * Classe responsável por validar os dados do login.
 *
 * @export
 * @class LoginValidator
 */
export default class LoginValidator {

    /**
     * Método que valida os dados de login.
     *
     * @param {LoginBody} body
     * @returns {(Promise<ApiResponseErrors | null>)}
     * @memberof LoginValidator
     */
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
            logger.error(`Erro na validação dos dados do login: Erro: ${ex}`);
            throw ex;
        }
    }
}