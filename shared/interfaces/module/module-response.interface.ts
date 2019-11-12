import { PermissionResponse } from '../permission';

interface ModuleResponse {
    id?: number;
    descricao?: string;
    descricaoFormatada?: string;
    icone?: string;
    acessoNiveisPermissao?: PermissionResponse;
}

export default ModuleResponse;