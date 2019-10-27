import { MinLength, IsNotEmpty } from 'class-validator';
import { validationMessages } from '@api/messages';

/**
 * Classe que tipo o body da requisição de `changePassword`.
 *
 * @export
 * @class ChangePasswordBody
 */
export default class ChangePasswordBody {

    @IsNotEmpty({
        message: validationMessages.resetPasswordToken.required
    })
    public resetPasswordToken: string;

    @MinLength(8, {
        message: validationMessages.password.minlength
    })
    public newPassword: string;

}