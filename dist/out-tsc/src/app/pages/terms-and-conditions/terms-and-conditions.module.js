import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { TermsAndConditionsPage } from './terms-and-conditions.page';
var TermsAndConditionsPageModule = /** @class */ (function () {
    function TermsAndConditionsPageModule() {
    }
    TermsAndConditionsPageModule = __decorate([
        NgModule({
            declarations: [
                TermsAndConditionsPage,
            ],
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                ComponentsModule,
                RouterModule.forChild([{ path: '', component: TermsAndConditionsPage }]),
                TranslateModule.forChild()
            ]
        })
    ], TermsAndConditionsPageModule);
    return TermsAndConditionsPageModule;
}());
export { TermsAndConditionsPageModule };
//# sourceMappingURL=terms-and-conditions.module.js.map