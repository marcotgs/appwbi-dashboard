interface acessoUsuariosModel {
    id?: number;
    nome?: string;
    sobrenome?: string;
    email?: string;
    password?: string;
    passwordSalt?: string;
    idAcessoEmpresas?: number;
    idNiveisPermissao?: number;
    resetPasswordToken?: string;
}

export default acessoUsuariosModel;