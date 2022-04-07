import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PoliticsPage } from './politics.page';
var PoliticsPageModule = /** @class */ (function () {
    function PoliticsPageModule() {
    }
    PoliticsPageModule = __decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                RouterModule.forChild([{ path: '', component: PoliticsPage }]),
                TranslateModule,
                ComponentsModule
            ],
            declarations: [PoliticsPage]
        })
    ], PoliticsPageModule);
    return PoliticsPageModule;
}());
export { PoliticsPageModule };
//# sourceMappingURL=politics.module.js.map