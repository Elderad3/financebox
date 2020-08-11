import { SharedModule } from './../../../shared/shared.module';
import { TransacaoMainRoutingModule } from './transacao-main-routing.module';
import { TransacaoMainComponent } from './transacao-main.component';

import { CommonModule } from '@angular/common';
import { CoreModule } from './../../../core/core.module';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileUploadModule } from 'primeng/fileupload';



@NgModule({
  declarations: [TransacaoMainComponent],
  imports: [
    CommonModule, TransacaoMainRoutingModule, CoreModule, SharedModule,
    ButtonModule, TableModule, DialogModule, ConfirmDialogModule, InputTextModule,
    ToastModule, DropdownModule, TooltipModule, ToggleButtonModule, ProgressSpinnerModule, FileUploadModule],
  exports: [TransacaoMainComponent],
  providers: [ConfirmationService, MessageService]
})
export class TransacaoMainModule { }
