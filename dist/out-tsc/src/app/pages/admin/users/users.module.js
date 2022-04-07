import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { UsersPage } from './users.page';
var UsersPageModule = /** @class */ (function () {
    function UsersPageModule() {
    }
    UsersPageModule = __decorate([
        NgModule({
            declarations: [
                UsersPage,
            ],
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                RouterModule.forChild([{ path: '', component: UsersPage }]),
                TranslateModule.forChild(),
                ComponentsModule
            ]
        })
    ], UsersPageModule);
    return UsersPageModule;
}());
export { UsersPageModule };
//# sourceMappingURL=users.module.js.map