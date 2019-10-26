import { ValidationMessagesTypes } from '@api/messages';

/**
 * Mensagens de validação de dados.
 *
 * @interface ValidationMessage
 */
interface ValidationMessage {
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