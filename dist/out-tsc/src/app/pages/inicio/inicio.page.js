import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, Validators, } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilityProvider } from './../../providers/UtilityProvider';
//import { RestProvider} from '../../providers/RestProvider';
/**
 * Proporciona la vista para un formulario donde el usuario puede ingresar sus datos para iniciar sesión.
 * @author CloudSolutions CA
 */
var InicioPage = /** @class */ (function () {
    function InicioPage(formBuilder, router, http, util, toastCtrl) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.http = http;
        this.util = util;
        this.toastCtrl = toastCtrl;
        this.progress = {
            type: 'determinate',
            value: 0
        };
        // loginForm: any;
        this.isPrimary = false;
        this.isReadyToLogin = false;
        this.apiUrl = environment.SERVER_URL;
        window.localStorage.clear();
        window.localStorage['token'] = '';
        window.localStorage['usuario'] = '';
        window.localStorage['usuario_id'] = '';
        window.localStorage['Nombre'] = '';
        window.localStorage['fotoPerfil'] = '';
    }
    /**
     * Envía una petición al servidor para iniciar sesión.
     */
    InicioPage.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            'correo': [null, Validators.required],
            'contrasena': [null, Validators.required]
        });
    };
    InicioPage.prototype.onFormSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, request, query;
            var _this = this;
            return __generator(this, function (_a) {
                headers = new HttpHeaders();
                request = ({ headers: headers });
                query = {
                    correo: this.loginForm.value.correo,
                    contrasena: this.loginForm.value.contrasena,
                };
                if (query.correo == '' && query.contrasena == '') {
                    return [2 /*return*/, Observable.throw("Please insert credentials.")];
                }
                else {
                    this.progress.type = 'indeterminate';
                    this.http.post(this.apiUrl + 'login' + '?json=' + JSON.stringify(query), JSON.stringify(query), request)
                        .subscribe(function (data) {
                        if (data['token']) {
                            window.localStorage['token'] = data['token'];
                            window.localStorage['usuario_id'] = JSON.stringify(data['id']);
                            _this.usuario_id = window.localStorage['usuario_id'];
                            window.localStorage['usuario'] = data['usuario'];
                            if (data['mascotas'] != 0) {
                                _this.presentToast(data['message']);
                                _this.router.navigate(['/animal/home']);
                            }
                            else {
                                _this.presentToast('Debe Registrar un animal de compañia');
                                _this.router.navigate(['/wall']);
                            }
                        }
                        else {
                            _this.presentToast(data['message']);
                            _this.access = false;
                        }
                    });
                    return [2 /*return*/, Observable.create(function (observer) {
                            setTimeout(function () {
                                observer.next(_this.access);
                            }, 500);
                            setTimeout(function () {
                                observer.complete();
                            }, 1000);
                        }, function (err) { return console.error(err); })];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Intercambia el tipo input entre password y text
     * @param {amy} input
     */
    InicioPage.prototype.showPassword = function (input) {
        this.isPrimary = this.isPrimary === true ? false : true;
        input.type = input.type === 'password' ? 'text' : 'password';
        input.setFocus();
    };
    /**
     * Proporciona al usuario la opción de recuperar su contraseña.
     */
    /* async recoverPassword() {
       if (this.progress.type !== 'determinate') { return; }
       const alert = await this.alertCtrl.create({
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
             handler: (data: any) => {}
           },
           {
             text: this.translate.instant('ACCEPT'),
             handler: async (data: any) => {
               if (data) {
                 this.progress.type = 'indeterminate';
                 const query: User = {
                   email: data.email,
                   grant_type: 'password'
                 };
                 this.api.post('/password/email', query).then((response: any) => {
                   this.presentToast(this.translate.instant('FORM.CHECK_YOUR_EMAIL'));
                   this.progress.type = 'determinate';
                 }, (fail) => {
                   this.presentToast(this.translate.instant('ERRORS.RECOVERING_PASSWORD'));
                   console.log('[login-164]', fail);
                   this.progress.type = 'determinate';
                 });
               }
             }
           }
         ]
       });
       await alert.present();
     }*/
    /**
     * Presenta un cuadro de mensaje.
     * @param {string} text Mensaje a mostrar.
     */
    InicioPage.prototype.presentToast = function (text) {
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
    InicioPage = __decorate([
        Component({
            selector: 'app-inicio',
            templateUrl: 'inicio.page.html',
            styleUrls: ['inicio.page.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            Router,
            HttpClient,
            UtilityProvider,
            ToastController])
    ], InicioPage);
    return InicioPage;
}());
export { InicioPage };
//# sourceMappingURL=inicio.page.js.map