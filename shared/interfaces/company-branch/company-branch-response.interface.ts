import { CompanyResponse } from "../company";

interface CompanyBranchResponse {
    id?: number;
    descricao?: string;
    filial?: string;
    empresa?: CompanyResponse;
}

export default CompanyBranchResponse;