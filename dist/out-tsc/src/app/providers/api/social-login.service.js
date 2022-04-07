import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { environment } from './../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController, ToastController, Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { FacebookService } from 'ngx-facebook';
var SocialLoginService = /** @class */ (function () {
    function SocialLoginService(fb, toastCtrl, userData, facebook, googlePlus, loadingCtrl, translate, api, router, platform) {
        this.fb = fb;
        this.toastCtrl = toastCtrl;
        this.userData = userData;
        this.facebook = facebook;
        this.googlePlus = googlePlus;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.api = api;
        this.router = router;
        this.platform = platform;
        var initParams = {
            appId: environment.FACEBOOK_APP_ID,
            xfbml: true,
            version: 'v3.2'
        };
        fb.init(initParams);
    }
    /**
     * Muestra para pantalla para pedir autorización al user para logearse con facebook.
     */
    SocialLoginService.prototype.facebookLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({ message: this.translate.instant('IS_LOGIN') })];
                    case 1:
                        _a.loadingLogin = _b.sent();
                        if ((!this.platform.is('android') && !this.platform.is('ios')) || this.platform.is('mobileweb')) {
                            this.fb.login({ scope: 'public_profile, email' }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var facebookLogin;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(response.status === 'connected')) return [3 /*break*/, 2];
                                            facebookLogin = {
                                                accessToken: response.authResponse.accessToken,
                                                extern_id: response.authResponse.userID,
                                                grant_type: 'facebook',
                                                client_id: environment.OAUTH_CLIENT_ID,
                                                client_secret: environment.OAUTH_CLIENT_SECRET,
                                                scopes: '*'
                                            };
                                            return [4 /*yield*/, this.loadingLogin.present()];
                                        case 1:
                                            _a.sent();
                                            this.apiCheckFacebookLogin(facebookLogin);
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (error) {
                                console.log('[social-login-58]', JSON.stringify(error));
                            });
                        }
                        else {
                            this.facebook.login(['public_profile', 'email']).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var facebookLogin;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(response.status === 'connected')) return [3 /*break*/, 2];
                                            facebookLogin = {
                                                accessToken: response.authResponse.accessToken,
                                                extern_id: response.authResponse.userID,
                                                grant_type: 'facebook',
                                                client_id: environment.OAUTH_CLIENT_ID,
                                                client_secret: environment.OAUTH_CLIENT_SECRET,
                                                scopes: '*'
                                            };
                                            return [4 /*yield*/, this.loadingLogin.present()];
                                        case 1:
                                            _a.sent();
                                            this.apiCheckFacebookLogin(facebookLogin);
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (error) {
                                console.log('[social-login-75]', JSON.stringify(error));
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Llama el api para comprobar que sea correcta la información del user.
     * @param {OAuthLogin} facebookLogin
     */
    SocialLoginService.prototype.apiCheckFacebookLogin = function (facebookLogin) {
        var _this = this;
        this.api.post('/oauth/token', facebookLogin).then(function (sesion) {
            _this.userData.setSesion(sesion).then(function () {
                _this.api.get('/user').then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.userData.setCredentials(user);
                                return [4 /*yield*/, this.loadingLogin.dismiss()];
                            case 1:
                                _a.sent();
                                this.router.navigate([environment.MAIN_URL]);
                                return [2 /*return*/];
                        }
                    });
                }); }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.loadingLogin.dismiss()];
                            case 1:
                                _a.sent();
                                console.log('[social-login-94]', JSON.stringify(fail.error));
                                this.presentToast(this.translate.instant('ERRORS.LOGIN'));
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(fail.error === 'SERVER.USER_NOT_REGISTRED')) return [3 /*break*/, 1];
                        this.getFacebookInfo();
                        return [3 /*break*/, 3];
                    case 1:
                        console.log('[social-login-102]', JSON.stringify(fail.error));
                        return [4 /*yield*/, this.loadingLogin.dismiss()];
                    case 2:
                        _a.sent();
                        if ((!this.platform.is('android') && !this.platform.is('ios')) && !this.platform.is('mobileweb')) {
                            this.fb.logout().then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    this.presentToast(this.translate.instant('ERRORS.LOGIN'));
                                    return [2 /*return*/];
                                });
                            }); });
                        }
                        else {
                            this.facebook.logout().then(function (response) {
                                _this.presentToast(_this.translate.instant('ERRORS.LOGIN'));
                            });
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Llama la información del user del servidor de facebook.
     */
    SocialLoginService.prototype.getFacebookInfo = function () {
        var _this = this;
        if ((!this.platform.is('android') && !this.platform.is('ios')) || this.platform.is('mobileweb')) {
            this.fb.api('/me', 'get', { fields: 'id,name,first_name,last_name,email,picture' }).then(function (facebookUser) {
                _this.fb.api('/me/picture', 'get', { type: 'large', redirect: false }).then(function (facebookImg) {
                    _this.userData.getLang().then(function (lang) {
                        var query = {
                            extern_id: facebookUser.id,
                            name: facebookUser.name,
                            first_name: facebookUser.first_name,
                            last_name: facebookUser.last_name,
                            email: facebookUser.email,
                            media: {
                                url: facebookImg.data.url,
                                width: facebookImg.data.width,
                                height: facebookImg.data.height,
                                alt: facebookUser.name
                            },
                            lang: lang || 'es',
                            client_id: environment.OAUTH_CLIENT_ID,
                            client_secret: environment.OAUTH_CLIENT_SECRET,
                            grant_type: 'facebook',
                            scopes: '*'
                        };
                        _this.signup(query);
                    });
                }).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.loadingLogin.dismiss()];
                            case 1:
                                _a.sent();
                                console.log('[social-login-148]', error);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.loadingLogin.dismiss()];
                        case 1:
                            _a.sent();
                            console.log('[social-login-152]', error);
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        else {
            this.facebook.api('/me?fields=id,name,first_name,last_name,email,picture', ['public_profile', 'email']).then(function (facebookUser) {
                _this.facebook.api('/me/picture?type=large&redirect=false', ['public_profile', 'email']).then(function (facebookImg) {
                    _this.userData.getLang().then(function (lang) {
                        var query = {
                            extern_id: facebookUser.id,
                            name: facebookUser.name,
                            first_name: facebookUser.first_name,
                            last_name: facebookUser.last_name,
                            email: facebookUser.email,
                            media: {
                                url: facebookImg.data.url,
                                width: facebookImg.data.width,
                                height: facebookImg.data.height,
                                alt: facebookUser.name
                            },
                            lang: lang || 'es',
                            client_id: environment.OAUTH_CLIENT_ID,
                            client_secret: environment.OAUTH_CLIENT_SECRET,
                            grant_type: 'facebook',
                            scopes: '*'
                        };
                        _this.signup(query);
                    });
                }).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.loadingLogin.dismiss()];
                            case 1:
                                _a.sent();
                                console.log('[social-login-182]', error);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.loadingLogin.dismiss()];
                        case 1:
                            _a.sent();
                            console.log('[social-login-186]', error);
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    /**
     * Vincula la cuenta del usuario con el perfil de facebook.
     */
    SocialLoginService.prototype.facebookLink = function () {
        var _this = this;
        return new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var loadingLink;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({ message: this.translate.instant('IS_LINKING') })];
                    case 1:
                        loadingLink = _a.sent();
                        if ((!this.platform.is('android') && !this.platform.is('ios')) || this.platform.is('mobileweb')) {
                            this.fb.login({ scope: 'public_profile, email' }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var facebookLink;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(response.status === 'connected')) return [3 /*break*/, 2];
                                            facebookLink = {
                                                accessToken: response.authResponse.accessToken,
                                                extern_id: response.authResponse.userID,
                                                client_id: environment.OAUTH_CLIENT_ID,
                                                client_secret: environment.OAUTH_CLIENT_SECRET,
                                                grant_type: 'facebook',
                                                scopes: '*'
                                            };
                                            return [4 /*yield*/, loadingLink.present()];
                                        case 1:
                                            _a.sent();
                                            this.api.put('/user/social/link', facebookLink).then(function (socialLink) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, loadingLink.dismiss()];
                                                        case 1:
                                                            _a.sent();
                                                            this.presentToast(this.translate.instant('FORM.SUCCESS'));
                                                            result(socialLink);
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, loadingLink.dismiss()];
                                                        case 1:
                                                            _a.sent();
                                                            if (typeof fail.error === 'string') {
                                                                this.presentToast(this.translate.instant(fail));
                                                            }
                                                            else {
                                                                this.presentToast(this.translate.instant('FORM.FAIL'));
                                                            }
                                                            reject(fail.error);
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (error) {
                                console.log('[social-login-223]', JSON.stringify(error));
                                reject(error);
                            });
                        }
                        else {
                            this.facebook.login(['public_profile', 'email']).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var facebookLink;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(response.status === 'connected')) return [3 /*break*/, 2];
                                            facebookLink = {
                                                accessToken: response.authResponse.accessToken,
                                                extern_id: response.authResponse.userID,
                                                client_id: environment.OAUTH_CLIENT_ID,
                                                client_secret: environment.OAUTH_CLIENT_SECRET,
                                                grant_type: 'facebook',
                                                scopes: '*'
                                            };
                                            return [4 /*yield*/, loadingLink.present()];
                                        case 1:
                                            _a.sent();
                                            this.api.put('/user/social/link', facebookLink).then(function (socialLink) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, loadingLink.dismiss()];
                                                        case 1:
                                                            _a.sent();
                                                            this.presentToast(this.translate.instant('FORM.SUCCESS'));
                                                            result(socialLink);
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, loadingLink.dismiss()];
                                                        case 1:
                                                            _a.sent();
                                                            if (typeof fail.error === 'string') {
                                                                this.presentToast(this.translate.instant(fail));
                                                            }
                                                            else {
                                                                this.presentToast(this.translate.instant('FORM.FAIL'));
                                                            }
                                                            reject(fail.error);
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (error) {
                                console.log('[social-login-253]', JSON.stringify(error));
                                reject(error);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Gestiona el login con google.
     */
    SocialLoginService.prototype.googleLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({ message: this.translate.instant('IS_LOGIN') })];
                    case 1:
                        _a.loadingLogin = _b.sent();
                        this.loadingLogin.present();
                        this.googlePlus.login({}).then(function (googleResponse) { return __awaiter(_this, void 0, void 0, function () {
                            var googleLogin;
                            var _this = this;
                            return __generator(this, function (_a) {
                                googleLogin = {
                                    accessToken: googleResponse.accessToken,
                                    extern_id: googleResponse.userId,
                                    client_id: environment.OAUTH_CLIENT_ID,
                                    client_secret: environment.OAUTH_CLIENT_SECRET,
                                    grant_type: 'google',
                                    scopes: '*'
                                };
                                this.api.post('/oauth/token', googleLogin).then(function (sesion) {
                                    _this.userData.setSesion(sesion).then(function () {
                                        _this.api.get('/user').then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                this.userData.setCredentials(user);
                                                this.loadingLogin.dismiss();
                                                this.router.navigate([environment.MAIN_URL]);
                                                return [2 /*return*/];
                                            });
                                        }); }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                this.loadingLogin.dismiss();
                                                console.log('[social-login-282]', JSON.stringify(fail.error));
                                                this.presentToast(this.translate.instant('ERRORS.LOGIN'));
                                                return [2 /*return*/];
                                            });
                                        }); });
                                    });
                                }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        if (fail.error === 'SERVER.USER_NOT_REGISTRED') {
                                            this.userData.getLang().then(function (lang) {
                                                var query = {
                                                    extern_id: googleResponse.userId,
                                                    name: googleResponse.displayName,
                                                    first_name: googleResponse.givenName,
                                                    last_name: googleResponse.familyName,
                                                    email: googleResponse.email,
                                                    media: { url: googleResponse.imageUrl },
                                                    lang: lang || 'es',
                                                    client_id: environment.OAUTH_CLIENT_ID,
                                                    client_secret: environment.OAUTH_CLIENT_SECRET,
                                                    grant_type: 'google',
                                                    scopes: '*'
                                                };
                                                _this.signup(query);
                                            });
                                        }
                                        else {
                                            this.loadingLogin.dismiss();
                                            this.googlePlus.logout().then(function () {
                                                console.log('[social-login-307]');
                                                _this.presentToast(_this.translate.instant('ERRORS.LOGIN'));
                                            });
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                                return [2 /*return*/];
                            });
                        }); }).catch(function (error) {
                            _this.loadingLogin.dismiss();
                            console.log(error);
                            console.log('[social-login-315]', JSON.stringify(error));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Vincula la cuenta del usuario con el perfil de google.
     */
    SocialLoginService.prototype.googleLink = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var loadingLink;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.loadingCtrl.create({ message: this.translate.instant('IS_LINKING') })];
                                case 1:
                                    loadingLink = _a.sent();
                                    this.googlePlus.login({}).then(function (googleResponse) { return __awaiter(_this, void 0, void 0, function () {
                                        var googleLogin;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    googleLogin = {
                                                        accessToken: googleResponse.accessToken,
                                                        extern_id: googleResponse.userId,
                                                        grant_type: 'google',
                                                        client_id: environment.OAUTH_CLIENT_ID,
                                                        client_secret: environment.OAUTH_CLIENT_SECRET
                                                    };
                                                    return [4 /*yield*/, loadingLink.present()];
                                                case 1:
                                                    _a.sent();
                                                    this.api.put('/user/social/link', googleLogin).then(function (socialLink) { return __awaiter(_this, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, loadingLink.dismiss()];
                                                                case 1:
                                                                    _a.sent();
                                                                    this.presentToast(this.translate.instant('FORM.SUCCESS'));
                                                                    result(socialLink);
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, loadingLink.dismiss()];
                                                                case 1:
                                                                    _a.sent();
                                                                    if (typeof fail.error === 'string') {
                                                                        this.presentToast(this.translate.instant(fail.error));
                                                                    }
                                                                    else {
                                                                        this.presentToast(this.translate.instant('FORM.FAIL'));
                                                                    }
                                                                    reject(fail.error);
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Envía la solicitud al servidor para insertarla información del user.
     * @param query Son los datos del user.
     */
    SocialLoginService.prototype.signup = function (query) {
        var _this = this;
        this.api.post('/user', query).then(function (sesion) {
            _this.userData.setSesion(sesion).then(function () {
                _this.api.get('/user').then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.userData.setCredentials(user);
                                return [4 /*yield*/, this.loadingLogin.dismiss()];
                            case 1:
                                _a.sent();
                                this.router.navigate([environment.MAIN_URL]);
                                return [2 /*return*/];
                        }
                    });
                }); }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('[social-login-244]', JSON.stringify(fail.error));
                                return [4 /*yield*/, this.loadingLogin.dismiss()];
                            case 1:
                                _a.sent();
                                this.presentToast(this.translate.instant('ERRORS.LOGIN'));
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('[social-login-250]', JSON.stringify(fail.error));
                        return [4 /*yield*/, this.loadingLogin.dismiss()];
                    case 1:
                        _a.sent();
                        this.presentToast(this.translate.instant('ERRORS.SIGNIN'));
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Presenta un cuadro de mensaje.
     * @param {string} text Mensaje a mostrar.
     */
    SocialLoginService.prototype.presentToast = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: text,
                            duration: 5000,
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
    SocialLoginService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [FacebookService,
            ToastController,
            StorageService,
            Facebook,
            GooglePlus,
            LoadingController,
            TranslateService,
            ApiService,
            Router,
            Platform])
    ], SocialLoginService);
    return SocialLoginService;
}());
export { SocialLoginService };
//# sourceMappingURL=social-login.service.js.map