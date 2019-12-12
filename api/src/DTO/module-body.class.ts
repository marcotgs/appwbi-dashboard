import { IsNotEmpty } from 'class-validator';
import { validationMessages } from '@api/messages';

/**
 * Classe que tipa o body da requisição de `Insert` de um novo modulo.
 *
 * @export
 * @class ModuleBody
 */
export default class ModuleBody {
    public id?: number;

    @IsNotEmpty({
        message: validationMessages.default.required
    })
    public descricao?: string;

    @IsNotEmpty({
        message: validationMessages.default.required
    })
    public icone?: string;

    @IsNotEmpty({
        message: validationMessages.default.required
    })
    public idAcessoNiveisPermissao?: number;
}
