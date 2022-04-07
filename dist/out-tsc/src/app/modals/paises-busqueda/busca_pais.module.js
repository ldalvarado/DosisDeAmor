import { __decorate } from "tslib";
import { Busca_pais } from './busca_pais.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
var Busca_paisComponentModule = /** @class */ (function () {
    function Busca_paisComponentModule() {
    }
    Busca_paisComponentModule = __decorate([
        NgModule({
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
    ], Busca_paisComponentModule);
    return Busca_paisComponentModule;
}());
export { Busca_paisComponentModule };
//# sourceMappingURL=busca_pais.module.js.map