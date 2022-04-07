import { __decorate } from "tslib";
import { ImageCropperModule } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CropImgComponent } from './crop-img.component';
var CropImgComponentModule = /** @class */ (function () {
    function CropImgComponentModule() {
    }
    CropImgComponentModule = __decorate([
        NgModule({
            declarations: [
                CropImgComponent
            ],
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                ImageCropperModule,
                TranslateModule
            ],
            entryComponents: [
                CropImgComponent
            ],
            exports: [
                CropImgComponent
            ]
        })
    ], CropImgComponentModule);
    return CropImgComponentModule;
}());
export { CropImgComponentModule };
//# sourceMappingURL=crop-img.module.js.map