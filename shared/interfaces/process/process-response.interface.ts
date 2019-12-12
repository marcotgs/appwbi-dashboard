import { PermissionResponse } from '../permission';
import { RoutineResponse } from '../routine';
import { ModuleResponse } from '../module';

interface ProcessResponse {
    id?: number;
    descricao?: string;
    descricaoFormatada?: string;
    icone?: string;
    funcao?: string;
    acessoNiveisPermissao?: PermissionResponse;
    cadastroRotina?: RoutineResponse;
    cadastroModulo?: ModuleResponse;
}

export default ProcessResponse;