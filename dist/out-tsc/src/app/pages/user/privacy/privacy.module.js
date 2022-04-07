import { __decorate } from "tslib";
import { AddEmailsPhonesComponentModule } from './../../../modals/add-emails-phones/add-emails-phones.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PrivacyPage } from './privacy.page';
import { TranslateModule } from '@ngx-translate/core';
var routes = [
    {
        path: '',
        component: PrivacyPage
    }
];
var PrivacyPageModule = /** @class */ (function () {
    function PrivacyPageModule() {
    }
    PrivacyPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                TranslateModule,
                RouterModule.forChild(routes),
                AddEmailsPhonesComponentModule
            ],
            declarations: [PrivacyPage]
        })
    ], PrivacyPageModule);
    return PrivacyPageModule;
}());
export { PrivacyPageModule };
//# sourceMappingURL=privacy.module.js.map