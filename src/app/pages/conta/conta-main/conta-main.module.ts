import { SharedModule } from './../../../shared/shared.module';
import { ContaMainRoutingModule } from './conta-main-routing.module';
import { ContaMainComponent } from './conta-main.component';

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



@NgModule({
  declarations: [ContaMainComponent],
  imports: [CommonModule, ContaMainRoutingModule, CoreModule, SharedModule, ButtonModule, TableModule, DialogModule, ConfirmDialogModule, InputTextModule, ToastModule, DropdownModule],
  exports: [ContaMainComponent],
  providers: [ConfirmationService, MessageService]
})
export class ContaMainModule { }
