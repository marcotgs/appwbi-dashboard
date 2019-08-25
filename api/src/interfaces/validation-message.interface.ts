import { ValidationMessagesTypes } from "@api/messages";

interface ValidationMessage {
    email?: ValidationMessageFields;
    password?: ValidationMessageFields;
    [key: string]: ValidationMessageFields;
};

interface ValidationMessageFields {
    [ValidationMessagesTypes.PATTERN]?: string;
    [ValidationMessagesTypes.REQUIRED]?: string;
    [ValidationMessagesTypes.MINLENGTH]?: string;
    [key: string]: string;
};

export default ValidationMessage;