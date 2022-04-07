import { __decorate } from "tslib";
import { MapComponent } from './map.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
var MapComponentModule = /** @class */ (function () {
    function MapComponentModule() {
    }
    MapComponentModule = __decorate([
        NgModule({
            declarations: [
                MapComponent
            ],
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                ImageCropperModule,
                TranslateModule
            ],
            entryComponents: [
                MapComponent
            ],
            exports: [
                MapComponent
            ]
        })
    ], MapComponentModule);
    return MapComponentModule;
}());
export { MapComponentModule };
//# sourceMappingURL=map.module.js.map