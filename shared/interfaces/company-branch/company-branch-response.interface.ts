import { CompanyResponse } from "../company";

interface CompanyBranchResponse {
    id?: number;
    descricao?: string;
    filial?: string;
    descricaoFormatada?: string;
    podeDeletar?: boolean;
    empresa?: CompanyResponse;
}

export default CompanyBranchResponse;