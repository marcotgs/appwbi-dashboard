
interface CompanyResponse {
    id?: number;
    cod_empresa?: string;
    nome?: string;
    email?: string;
    razao?: string;
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
    cgc?: string;
    ativo?: boolean;
}

export default CompanyResponse;