import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MercadopagoComponent } from './mercadopago.component';
var MercadopagoComponentModule = /** @class */ (function () {
    function MercadopagoComponentModule() {
    }
    MercadopagoComponentModule = __decorate([
        NgModule({
            declarations: [MercadopagoComponent],
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                TranslateModule
            ],
            entryComponents: [
                MercadopagoComponent
            ],
            exports: [
                MercadopagoComponent
            ]
        })
    ], MercadopagoComponentModule);
    return MercadopagoComponentModule;
}());
export { MercadopagoComponentModule };
//# sourceMappingURL=mercadopago.module.js.map