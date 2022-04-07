import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { ApiService, StorageService } from './../../../providers/providers';
import { TranslateService } from '@ngx-translate/core';
/**
 * Maneja la vista para administrar una cuenta de usuario.
 * @author <a href="mailto:jlozoya1995@gmail.com">Juan Lozoya</a>
 */
var AccountPage = /** @class */ (function () {
    function AccountPage(toastCtrl, storage, api, translate, alertCtrl, route, router) {
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.api = api;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.route = route;
        this.router = router;
        this.isSelf = false;
        this.file = {
            url: './assets/imgs/avatar.png',
            alt: 'avatar.png'
        };
        this.hasLinked = {
            google: false,
            facebook: false
        };
        this.setUser();
    }
    /**
     * Se ejecuta después del constructor.
     */
    AccountPage.prototype.ngOnInit = function () {
    };
    /**
     * Refresca la página.
     * @param event
     */
    AccountPage.prototype.doRefresh = function (event) {
        this.setUser().then(function () {
            event.target.complete();
        });
    };
    /**
     * Establece los datos del usuario.
     */
    AccountPage.prototype.setUser = function () {
        var _this = this;
        return new Promise(function (result) {
            _this.storage.getUser().then(function (user) {
                _this.route.params.subscribe(function (params) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!(user && params.user_id && !isNaN(params.user_id) && params.user_id !== user.id)) return [3 /*break*/, 2];
                                this.isSelf = false;
                                _a = this;
                                return [4 /*yield*/, this.api.get("/user/" + params.user_id).catch(function (error) {
                                        console.log('[account-61]', error);
                                    })];
                            case 1:
                                _a.user = _b.sent();
                                this.file = (this.user.media && this.user.media.url) ? this.user.media : { url: './assets/imgs/avatar.png', alt: 'avatar.png' };
                                this.user.social_links.map(function (socialLink) {
                                    if (socialLink && socialLink.grant_type === 'google') {
                                        _this.hasLinked.google = true;
                                    }
                                    if (socialLink && socialLink.grant_type === 'facebook') {
                                        _this.hasLinked.facebook = true;
                                    }
                                });
                                result();
                                return [3 /*break*/, 3];
                            case 2:
                                this.isSelf = true;
                                this.user = user;
                                this.file = (user && user.media && user.media.url) ? this.user.media : { url: './assets/imgs/avatar.png', alt: 'avatar.png' };
                                if (user) {
                                    user.social_links.map(function (socialLink) {
                                        if (socialLink && socialLink.grant_type === 'google') {
                                            _this.hasLinked.google = true;
                                        }
                                        if (socialLink && socialLink.grant_type === 'facebook') {
                                            _this.hasLinked.facebook = true;
                                        }
                                    });
                                }
                                result();
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    };
    /**
     * Descarga la información del usuario.
     */
    AccountPage.prototype.downloadUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.isSelf) return [3 /*break*/, 2];
                        _a = this.reponseFile;
                        return [4 /*yield*/, this.api.get('/user').catch(function (error) {
                                console.log('[account-89]', error);
                            })];
                    case 1:
                        _a.apply(this, [_c.sent()]);
                        return [3 /*break*/, 4];
                    case 2:
                        _b = this.reponseFile;
                        return [4 /*yield*/, this.api.get("/user/" + this.user.id).catch(function (error) {
                                console.log('[account-93]', error);
                            })];
                    case 3:
                        _b.apply(this, [_c.sent()]);
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Genera un archivo con la informacion del usuario.
     * @param {User} user
     */
    AccountPage.prototype.reponseFile = function (user) {
        var filename = user.name.replace(' ', '-') + ".json";
        var type = 'text/plain;charset=utf-8';
        var data = JSON.stringify(user, null, '\t');
        var a = document.createElement('a'), file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob) { // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        }
        else { // Otros
            var url_1 = URL.createObjectURL(file);
            a.href = url_1;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url_1);
            }, 0);
        }
    };
    /**
     * Elimina una cuenta de usuario.
     */
    AccountPage.prototype.deleteUserAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: this.translate.instant('ALERTS.DELETE_USER.TITLE'),
                            message: this.translate.instant('ALERTS.DELETE_USER.MESSAGE'),
                            buttons: [
                                {
                                    role: 'cancel',
                                    text: this.translate.instant('CANCEL')
                                },
                                {
                                    text: this.translate.instant('ACCEPT'),
                                    handler: function () {
                                        if (_this.isSelf) {
                                            _this.api.delete('/user').then(function () {
                                                _this.storage.logout();
                                            }, function (fail) {
                                                console.log('[account-139]', fail);
                                            });
                                        }
                                        else {
                                            _this.api.delete("/user/" + _this.user.id).then(function () {
                                                _this.router.navigate(['/users']);
                                            }, function (fail) {
                                                console.log('[account-145]', fail);
                                            });
                                        }
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Presenta un cuadro de mensaje.
    * @param {string} text Mensaje a mostrar.
    */
    AccountPage.prototype.presentToast = function (text) {
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
    AccountPage = __decorate([
        Component({
            selector: 'app-account',
            templateUrl: 'account.page.html',
            styleUrls: ['account.page.scss']
        }),
        __metadata("design:paramtypes", [ToastController,
            StorageService,
            ApiService,
            TranslateService,
            AlertController,
            ActivatedRoute,
            Router])
    ], AccountPage);
    return AccountPage;
}());
export { AccountPage };
//# sourceMappingURL=account.page.js.map