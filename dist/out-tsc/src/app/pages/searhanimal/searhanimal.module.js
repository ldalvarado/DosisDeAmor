import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SearhanimalPage } from './searhanimal.page';
var routes = [
    {
        path: '',
        component: SearhanimalPage
    }
];
var SearhanimalPageModule = /** @class */ (function () {
    function SearhanimalPageModule() {
    }
    SearhanimalPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SearhanimalPage]
        })
    ], SearhanimalPageModule);
    return SearhanimalPageModule;
}());
export { SearhanimalPageModule };
//# sourceMappingURL=searhanimal.module.js.map