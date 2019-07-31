import FormValidationMessages from './form-validation-messages.interface';

const validationMessages: FormValidationMessages = {
    email: [
        { type: 'required', message: 'O campo email é obrigatório.' },
        { type: 'pattern', message: 'Digite um email válido.' },
    ],
    password: [
        { type: 'required', message: 'O campo senha é obrigatório.' },
        { type: 'minlength', message: 'A senha precisa ter no mínimo 8 caracteres..' },
    ],
};

export default validationMessages;