import { Busca_pais } from './busca_pais.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    Busca_pais
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ImageCropperModule,
    TranslateModule
  ],
  entryComponents: [
    Busca_pais
  ],
  exports: [
    Busca_pais
  ]
})
export class Busca_paisComponentModule {}
