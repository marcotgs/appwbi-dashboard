import { IsEmail, MinLength } from "class-validator";
import { validationMessages } from "@api/messages";

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