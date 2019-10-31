import { PermissionResponse } from '../permission';
import { RoutineResponse } from '../routine';

interface ProcessResponse {
    id?: number;
    descricao?: string;
    icone?: string;
    acessoNiveisPermissao?: PermissionResponse;
    cadastroRotina?: RoutineResponse;
}

export default ProcessResponse;