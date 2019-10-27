import { PermissionResponse } from '../permission';

interface ModuleResponse {
    id?: number;
    descricao?: string;
    acessoNiveisPermissao?: PermissionResponse;
}

export default ModuleResponse;