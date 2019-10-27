
interface acessoUsuariosResponse {
    id?: number;
    nome?: string;
    sobrenome?: string;
    email?: string;
    perfil?: string;
    empresa?: string;
    ddd?: string;
    telefone?: string;
    endereco?: string;
    numero?: number;
    complemento?: string;
    bairro?: string;
    cep?: string;
    cidade?: string;
    estado?: string;
    codigoCompletoCidadeIbge?: number;
    dataNascimento?: string;
    cargo?: string;
    cgc?: string;
    password?: string;
}

export default acessoUsuariosResponse;