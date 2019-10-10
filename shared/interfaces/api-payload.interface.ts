/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Essa interface define a estrturura do contrato a ser retornado pelo API.
 *
 * @interface ApiPayload
 * @template T
 */
interface ApiPayload<T = any> {
    status: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: T;
};

export default ApiPayload;
