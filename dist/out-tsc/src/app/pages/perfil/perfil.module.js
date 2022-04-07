import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PerfilPage } from './perfil.page';
var routes = [
    {
        path: '',
        component: PerfilPage
    }
];
var PerfilPageModule = /** @class */ (function () {
    function PerfilPageModule() {
    }
    PerfilPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PerfilPage]
        })
    ], PerfilPageModule);
    return PerfilPageModule;
}());
export { PerfilPageModule };
//# sourceMappingURL=perfil.module.js.map