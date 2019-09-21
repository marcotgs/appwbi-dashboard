import FormValidationMessages from './form-validation-messages.interface';

const validationMessages: FormValidationMessages = {
    email: [
        { type: 'required', message: 'O campo email é obrigatório.' },
        { type: 'pattern', message: 'Digite um email válido.' },
    ],
    password: [
        { type: 'required', message: 'O campo senha é obrigatório.' },
        { type: 'minlength', message: 'A senha precisa ter no mínimo 8 caracteres.' },
    ],
    confirmPassword: [
        { type: 'mismatch', message: 'As senhas não coincidem.' },
        { type: 'required', message: 'O campo confirmação de senha é obrigatório.' },
    ],
};

export default validationMessages;