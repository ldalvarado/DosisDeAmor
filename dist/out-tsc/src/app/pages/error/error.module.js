import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ErrorPage } from './error.page';
import { TranslateModule } from '@ngx-translate/core';
var routes = [
    {
        path: '',
        component: ErrorPage
    }
];
var ErrorPageModule = /** @class */ (function () {
    function ErrorPageModule() {
    }
    ErrorPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                TranslateModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ErrorPage]
        })
    ], ErrorPageModule);
    return ErrorPageModule;
}());
export { ErrorPageModule };
//# sourceMappingURL=error.module.js.map