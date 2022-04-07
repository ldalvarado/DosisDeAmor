import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NotificacionPage } from './notificacion.page';
var routes = [
    {
        path: '',
        component: NotificacionPage
    }
];
var NotificacionPageModule = /** @class */ (function () {
    function NotificacionPageModule() {
    }
    NotificacionPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [NotificacionPage]
        })
    ], NotificacionPageModule);
    return NotificacionPageModule;
}());
export { NotificacionPageModule };
//# sourceMappingURL=notificacion.module.js.map