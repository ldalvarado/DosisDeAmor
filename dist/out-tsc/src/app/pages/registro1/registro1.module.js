import { __decorate } from "tslib";
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Registro1Page } from './registro1.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
var routes = [
    {
        path: '',
        component: Registro1Page
    }
];
var Registro1PageModule = /** @class */ (function () {
    function Registro1PageModule() {
    }
    Registro1PageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                SharedModule,
                TranslateModule,
                IonicModule,
                ComponentsModule,
                RouterModule.forChild(routes)
            ],
            declarations: [Registro1Page]
        })
    ], Registro1PageModule);
    return Registro1PageModule;
}());
export { Registro1PageModule };
//# sourceMappingURL=registro1.module.js.map