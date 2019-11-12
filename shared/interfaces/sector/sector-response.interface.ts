import { CompanyResponse } from "../company";


interface SectorResponse {
    id?: number;
    descricao?: string;
    descricaoFormatada?: string;
    podeDeletar?: boolean;
    empresa?: CompanyResponse;
}

export default SectorResponse;