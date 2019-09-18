import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiResponseError } from '@app/api/interfaces';

@Component({
    templateUrl: './change-password.component.html',
    // styleUrls: ['./name.component.scss']
})
export class ChangePasswordComponent {
    public changePasswordForm: FormGroup;
    public changePasswordErrors: ApiResponseError[] = [];

    constructor() { }

}
