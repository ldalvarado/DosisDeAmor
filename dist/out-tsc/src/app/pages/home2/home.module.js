import { __decorate } from "tslib";
import { ComponentsModule } from './../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                SharedModule,
                FormsModule,
                ReactiveFormsModule,
                ComponentsModule,
                RouterModule.forChild([{ path: '', component: HomePage }]),
                TranslateModule.forChild()
            ],
            declarations: [HomePage]
        })
    ], HomePageModule);
    return HomePageModule;
}());
export { HomePageModule };
//# sourceMappingURL=home.module.js.map