import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CoreModule } from '../../../core/core.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { ResumoMainComponent } from './resumo-main.component';
import { ResumoMainRoutingModule } from './resumo-main-routing.module';

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    CardModule,
    SharedModule,
    DropdownModule,
    ButtonModule,
    CoreModule,
    ResumoMainRoutingModule,
    ProgressSpinnerModule
  ],
  declarations: [ResumoMainComponent],
  exports: [ResumoMainComponent],
  providers: [ConfirmationService, MessageService]
})
export class ResumoMainModule { }
