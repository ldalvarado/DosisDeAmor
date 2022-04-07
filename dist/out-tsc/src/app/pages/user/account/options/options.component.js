import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { TranslateService } from '@ngx-translate/core';
import { ToastController, LoadingController, Events, AlertController } from '@ionic/angular';
import { Component, Input } from '@angular/core';
import { SocialLoginService, ApiService, StorageService } from './../../../../providers/providers';
var OptionsComponent = /** @class */ (function () {
    function OptionsComponent(api, socialLogin, translate, toastCtrl, storage, loadingCtrl, alertCtrl, events) {
        this.api = api;
        this.socialLogin = socialLogin;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.hasLinked = {
            google: false,
            facebook: false
        };
        this.isSelf = true;
    }
    OptionsComponent.prototype.ngOnInit = function () {
    };
    /**
     * Vincula una cuenta de usuario con una red social.
     * @param {'google' | 'facebook'} socialNetwork
     */
    OptionsComponent.prototype.addSocialLink = function (socialNetwork) {
        var _this = this;
        if (this.isSelf) {
            switch (socialNetwork) {
                case 'google':
                    {
                        this.socialLogin.googleLink().then(function (socialLink) {
                            _this.user.social_links.push(socialLink);
                            _this.hasLinked.google = true;
                        }, function (fail) {
                            console.log('[options-48]', fail);
                        });
                    }
                    break;
                case 'facebook':
                    {
                        this.socialLogin.facebookLink().then(function (socialLink) {
                            _this.user.social_links.push(socialLink);
                            _this.hasLinked.facebook = true;
                        }, function (fail) {
                            console.log('[options-57]', fail);
                        });
                    }
                    break;
            }
        }
        else {
            this.presentToast(this.translate.instant('ERRORS.NOT_IS_YOUR_ACCOUNT'));
        }
    };
    /**
     * Elimina el vínculo de una red social.
     * @param {'google' | 'facebook'} socialNetwork
     */
    OptionsComponent.prototype.removeSocialLink = function (socialNetwork) {
        var _this = this;
        if (this.isSelf) {
            var socialNetworkValue_1 = this.user.social_links.find(function (socialLink) {
                return socialLink.grant_type === socialNetwork;
            });
            if (socialNetworkValue_1) {
                this.api.delete("/user/social/link/" + socialNetworkValue_1.id).then(function () {
                    _this.presentToast(_this.translate.instant('SERVER.SOCIAL_LINK_DELETED'));
                    switch (socialNetworkValue_1.grant_type) {
                        case 'google':
                            {
                                _this.hasLinked.google = false;
                            }
                            break;
                        case 'facebook':
                            {
                                _this.hasLinked.facebook = false;
                            }
                            break;
                    }
                    _this.user.social_links.splice(_this.user.social_links.indexOf(socialNetworkValue_1), 1);
                }, function (fail) {
                    if (typeof fail === 'string') {
                        _this.presentToast(_this.translate.instant(fail));
                    }
                    console.log('[options-91]', fail);
                });
            }
        }
        else {
            this.presentToast(this.translate.instant('ERRORS.NOT_IS_YOUR_ACCOUNT'));
        }
    };
    /**
     * Proporciona al usuario la opción de recuperar su contraseña.
     */
    OptionsComponent.prototype.changePassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: this.translate.instant('ALERTS.RECOVER_PASSWORD.TITLE'),
                            message: this.translate.instant('ALERTS.RECOVER_PASSWORD.MESSAGE'),
                            buttons: [
                                {
                                    text: this.translate.instant('CANCEL'),
                                    role: 'cancel',
                                    handler: function () { }
                                },
                                {
                                    text: this.translate.instant('ACCEPT'),
                                    handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                        var recoveringPasswordLogin;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.loadingCtrl.create({ message: this.translate.instant('RECOVERING_PASSWORD') })];
                                                case 1:
                                                    recoveringPasswordLogin = _a.sent();
                                                    return [4 /*yield*/, recoveringPasswordLogin.present()];
                                                case 2:
                                                    _a.sent();
                                                    this.storage.getEmail().then(function (email) {
                                                        var query = {
                                                            email: email,
                                                            grant_type: 'password'
                                                        };
                                                        _this.api.post('/password/email', query).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                                            return __generator(this, function (_a) {
                                                                this.presentToast(this.translate.instant('FORM.CHECK_YOUR_EMAIL'));
                                                                recoveringPasswordLogin.dismiss();
                                                                return [2 /*return*/];
                                                            });
                                                        }); }, function (fail) {
                                                            recoveringPasswordLogin.dismiss();
                                                            _this.presentToast(_this.translate.instant('ERRORS.RECOVERING_PASSWORD'));
                                                            console.log('[account-333]', fail);
                                                        });
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Establece el rol del usuario.
     * @param event
     */
    OptionsComponent.prototype.changeRole = function (event) {
        var _this = this;
        this.api.put("/user/role/" + this.user.id, { role: event.target.value }).then(function (userRole) {
            _this.user.role = userRole;
            if (_this.isSelf) {
                _this.events.publish('user:role', userRole);
            }
        }, function (fail) {
            console.log('[account-300]', fail);
        });
    };
    /**
    * Presenta un cuadro de mensaje.
    * @param {string} text Mensaje a mostrar.
    */
    OptionsComponent.prototype.presentToast = function (text) {
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
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], OptionsComponent.prototype, "hasLinked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], OptionsComponent.prototype, "user", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], OptionsComponent.prototype, "isSelf", void 0);
    OptionsComponent = __decorate([
        Component({
            selector: 'app-options',
            templateUrl: './options.component.html',
            styleUrls: ['./options.component.scss']
        }),
        __metadata("design:paramtypes", [ApiService,
            SocialLoginService,
            TranslateService,
            ToastController,
            StorageService,
            LoadingController,
            AlertController,
            Events])
    ], OptionsComponent);
    return OptionsComponent;
}());
export { OptionsComponent };
//# sourceMappingURL=options.component.js.map