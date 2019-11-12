import { PermissionResponse } from '../permission';
import { RoutineResponse } from '../routine';

interface ProcessResponse {
    id?: number;
    descricao?: string;
    descricaoFormatada?: string;
    icone?: string;
    funcao?: string;
    acessoNiveisPermissao?: PermissionResponse;
    cadastroRotina?: RoutineResponse;
}

export default ProcessResponse;