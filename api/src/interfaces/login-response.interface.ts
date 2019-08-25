interface LoginResponse {
    token: string;
    email: string;
    expiresIn: number;
};

export default LoginResponse;