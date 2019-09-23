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
    cep?:string;
	endereco?:string;
	bairro?:string;
	complemento?:string;
	idMunicipio?:number;
	numero?:number;
}

export default acessoUsuariosModel;