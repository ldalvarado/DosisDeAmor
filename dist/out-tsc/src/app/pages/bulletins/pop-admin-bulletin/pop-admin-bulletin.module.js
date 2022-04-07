import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { PopAdminBulletin } from './pop-admin-bulletin';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
var PopAdminBulletinModule = /** @class */ (function () {
    function PopAdminBulletinModule() {
    }
    PopAdminBulletinModule = __decorate([
        NgModule({
            declarations: [
                PopAdminBulletin,
            ],
            imports: [
                IonicModule,
                TranslateModule.forChild()
            ],
            entryComponents: [
                PopAdminBulletin
            ],
            exports: [
                PopAdminBulletin
            ]
        })
    ], PopAdminBulletinModule);
    return PopAdminBulletinModule;
}());
export { PopAdminBulletinModule };
//# sourceMappingURL=pop-admin-bulletin.module.js.map