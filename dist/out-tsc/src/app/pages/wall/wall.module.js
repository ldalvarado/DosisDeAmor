import { __decorate } from "tslib";
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WallPage } from './wall.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
var routes = [
    {
        path: '',
        component: WallPage
    }
];
var WallPageModule = /** @class */ (function () {
    function WallPageModule() {
    }
    WallPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                SharedModule,
                TranslateModule,
                IonicModule,
                ComponentsModule,
                RouterModule.forChild(routes)
            ],
            declarations: [WallPage]
        })
    ], WallPageModule);
    return WallPageModule;
}());
export { WallPageModule };
//# sourceMappingURL=wall.module.js.map