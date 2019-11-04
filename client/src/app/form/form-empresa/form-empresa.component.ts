import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiResponseError, CompanyResponse } from '@shared/interfaces';
import { conformToMask } from 'text-mask-core';
import MasksConstants from '@app/constants/mask/mask.contants';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import validationMessages from '@app/constants/form-validation/form-validation.constants';

@Component({
    selector: 'app-form-empresa',
    templateUrl: './form-empresa.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class FormEmpresaComponent implements OnInit {
    @Input('companyData') public companyData: CompanyResponse;
    @Input('modal') public modal: NgbActiveModal;
    @Input('isEditing') public isEditing: boolean;
    @Input('isCreating') public isCreating: boolean;
    public form: FormGroup;
    public formErrors: ApiResponseError[] | string[] = [];
    public cepMask = MasksConstants.CEP;
    public telMask = MasksConstants.TEL;

    constructor() { }

    ngOnInit(): void {
        this.initForm();
    }

    public getMessagesError(controlName: string): any {
        return (validationMessages[controlName] || validationMessages['default']);
    }

    public getMaskCgc(rawValue: string): (string | RegExp)[] {
        if (rawValue.replace(/(-|\/|\.)/gi, '').length > 11) {
            return MasksConstants.CNPJ;
        }
        return MasksConstants.CPF;
    }

    private markFormFieldsAsTouched(): void {
        Object.keys(this.form.controls).forEach(field => {
            const control = this.form.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    }

    private initForm(): void {
        this.form = new FormGroup({
            cod_empresa: new FormControl(this.companyData.cod_empresa, {
                validators: Validators.required,
            }),
            nome: new FormControl(this.companyData.nome, {
                validators: Validators.required,
            }),
            razao: new FormControl(this.companyData.razao, {
                validators: Validators.required,
            }),
            email: new FormControl(this.companyData.email, {
                validators: Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
                ]),
            }),
            telefone: new FormControl(this.companyData.telefone, {
                validators: Validators.compose([
                    Validators.required,
                    Validators.pattern('[(]?[1-9]{2}[)]? [9]{0,1}[6-9]{1}[0-9]{3}[-]?[0-9]{4}')
                ]),
            }),
            cgc: new FormControl(this.companyData.cgc, {
                validators: Validators.compose([
                    Validators.required,
                    Validators.pattern('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})')
                ]),
            }),
            cep: new FormControl(conformToMask(this.companyData.cep, this.cepMask, { guide: false }).conformedValue, {
                validators: Validators.compose([
                    Validators.required,
                    Validators.pattern('^\\d{5}[-]\\d{3}$')
                ]),
            }),
            endereco: new FormControl({ value: this.companyData.endereco, disabled: true }, {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
            numero: new FormControl(this.companyData.numero, {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
            complemento: new FormControl(this.companyData.complemento),
            bairro: new FormControl({ value: this.companyData.bairro, disabled: true }, {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
            cidade: new FormControl({ value: this.companyData.cidade, disabled: true }, {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
            estado: new FormControl({ value: this.companyData.estado, disabled: true }, {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
            ativo: new FormControl(this.companyData.ativo, {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
        });
    }
}
