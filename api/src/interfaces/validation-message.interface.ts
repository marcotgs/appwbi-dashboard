import { ValidationMessagesTypes } from "@api/messages";

/**
 * Mensagens de validação de dados.
 *
 * @interface ValidationMessage
 */
interface ValidationMessage {
    email?: ValidationMessageFields;
    password?: ValidationMessageFields;
    [key: string]: ValidationMessageFields;
};

/**
 * Tipos de validação.
 *
 * @interface ValidationMessageFields
 */
interface ValidationMessageFields {
    [ValidationMessagesTypes.PATTERN]?: string;
    [ValidationMessagesTypes.REQUIRED]?: string;
    [ValidationMessagesTypes.MINLENGTH]?: string;
    [key: string]: string;
};

export default ValidationMessage;