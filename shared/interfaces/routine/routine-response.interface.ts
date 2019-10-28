import { PermissionResponse } from '../permission';
import { ModuleResponse } from '../module';

interface RoutineResponse {
    id?: number;
    descricao?: string;
    icone?: string;
    acessoNiveisPermissao?: PermissionResponse;
    cadastroModulo?: ModuleResponse;
}

export default RoutineResponse;