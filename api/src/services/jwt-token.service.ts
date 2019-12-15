import { sign, SignOptions } from 'jsonwebtoken';

export default class JwtTokenService {

    public generateToken(options: { data: object; expiresIn?: number; subject?: string }): string {
        const jwtOptions: SignOptions = { expiresIn: '180d' };
        if (options.expiresIn) {
            jwtOptions.expiresIn = options.expiresIn;
        }

        if (options.subject) {
            jwtOptions.subject = options.subject;
        }
        return sign({
            ...options.data
        }, process.env.JWT_SECRET, jwtOptions);
    }
}