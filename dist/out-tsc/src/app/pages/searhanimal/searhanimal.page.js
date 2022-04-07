import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ToastController } from '@ionic/angular';
import { UtilityProvider } from './../../providers/UtilityProvider';
import { FormBuilder, Validators } from '@angular/forms';
var SearhanimalPage = /** @class */ (function () {
    function SearhanimalPage(translate, formBuilder, http, toastCtrl, util) {
        this.translate = translate;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.util = util;
        this.IdEspecie = null;
        this.galeria = [];
        this.lastPage = 1;
        this.apiUrl = environment.SERVER_URL;
        this.postForm = formBuilder.group({
            RazaC: [null, Validators.nullValidator],
            GenderC: [null, Validators.nullValidator],
            EstatusC: [null, Validators.nullValidator],
            EspecieC: [null, Validators.nullValidator],
            id: [null, Validators.nullValidator],
        });
    }
    SearhanimalPage.prototype.ionViewDidEnter = function () {
        this.Buscarespecie();
        this.BuscarGender();
        this.BuscarSituacion();
        this.sendsearch();
    };
    SearhanimalPage.prototype.Buscarespecie = function () {
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
    SearhanimalPage.prototype.BuscarRaza = function () {
        var _this = this;
        this.Raza = [];
        this.util.GetRaza(this.IdEspecie).subscribe(function (data) {
            console.log(JSON.stringify(data));
            if (data) {
                _this.Raza = _this.util.LlenarCombo(JSON.stringify(data));
            }
            else {
                _this.presentToast(data['message']);
            }
        });
    };
    SearhanimalPage.prototype.BuscarGender = function () {
        var _this = this;
        this.Gender = [];
        this.util.GetGender().subscribe(function (data) {
            if (data) {
                _this.Gender = _this.util.LlenarCombo(JSON.stringify(data));
            }
            else {
                _this.presentToast(data['message']);
            }
        });
    };
    SearhanimalPage.prototype.BuscarSituacion = function () {
        var _this = this;
        this.Situacion = [];
        this.util.GetSituacion().subscribe(function (data) {
            if (data) {
                _this.Situacion = _this.util.LlenarCombo(JSON.stringify(data));
            }
            else {
                _this.presentToast(data['message']);
            }
        });
    };
    SearhanimalPage.prototype.CerrarEspecie = function (val) {
        this.IdEspecie = val;
        this.BuscarRaza();
    };
    SearhanimalPage.prototype.sendsearch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, request, query, post;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = new HttpHeaders();
                        request = ({ headers: headers });
                        query = {
                            id_estado: this.postForm.value.EstatusC,
                            id_raza: this.postForm.value.RazaC,
                            id_genero: this.postForm.value.GenderC,
                            id_especie: this.IdEspecie,
                        };
                        console.log(query, 'data que envio');
                        return [4 /*yield*/, this.http.post(this.apiUrl + 'searchpet' + '?json=' + JSON.stringify(query), JSON.stringify(query), request)
                                .subscribe(function (data) {
                                _this.fotoPerfil = data['data'];
                                /*this.fotoPerfil.forEach(element => {
                                     this.galeria.push(element.ultimas_fotos);
                                //console.log(this.galeria);
                                });*/
                                _this.galeria = [];
                                for (var i = 0; i < _this.fotoPerfil.length; i++) {
                                    _this.galeria.push(_this.fotoPerfil[i].ultimas_fotos);
                                }
                                console.log(_this.galeria[0]);
                            })];
                    case 1:
                        post = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Presenta un cuadro de mensaje.
    * @param {string} text Mensaje a mostrar.
    */
    SearhanimalPage.prototype.presentToast = function (text) {
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
    SearhanimalPage.prototype.doRefresh = function (event) {
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    __decorate([
        ViewChild("IdEspecie", { static: false }),
        __metadata("design:type", Object)
    ], SearhanimalPage.prototype, "selectEspecie", void 0);
    SearhanimalPage = __decorate([
        Component({
            selector: 'app-searhanimal',
            templateUrl: './searhanimal.page.html',
            styleUrls: ['./searhanimal.page.scss'],
        }),
        __metadata("design:paramtypes", [TranslateService, FormBuilder,
            HttpClient,
            ToastController,
            UtilityProvider])
    ], SearhanimalPage);
    return SearhanimalPage;
}());
export { SearhanimalPage };
//# sourceMappingURL=searhanimal.page.js.map