
interface FormValidatorTypes {
    type: string;
    message: string;
};

export default interface FormValidationMessages {
    [key: string]: FormValidatorTypes[];
};