
/**
 * Essa interface define a estrutura de erros a serem retornados para o cliente.
 *
 * @export
 * @interface ApiResponseErrors
 */
export interface ApiResponseErrors {
    errors: ApiResponseError[];
}

/**
 * Detalhes do erro.
 *
 * @export
 * @interface ApiResponseError
 */
export interface ApiResponseError {
    type?: string;
    message: string; 
}