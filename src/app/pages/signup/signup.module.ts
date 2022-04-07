import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupPage } from './signup.page';
import { Busca_paisComponentModule } from './../../modals/paises-busqueda/busca_pais.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    Busca_paisComponentModule,
    RouterModule.forChild([{ path: '', component: SignupPage }]),
    TranslateModule
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
