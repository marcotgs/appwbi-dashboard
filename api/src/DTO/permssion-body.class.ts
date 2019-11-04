import { IsNotEmpty } from 'class-validator';
import { validationMessages } from '@api/messages';

/**
 * Classe que tipa o body da requisição de `Insert` de um nova permissão.
 *
 * @export
 * @class PermissionBody
 */
export default class PermissionBody {
    public id?: number;

    @IsNotEmpty({
        message: validationMessages.default.required
    })
    public descricao?: string;
}
