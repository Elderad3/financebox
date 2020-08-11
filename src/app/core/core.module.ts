import { PageContainerComponent } from './components/page-container/page-container.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MenuContextComponent } from './components/menu-context/menu-context.component';
import { RouterModule } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, SettingsComponent, MenuContextComponent, PageContainerComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule
  ],
  exports: [
    FormsModule,
    RouterModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    MenuContextComponent,
    PageContainerComponent]
})
export class CoreModule { }
