import { CompanyResponse } from "../company";


interface SectorResponse {
    id?: number;
    descricao?: string;
    codigo?: string;
    empresa?: CompanyResponse;
}

export default SectorResponse;