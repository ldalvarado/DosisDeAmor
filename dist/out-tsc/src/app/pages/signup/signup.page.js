import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { environment } from './../../../environments/environment';
import { Component } from '@angular/core';
import { FormBuilder, Validators, } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { StorageService, } from '../../providers/providers';
import { ValidationService } from '../../shared/directives/validation.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilityProvider } from '../../providers/UtilityProvider';
import { ModalController } from '@ionic/angular';
import { Busca_pais } from './../../modals/paises-busqueda/busca_pais.component';
/**
 * Proporciona la vista para un formulario de Registro de usuario.
 * @author CloudSolutions CA
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(router, toastCtrl, storage, http, formBuilder, translate, util, modalController) {
        this.router = router;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.http = http;
        this.formBuilder = formBuilder;
        this.translate = translate;
        this.util = util;
        this.modalController = modalController;
        this.progress = {
            type: 'determinate',
            value: 0
        };
        this.isPrimary = false;
        this.isPrimaryRe = false;
        this.apiUrl = environment.SERVER_URL;
        this.signupForm = formBuilder.group({
            contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60), ValidationService.passwordValidator]],
            password_d: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60), ValidationService.passwordValidator]],
            habilitado: ['1', [Validators.required]],
            id_perfil: ['1', [Validators.required]],
            telefono_cod_pais: ['', [Validators.required]],
            telefono_num: ['', [Validators.required, Validators.maxLength(60),]],
            correo: ['', [Validators.required, ValidationService.emailValidator]],
            correo_alt: ['', [Validators.required, ValidationService.emailValidator]],
            verificado: ['1', [Validators]],
            usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
            ap_paterno: ['', [Validators, Validators.minLength(4), Validators.maxLength(80)]],
            ap_materno: ['', [Validators, Validators.minLength(4), Validators.maxLength(80)]],
            nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
            latitud: ['24.0308556', [Validators]],
            logitud: ['-104.6704692', [Validators]]
        });
    }
    /**
     * Envía la información del usuario al servidor.
     */
    SignupPage.prototype.ionViewWillEnter = function () {
        this.BuscarCodigos();
    };
    SignupPage.prototype.BuscarCodigos = function () {
        var _this = this;
        this.Codigos = [];
        this.util.GetCombo().subscribe(function (data) {
            //console.log(JSON.stringify(data));
            if (data) {
                _this.Codigos = _this.util.LlenarCombo(JSON.stringify(data));
            }
            else {
                _this.presentToast(data['message']);
            }
        });
    };
    SignupPage.prototype.doSignup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, request, query;
            var _this = this;
            return __generator(this, function (_a) {
                headers = new HttpHeaders();
                request = ({ headers: headers });
                query = {
                    nombre: this.signupForm.value.nombre,
                    ap_paterno: this.signupForm.value.ap_paterno,
                    ap_materno: this.signupForm.value.ap_materno,
                    contrasena: this.signupForm.value.contrasena,
                    habilitado: this.signupForm.value.habilitado,
                    telefono_cod_pais: this.signupForm.value.telefono_cod_pais,
                    telefono_num: this.signupForm.value.telefono_num,
                    correo: this.signupForm.value.correo,
                    correo_alt: this.signupForm.value.correo_alt,
                    id_perfil: this.signupForm.value.id_perfil,
                    verificado: this.signupForm.value.verificado,
                    usuario: this.signupForm.value.usuario,
                    latitud: this.signupForm.value.latitud,
                    logitud: this.signupForm.value.logitud
                };
                //console.log(query);
                if (this.signupForm.value.contrasena !== this.signupForm.value.password_d) {
                    this.presentToast(this.translate.instant('FORM.PASSWORD_NOT_MATCH'));
                }
                else {
                    this.progress.type = 'indeterminate';
                    this.http.post(this.apiUrl + 'registrar' + '?json=' + JSON.stringify(query), JSON.stringify(query), request)
                        .subscribe(function (data) {
                        window.localStorage['usuario_id'] = JSON.stringify(data['idUsuario']);
                        console.log(data, window.localStorage['usuario_id'], 'estoy desde el registro');
                        if (data['status'] != "error") {
                            /*HACER LOGIN AL REGISTRAR*/
                            var loginR = {
                                correo: query.correo,
                                contrasena: query.contrasena
                            };
                            _this.http.post(_this.apiUrl + 'login' + '?json=' + JSON.stringify(loginR), JSON.stringify(loginR), request)
                                .subscribe(function (dataL) {
                                if (dataL['token']) {
                                    window.localStorage['token'] = dataL['token'];
                                    window.localStorage['usuario'] = dataL['usuario'];
                                }
                            });
                            /**FIN DEL LOGIN**/
                            _this.presentToast(data['message']);
                            _this.router.navigate(['/wall']);
                        }
                        else {
                            _this.presentToast(data['message']);
                        }
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Intercambia el tipo input entre password y text
     * @param {any} input
     */
    SignupPage.prototype.showPassword = function (input) {
        this.isPrimary = this.isPrimary === true ? false : true;
        input.type = input.type === 'password' ? 'text' : 'password';
        input.setFocus();
    };
    /**
     * Intercambia el tipo input entre password y text
     * @param {any} input
     */
    SignupPage.prototype.showPasswordRe = function (input) {
        this.isPrimaryRe = this.isPrimaryRe === true ? false : true;
        input.type = input.type === 'password' ? 'text' : 'password';
        input.setFocus();
    };
    SignupPage.prototype.presentModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: Busca_pais
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Presenta un cuadro de mensaje.
     * @param {string} text Mensaje a mostrar.
     */
    SignupPage.prototype.presentToast = function (text) {
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
    SignupPage.prototype.logout = function () {
        window.localStorage.clear();
        this.router.navigate(['/login']);
    };
    SignupPage = __decorate([
        Component({
            selector: 'app-signup',
            templateUrl: 'signup.page.html',
            styleUrls: ['signup.page.scss']
        }),
        __metadata("design:paramtypes", [Router,
            ToastController,
            StorageService,
            HttpClient,
            FormBuilder,
            TranslateService,
            UtilityProvider,
            ModalController])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.page.js.map