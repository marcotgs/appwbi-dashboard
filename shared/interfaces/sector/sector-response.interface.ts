import { CompanyResponse } from "../company";


interface SectorResponse {
    id?: number;
    descricao?: string;
    empresa?: CompanyResponse;
}

export default SectorResponse;