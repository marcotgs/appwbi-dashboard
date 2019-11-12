import { CompanyResponse } from "../company";

interface CompanyBranchResponse {
    id?: number;
    descricao?: string;
    filial?: string;
    descricaoFormatada?: string;
    empresa?: CompanyResponse;
}

export default CompanyBranchResponse;