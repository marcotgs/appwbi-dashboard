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
    public codEmpresa?: string;
    public razao?: string;
    public email?: string;
    public ddd?: string;
    public telefone?: string;
    public endereco?: string;
    public numero?: number;
    public complemento?: string;
    public bairro?: string;
    public cep?: string;
    public cidade?: string;
    public estado?: string;
    public codigoCompletoCidadeIbge?: number;
    public idSegmento?: number;
    public cgc?: string;
    public ativo?: boolean;
}
