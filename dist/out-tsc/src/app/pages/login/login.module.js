import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { TranslateModule } from '@ngx-translate/core';
var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                SharedModule,
                FormsModule,
                ReactiveFormsModule,
                RouterModule.forChild([{ path: '', component: LoginPage }]),
                TranslateModule.forChild()
            ],
            declarations: [LoginPage]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());
export { LoginPageModule };
//# sourceMappingURL=login.module.js.map