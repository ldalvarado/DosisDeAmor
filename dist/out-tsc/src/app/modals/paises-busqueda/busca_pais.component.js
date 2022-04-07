import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ApiService } from './../../providers/providers';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UtilityProvider } from '../../providers/UtilityProvider';
var Busca_pais = /** @class */ (function () {
    function Busca_pais(api, modalCtrl, navParams, toastCtrl, translate, util) {
        this.api = api;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.util = util;
    }
    Busca_pais.prototype.ionViewWillEnter = function () {
        this.BuscarCodigos();
    };
    Busca_pais.prototype.BuscarCodigos = function () {
        var _this = this;
        this.util.GetCombo().subscribe(function (data) {
            //console.log(JSON.stringify(data));
            if (data) {
                _this.Codigo = JSON.stringify(data);
                console.log(_this.Codigo);
            }
        });
    };
    /**
     * Cierra el modal.
     */
    Busca_pais.prototype.dismiss = function (result) {
        if (result === void 0) { result = []; }
        this.modalCtrl.dismiss(result);
    };
    Busca_pais = __decorate([
        Component({
            selector: 'app-busca_pais',
            templateUrl: 'busca_pais.html',
            styleUrls: ['busca_pais.component.scss']
        }),
        __metadata("design:paramtypes", [ApiService,
            ModalController,
            NavParams,
            ToastController,
            TranslateService,
            UtilityProvider])
    ], Busca_pais);
    return Busca_pais;
}());
export { Busca_pais };
//# sourceMappingURL=busca_pais.component.js.map