import { __decorate } from "tslib";
import { ComponentsModule } from '../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainPage } from './main.page';
var MainPageModule = /** @class */ (function () {
    function MainPageModule() {
    }
    MainPageModule = __decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                ComponentsModule,
                RouterModule.forChild([{ path: '', component: MainPage }])
            ],
            declarations: [MainPage]
        })
    ], MainPageModule);
    return MainPageModule;
}());
export { MainPageModule };
//# sourceMappingURL=main.module.js.map