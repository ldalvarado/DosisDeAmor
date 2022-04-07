import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UtilityProvider } from './../../providers/UtilityProvider';
import { NotificationsComponent } from './../../notifications/notifications.component';
import { PopoverController, } from '@ionic/angular';
var TabsPage = /** @class */ (function () {
    function TabsPage(router, http, util, popoverCtrl) {
        this.router = router;
        this.http = http;
        this.util = util;
        this.popoverCtrl = popoverCtrl;
        this.isReadyToLogin = false;
        this.token = window.localStorage['token'];
        this.token_inv = window.localStorage['token_inv'];
        this.usuario = window.localStorage['usuario'];
        this.usuario_id = window.localStorage['usuario_id'];
        this.apiUrl = environment.SERVER_URL;
        console.log(this.token_inv);
        if (this.token) {
            this.isReadyToLogin = true;
            this.mascotas(this.usuario_id);
            console.log(this.usuario_id, 'desde el tabs');
        }
        else if (this.token_inv) {
            this.mascotas(105);
            this.router.navigate(['/animal/search']);
        }
        else {
            this.router.navigate(['/login']);
        }
    }
    TabsPage.prototype.ionViewWillEnter = function () {
        this.NombreM = window.localStorage['Nombre'];
        this.idMascota = window.localStorage['IdMascota'];
        this.usuario_id = window.localStorage['usuario_id'];
    };
    TabsPage.prototype.mascotas = function (id) {
        var _this = this;
        this.http.get(this.apiUrl + 'pets/' + id)
            .subscribe(function (data) {
            console.log(data, 'desde listar mascota');
            window.localStorage['mascota'] = data;
            window.localStorage['IdMascota'] = data[0]['Id'];
            window.localStorage['Nombre'] = data[0]['Nombre'];
            _this.NombreM = window.localStorage['Nombre'];
            _this.idMascota = window.localStorage['IdMascota'];
            _this.mascota = window.localStorage['Nombre'];
            if (data) {
                _this.fotoPerfil = _this.BuscaFotoPerfil(_this.idMascota);
            }
        });
    };
    TabsPage.prototype.BuscaFotoPerfil = function (idM) {
        var _this = this;
        console.log(idM, 'data de buscar foto perfil');
        this.http.get(this.apiUrl + 'getPhotos/' + idM + '/1')
            .subscribe(function (data) {
            window.localStorage['fotoPerfil'] = data[0].url;
            _this.fotoPerfil = window.localStorage['fotoPerfil'];
        });
    };
    TabsPage.prototype.ngOnInit = function () { };
    TabsPage.prototype.notifications = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: NotificationsComponent,
                            event: ev,
                            animated: true,
                            showBackdrop: true
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TabsPage.prototype.DismissClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.dismiss()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TabsPage = __decorate([
        Component({
            selector: 'app-tabs',
            templateUrl: './tabs.page.html',
            styleUrls: ['./tabs.page.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            HttpClient,
            UtilityProvider,
            PopoverController])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.page.js.map