import { PermissionResponse } from '../permission';

interface ModuleResponse {
    id?: number;
    descricao?: string;
    descricaoFormatada?: string;
    icone?: string;
    podeDeletar?: boolean;
    acessoNiveisPermissao?: PermissionResponse;
}

export default ModuleResponse;