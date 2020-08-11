import { DialogMensageComponent } from './components/dialog-mensage/dialog-mensage.component';
import { MensagensComponent } from './components/mensagens/mensagens.component';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';



registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MessageModule,
    MessagesModule,
    DialogModule,
    ButtonModule
  ],
  declarations: [
    MensagensComponent, DialogMensageComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MessageModule,
    MessagesModule,
    MensagensComponent,
    DialogMensageComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }]
})
export class SharedModule { }