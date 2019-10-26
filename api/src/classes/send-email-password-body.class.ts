import { IsEmail, IsBoolean } from 'class-validator';
import { validationMessages } from '@api/messages';

/**
 * Classe que tipo o body da requisição de `sendEmailChangePassword`.
 *
 * @export
 * @class ChangePasswordBody
 */
export default class SendEmailChangePasswordBody {

    @IsEmail({}, {
        message: validationMessages.email.pattern
    })
    public email: string;

    @IsBoolean()
    public forgotPassword: boolean = false;
    
}