import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable, merge } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { UserState, getUserState } from '@app/store/user';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { SectorResponse, MessageBody } from '@shared/interfaces';
import { SectorState } from '@app/store/states';
import { distinctUntilChanged, debounceTime, map, first } from 'rxjs/operators';
import { getSector, getSectorState } from '@app/store/sector';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '@app/api/services';

@Component({
    selector: 'app-form-push',
    templateUrl: './push.component.html',
    // styleUrls: ['./conta-usuario.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FormPushComponent {
    @ViewChild('instance', { static: true }) instance;
    public form: FormGroup;
    public initialSpinner = 'initialSpinner';
    public focusSector$ = new Subject<string>();
    public clickSector$ = new Subject<string>();
    private sectors: SectorResponse[] = [];
    private isMessagePublic: boolean = false;
    private idEmpresa: number;

    constructor(
        private spinner: NgxSpinnerService,
        private storeSector: Store<SectorState>,
        private storeUser: Store<UserState>,
        private messageService: MessageService,
        private notifierService: NotifierService,
        route: ActivatedRoute,
    ) {
        this.isMessagePublic = !!(route.snapshot.paramMap.get('publica'));
    }

    ngOnInit(): void {
        this.getSectores();
        this.storeSector.select(getSectorState)
            .subscribe((data) => {
                if (data.sectors) {
                    this.initForm();
                    this.spinner.hide(this.initialSpinner);
                    this.sectors = data.sectors;
                }
            });
    }

    ngOnDestroy(): void {

    }

    public async formSubmit(): Promise<void> {
        this.markFormFieldsAsTouched();
        if (this.form.valid) {
            this.form.disable();
            await this.spinner.show();
            const payload: MessageBody = {
                ...this.form.value,
            }
            if (!this.isMessagePublic) {
                payload.idEmpresa = this.idEmpresa;
                if (this.form.get('sector').value)
                    payload.idCadastroSetores = this.sectors.find(p => p.descricao === this.form.get('sector').value).id;
            }
            delete (payload as any).sector;
            this.postMessage(payload);
        }
    }

    private postMessage(body: MessageBody): void {
        this.messageService.postMessage(body)
            .subscribe(() => {
                this.notifierService.notify('success', 'Sua mensagem será enviada em alguns minutos!');
                this.form.reset();
            }, (err) => {
                this.notifierService.notify('error', 'Erro ao enviar mensagem!');
            }, async () => {
                this.form.enable();
                await this.spinner.hide();
            });
    }

    private getSectores() {
        this.storeUser.select(getUserState)
            .pipe(first())
            .subscribe((user) => {
                this.spinner.show(this.initialSpinner);
                this.idEmpresa = user.currentUser.idEmpresa;
                this.storeSector.dispatch(getSector({ companyId: user.currentUser.idEmpresa }));
            });
    }

    public getMessagesError(controlName: string): any {
        return (validationMessages[controlName] || validationMessages['default']);
    }

    public searchSector = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(
            debounceTime(200),
            distinctUntilChanged()
        );
        const inputFocus$ = this.focusSector$;

        return merge(debouncedText$, inputFocus$).pipe(
            map(term => (term === '' ? this.sectors.map(v => v.descricao) :
                this.sectors.map(v => v.descricao).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
        // tslint:disable-next-line:semicolon
    }

    private markFormFieldsAsTouched(): void {
        Object.keys(this.form.controls).forEach(field => {
            const control = this.form.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    }

    private initForm(): void {
        this.form = new FormGroup({
            mensagem: new FormControl('', {
                validators: Validators.required,
            }),
            titulo: new FormControl('', {
                validators: Validators.required,
            }),
            sector: new FormControl(''),
        });
    }

}
