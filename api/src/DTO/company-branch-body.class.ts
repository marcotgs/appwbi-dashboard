import { IsNotEmpty } from 'class-validator';
import { validationMessages } from '@api/messages';

/**
 * Classe que tipa o body da requisição de `Insert` de uma nova filial.
 *
 * @export
 * @class CompanyBranchBody
 */
export default class CompanyBranchBody {
    public id?: number;

    @IsNotEmpty({
        message: validationMessages.default.required
    })
    public descricao?: string;

    @IsNotEmpty({
        message: validationMessages.default.required
    })
    public filial?: string;

    @IsNotEmpty({
        message: validationMessages.default.required
    })
    public idEmpresa?: number;
}
