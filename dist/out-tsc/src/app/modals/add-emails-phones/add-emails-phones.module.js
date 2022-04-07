import { __decorate } from "tslib";
import { AddEmailsPhonesComponent } from './add-emails-phones.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
var AddEmailsPhonesComponentModule = /** @class */ (function () {
    function AddEmailsPhonesComponentModule() {
    }
    AddEmailsPhonesComponentModule = __decorate([
        NgModule({
            declarations: [
                AddEmailsPhonesComponent
            ],
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                ImageCropperModule,
                TranslateModule
            ],
            entryComponents: [
                AddEmailsPhonesComponent
            ],
            exports: [
                AddEmailsPhonesComponent
            ]
        })
    ], AddEmailsPhonesComponentModule);
    return AddEmailsPhonesComponentModule;
}());
export { AddEmailsPhonesComponentModule };
//# sourceMappingURL=add-emails-phones.module.js.map