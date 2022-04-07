import { __decorate } from "tslib";
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { TabsPage } from './tabs.page';
var routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
            { path: 'search', loadChildren: '../searhanimal/searhanimal.module#SearhanimalPageModule' },
            { path: 'notification', loadChildren: '../notificaciones/notificacion.module#NotificacionPageModule' },
            { path: 'perfil', loadChildren: '../perfil/perfil.module#PerfilPageModule' }
        ]
    }
];
var TabsPageModule = /** @class */ (function () {
    function TabsPageModule() {
    }
    TabsPageModule = __decorate([
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
            declarations: [TabsPage]
        })
    ], TabsPageModule);
    return TabsPageModule;
}());
export { TabsPageModule };
//# sourceMappingURL=tabs.module.js.map