
import { validate } from "class-validator";
import logger from "@api/util/logger";
import { ApiResponseErrors, ApiResponseError } from "@api/interfaces";

/**
 * Classe responsável por validar os dados do body de uma requisição.
 *
 * @export
 * @class BodyValidator
 */
export default class BodyValidator {

    /**
     * Método que valida os dados de uma requisição.
     *
     * @param {T} body
     * @returns {(Promise<ApiResponseErrors | null>)}
     * @memberof BodyValidator
     */
    public async validate<T>(body: T): Promise<ApiResponseErrors | null> {
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
            logger.error(`Erro na validação dos dados da requisição: Erro: ${ex}`);
            throw ex;
        }
    }
}