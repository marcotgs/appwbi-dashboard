import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiResponseError, CompanyResponse, SegmentResponse } from '@shared/interfaces';
import { conformToMask } from 'text-mask-core';
import MasksConstants from '@app/constants/mask/mask.contants';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { postCompany, CompanyState, getCompanyState, getSegments } from '@app/store/company';

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
    @ViewChild('instance', { static: true }) instance;
    public cepSpinner = 'cepSpinner';
    public saveSpinner = 'saveSpinner';
    public isCepSpinnerShow = false;
    public focusSegment$ = new Subject<string>();
    public clickSegment$ = new Subject<string>();
    public form: FormGroup;
    public formErrors: ApiResponseError[] | string[] = [];
    public cepMask = MasksConstants.CEP;
    public telMask = MasksConstants.TEL;
    public segments: SegmentResponse[] = [];
    private codigoCompletoCidadeIbge = null;
    private isRequestingSegments: boolean = false;

    constructor(
        private spinner: NgxSpinnerService,
        private notifierService: NotifierService,
        private http: HttpClient,
        private storeCompany: Store<CompanyState>,
    ) { }

    ngOnInit(): void {
        this.initForm();
        this.storeCompany.select(getCompanyState)
            .subscribe(async (data) => {
                if (data.segments) {
                    this.isRequestingSegments = false;
                    this.segments = data.segments;
                } else if (!this.isRequestingSegments) {
                    this.isRequestingSegments = true;
                    this.storeCompany.dispatch(getSegments());
                }
            });
    }

    ngOnDestroy(): void {
        this.spinner.hide(this.cepSpinner);
        this.spinner.hide(this.saveSpinner);    
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

    public async getAddressData() {
        await this.spinner.show(this.cepSpinner);
        this.isCepSpinnerShow = true;
        const cep = this.form.get('cep').value.replace('-', '');
        this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
            .subscribe(async (response: any) => {
                if (response.erro) {
                    await this.spinner.hide(this.cepSpinner);
                    this.isCepSpinnerShow = false;
                    this.notifierService.notify('error', 'Erro ao buscar endereço!');
                }
                await this.spinner.hide(this.cepSpinner);
                this.isCepSpinnerShow = false;
                this.form.get('endereco').setValue(response.logradouro);
                this.form.get('cidade').setValue(response.localidade);
                this.form.get('estado').setValue(response.uf);
                this.form.get('bairro').setValue(response.bairro);
                this.codigoCompletoCidadeIbge = response.ibge;
            }, async () => {
                await this.spinner.hide(this.cepSpinner);
                this.isCepSpinnerShow = false;
                this.notifierService.notify('error', 'Erro ao buscar endereço!');
            });
    }

    public search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(
            debounceTime(200),
            distinctUntilChanged()
        );
        const inputFocus$ = this.focusSegment$;

        return merge(debouncedText$, inputFocus$).pipe(
            map(term => (term === '' ? this.segments.map(v => v.nome) :
                this.segments.map(v => v.nome).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
        // tslint:disable-next-line:semicolon
    }

    public async formSubmit(): Promise<void> {
        this.markFormFieldsAsTouched();
        if (this.form.valid) {
            this.form.disable();
            await this.spinner.show(this.saveSpinner);
            const [ddd, telefone] = this.form.get('telefone').value.split(' ');
            const payload = {
                ...this.form.value,
                ddd: ddd.replace(/\(|\)/gi, ''),
                telefone: telefone.replace(/\-/gi, ''),
                cgc: this.form.get('cgc').value.replace(/(-|\/|\.)/gi, ''),
                cep: this.form.get('cep').value.replace(/-/gi, ''),
                codigoCompletoCidadeIbge: this.codigoCompletoCidadeIbge,
                idSegmento: this.segments.find(p => p.nome === this.form.get('segment').value).id
            }
            if (this.isEditing) {
                payload.id = this.companyData.id;
            }
            this.storeCompany.dispatch(postCompany(payload));
        }
    }

    private markFormFieldsAsTouched(): void {
        Object.keys(this.form.controls).forEach(field => {
            const control = this.form.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    }

    private initForm(): void {
        this.form = new FormGroup({
            codEmpresa: new FormControl(this.companyData.cod_empresa, {
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
            segment: new FormControl(this.companyData.segmento.nome, {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
            ativo: new FormControl((this.companyData.ativo || true), {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
        });
    }
}
