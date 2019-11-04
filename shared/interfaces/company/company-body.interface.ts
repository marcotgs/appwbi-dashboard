
interface CompanyBody {
    id?: number;
    nome?: string;
    cod_empresa?: string;
    razao?: string;
    email?: string;
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

export default CompanyBody;