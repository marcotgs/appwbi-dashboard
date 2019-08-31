import { IsEmail, MinLength } from "class-validator";
import { validationMessages } from "@api/messages";

/**
 * Classe que tipo o body da requisição de `Login`.
 *
 * @export
 * @class LoginBody
 */
export default class LoginBody {

    @IsEmail({}, {
        message: validationMessages.email.pattern
    })
    public email: string;

    @MinLength(8, {
        message: validationMessages.password.minlength
    })
    public password: string;
}