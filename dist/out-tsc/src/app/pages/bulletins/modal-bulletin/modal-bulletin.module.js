import { __decorate } from "tslib";
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalBulletinPage } from './modal-bulletin.page';
import { TranslateModule } from '@ngx-translate/core';
var ModalBulletinPageModule = /** @class */ (function () {
    function ModalBulletinPageModule() {
    }
    ModalBulletinPageModule = __decorate([
        NgModule({
            declarations: [
                ModalBulletinPage
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                SharedModule,
                ReactiveFormsModule,
                TranslateModule
            ],
            entryComponents: [
                ModalBulletinPage
            ],
            exports: [
                ModalBulletinPage
            ]
        })
    ], ModalBulletinPageModule);
    return ModalBulletinPageModule;
}());
export { ModalBulletinPageModule };
//# sourceMappingURL=modal-bulletin.module.js.map