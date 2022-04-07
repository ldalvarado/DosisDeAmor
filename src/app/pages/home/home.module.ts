import { ComponentsModule } from './../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
import { SugerenciasComponentModule } from './../../modals/sugerencias/sugerencias.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SugerenciasComponentModule,
    RouterModule.forChild([{ path: '', component: HomePage }]),
    TranslateModule.forChild()
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
