/**
 * Essa interface define os dados do contrato de sucesso no login.
 *
 * @interface LoginResponse
 */
interface LoginResponse {
    token: string;
    expiresIn: number;
};

export default LoginResponse;