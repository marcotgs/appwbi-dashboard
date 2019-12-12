import { IsNotEmpty } from 'class-validator';
import { validationMessages } from '@api/messages';

/**
 * Classe que tipa o body da requisição de `Insert` de um nova mensagem.
 *
 * @export
 * @class MessageBody
 */
export default class MessageBody {

    @IsNotEmpty({
        message: validationMessages.default.required
    })
    
    public mensagem?: string;

    @IsNotEmpty({
        message: validationMessages.default.required
    })
    public titulo?: string;

    public idEmpresa?: number;

    @IsNotEmpty({
        message: validationMessages.default.required
    })
    public idCadastroSetores?: string;
}
