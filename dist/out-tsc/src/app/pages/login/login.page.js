import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService, ApiService, SocialLoginService } from '../../providers/providers';
/**
 * Proporciona la vista para un formulario donde el usuario puede ingresar sus datos para iniciar sesión.
 * @author CloudSolutions CA
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(socialLogin, storage, api, toastCtrl, alertCtrl, translate, router, route) {
        this.socialLogin = socialLogin;
        this.storage = storage;
        this.api = api;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.router = router;
        this.route = route;
        this.progress = {
            type: 'determinate',
            value: 0
        };
        this.isPrimary = false;
        this.isReadyToLogin = false;
        window.localStorage.clear();
        window.localStorage['token'] = '';
        window.localStorage['usuario'] = '';
        window.localStorage['usuario_id'] = '';
        window.localStorage['Nombre'] = '';
        window.localStorage['fotoPerfil'] = '';
    }
    /**
     * Navega hacia la página para registrase.
     */
    LoginPage.prototype.InicioLogin = function () {
        this.router.navigate(['/inicio']);
    };
    /**
     * Llama a la función para hacer login o signup con google
     */
    LoginPage.prototype.googleLogin = function () {
        this.socialLogin.googleLogin();
    };
    /**
     * Llama a la función para hacer login o signup con facebook.
     */
    LoginPage.prototype.facebookLogin = function () {
        this.socialLogin.facebookLogin();
    };
    /**
     * Navega hacia la página para registrase.
     */
    LoginPage.prototype.goToSignup = function () {
        this.router.navigate(['/signup']);
    };
    /**
    * Navega hacia la página para registrase.
    */
    LoginPage.prototype.goToInvitado = function () {
        this.token_inv = 'invitado';
        window.localStorage['token_inv'] = this.token_inv;
        this.router.navigate(['/animal']);
    };
    /**
     * Navega hacia la página de políticas de la aplicación
     * @param {string} segment
     */
    LoginPage.prototype.goToPolitics = function (segment) {
        this.router.navigate(['/politics', segment]);
    };
    /**
     * Proporciona al usuario la opción de recuperar su contraseña.
     */
    LoginPage.prototype.recoverPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.progress.type !== 'determinate') {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: this.translate.instant('ALERTS.RECOVER_PASSWORD_BY_EMAIL.TITLE'),
                                message: this.translate.instant('ALERTS.RECOVER_PASSWORD_BY_EMAIL.MESSAGE'),
                                inputs: [
                                    {
                                        type: 'email',
                                        name: 'email',
                                        value: ''
                                    }
                                ],
                                buttons: [
                                    {
                                        text: this.translate.instant('CANCEL'),
                                        role: 'cancel',
                                        handler: function (data) { }
                                    },
                                    {
                                        text: this.translate.instant('ACCEPT'),
                                        handler: function (data) { return __awaiter(_this, void 0, void 0, function () {
                                            var query;
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                if (data) {
                                                    this.progress.type = 'indeterminate';
                                                    query = {
                                                        email: data.email,
                                                        grant_type: 'password'
                                                    };
                                                    this.api.post('/password/email', query).then(function (response) {
                                                        _this.presentToast(_this.translate.instant('FORM.CHECK_YOUR_EMAIL'));
                                                        _this.progress.type = 'determinate';
                                                    }, function (fail) {
                                                        _this.presentToast(_this.translate.instant('ERRORS.RECOVERING_PASSWORD'));
                                                        console.log('[login-164]', fail);
                                                        _this.progress.type = 'determinate';
                                                    });
                                                }
                                                return [2 /*return*/];
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
     * Presenta un cuadro de mensaje.
     * @param {string} text Mensaje a mostrar.
     */
    LoginPage.prototype.presentToast = function (text) {
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
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: 'login.page.html',
            styleUrls: ['login.page.scss']
        }),
        __metadata("design:paramtypes", [SocialLoginService,
            StorageService,
            ApiService,
            ToastController,
            AlertController,
            TranslateService,
            Router,
            ActivatedRoute])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map