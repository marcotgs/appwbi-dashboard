interface MenuPermissionsResponse {
    descricao?: string;
    icone?: string;
    id?: number;
    cadastroRotinas?: routinesPermissionsResponse[];
}

interface routinesPermissionsResponse {
    descricao?: string;
    icone?: string;
    id?: number;
    cadastroProcessos?: processesPermissionsResponse[];
}

interface processesPermissionsResponse {
    descricao?: string;
    icone?: string;
    id?: number;
    funcao?: string;
}

export default MenuPermissionsResponse;