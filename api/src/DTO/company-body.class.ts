import { IsNotEmpty } from 'class-validator';
import { validationMessages } from '@api/messages';

/**
 * Classe que tipa o body da requisição de `Insert` de uma nova empresa.
 *
 * @export
 * @class CompanyBody
 */
export default class CompanyBody {
    public id?: number;

    @IsNotEmpty({
        message: validationMessages.default.required
    })
    public nome?: string;
}
