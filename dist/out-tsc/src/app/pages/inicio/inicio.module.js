import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioPage } from './inicio.page';
import { TranslateModule } from '@ngx-translate/core';
var InicioPageModule = /** @class */ (function () {
    function InicioPageModule() {
    }
    InicioPageModule = __decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                SharedModule,
                FormsModule,
                ReactiveFormsModule,
                RouterModule.forChild([{ path: '', component: InicioPage }]),
                TranslateModule.forChild()
            ],
            declarations: [InicioPage]
        })
    ], InicioPageModule);
    return InicioPageModule;
}());
export { InicioPageModule };
//# sourceMappingURL=inicio.module.js.map