import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MailSearchPipe } from './mail-search.pipe';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MailSearchPipe
    ],
    exports: [
        MailSearchPipe
    ]
})
export class PipesModule { }
