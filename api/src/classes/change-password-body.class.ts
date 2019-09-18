import { IsEmail, IsBoolean } from "class-validator";
import { validationMessages } from "@api/messages";

/**
 * Classe que tipo o body da requisição de `sendEmailChangePassword`.
 *
 * @export
 * @class ChangePasswordBody
 */
export default class ChangePasswordBody {

    @IsEmail({}, {
        message: validationMessages.email.pattern
    })
    public email: string;

    @IsBoolean({
        message: validationMessages.password.minlength
    })
    public forgotPassword: boolean = false;
}