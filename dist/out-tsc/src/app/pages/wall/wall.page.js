import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilityProvider } from '../../providers/UtilityProvider';
import { environment } from './../../../environments/environment';
import { ToastController } from '@ionic/angular';
var WallPage = /** @class */ (function () {
    function WallPage(router, formBuilder, http, toastCtrl, util) {
        var _this = this;
        this.router = router;
        this.formBuilder = formBuilder;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.util = util;
        this.isReadyToSend2 = false;
        this.apiUrl = environment.SERVER_URL;
        this.postForm2 = formBuilder.group({
            especie: ['', [Validators.required]]
        });
        this.postForm2.valueChanges.subscribe(function (v) {
            _this.isReadyToSend2 = _this.postForm2.valid;
        });
        this.Buscarespecie();
    }
    WallPage.prototype.Buscarespecie = function () {
        var _this = this;
        this.Especie = [];
        this.util.GetEspecie().subscribe(function (data) {
            if (data) {
                _this.Especie = _this.util.LlenarCombo(JSON.stringify(data));
            }
            else {
                _this.presentToast(data['message']);
            }
        });
    };
    WallPage.prototype.sendPost2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = { especie: this.postForm2.value.especie };
                window.localStorage['id_especie'] = JSON.stringify(query.especie);
                this.router.navigate(['/registro1']);
                return [2 /*return*/];
            });
        });
    };
    WallPage.prototype.presentToast = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: text,
                            duration: 3000,
                            position: 'bottom'
                        })];
                    case 1:
                        toast = _a.sent();
                        return [4 /*yield*/, toast.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Refresca la página.
     * @param event
     */
    WallPage.prototype.doRefresh = function (event) {
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    WallPage = __decorate([
        Component({
            selector: 'app-wall',
            templateUrl: './wall.page.html',
            styleUrls: ['./wall.page.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            FormBuilder,
            HttpClient,
            ToastController,
            UtilityProvider])
    ], WallPage);
    return WallPage;
}());
export { WallPage };
//# sourceMappingURL=wall.page.js.map