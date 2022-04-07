import { __decorate } from "tslib";
import { PopAdminBulletinModule } from './pop-admin-bulletin/pop-admin-bulletin.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BulletinsPage } from './bulletins.page';
import { ModalBulletinPageModule } from './modal-bulletin/modal-bulletin.module';
var routes = [
    {
        path: '',
        component: BulletinsPage
    }
];
var BulletinsPageModule = /** @class */ (function () {
    function BulletinsPageModule() {
    }
    BulletinsPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ModalBulletinPageModule,
                PopAdminBulletinModule
            ],
            declarations: [BulletinsPage]
        })
    ], BulletinsPageModule);
    return BulletinsPageModule;
}());
export { BulletinsPageModule };
//# sourceMappingURL=bulletins.module.js.map