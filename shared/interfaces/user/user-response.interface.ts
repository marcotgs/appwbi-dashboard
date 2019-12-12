
interface UserResponse {
    id?: number;
    nome?: string;
    nomeFormatado?: string;
    sobrenome?: string;
    sobrenomeFormatado?: string;
    email?: string;
    perfil?: string;
    empresa?: string;
    setor?: string;
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

export default UserResponse;