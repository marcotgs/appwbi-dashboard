import ValidationMessagesTypes from "./validation-message-types.enum";
import { ValidationMessage } from "@api/interfaces";

const validationMessages: ValidationMessage = {
    email: {
        [ValidationMessagesTypes.PATTERN]: "Email inválido!",
    }, 
    password: {
        [ValidationMessagesTypes.MINLENGTH]: "A senha precisa ter no mínimo 8 caracteres...",
    }
};

export default validationMessages;