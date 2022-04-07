import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TutorialPage } from './tutorial.page';
import { TranslateModule } from '@ngx-translate/core';
var TutorialPageModule = /** @class */ (function () {
    function TutorialPageModule() {
    }
    TutorialPageModule = __decorate([
        NgModule({
            declarations: [
                TutorialPage,
            ],
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                RouterModule.forChild([{ path: '', component: TutorialPage }]),
                TranslateModule.forChild()
            ]
        })
    ], TutorialPageModule);
    return TutorialPageModule;
}());
export { TutorialPageModule };
//# sourceMappingURL=tutorial.module.js.map