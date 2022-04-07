import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { environment } from './../../../environments/environment';
import { LoadingController, ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService, StorageService } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
/**
 * Generated class for the FooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var FooterComponent = /** @class */ (function () {
    function FooterComponent(loadingCtrl, translate, toastCtrl, api, storage, router, formBuilder) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.api = api;
        this.storage = storage;
        this.router = router;
        this.isReadyToSubmit = false;
        this.supportForm = formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
            phone: ['', [Validators.nullValidator, Validators.maxLength(15)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(60)]],
            message: ['', [Validators.required, Validators.maxLength(255)]]
        });
        this.supportForm.valueChanges.subscribe(function (v) {
            _this.isReadyToSubmit = _this.supportForm.valid;
        });
    }
    /**
     * Navega hacia la página de información.
     */
    FooterComponent.prototype.goToAbout = function () {
        this.router.navigate(['/tabs', { outlets: { about: 'about' } }]);
    };
    /**
     * Navega hacia una página donde se presenta la ubicación de nuestras instalaciones.
     */
    FooterComponent.prototype.goToInstagram = function () {
        window.open(environment.INSTAGRAM_PAGE_LINK, '_blank');
    };
    /**
     * Nave hacia la página de Facebook.
     */
    FooterComponent.prototype.goToFacebook = function () {
        window.open(environment.FACEBOOK_PAGE_LINK, '_blank');
    };
    /**
     * Nave hacia la página de mail.
     */
    FooterComponent.prototype.goToMail = function () {
        window.open("mailto:" + environment.PUBLIC_MAIL, '_top');
    };
    /**
     * Envía la información de contacto con el mensaje del usuario.
     */
    FooterComponent.prototype.submitContact = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contactLoading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.supportForm.valid) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.loadingCtrl.create({ message: this.translate.instant('SENDING_MESSAGE') })];
                    case 1:
                        contactLoading = _a.sent();
                        return [4 /*yield*/, contactLoading.present()];
                    case 2:
                        _a.sent();
                        this.storage.getLang().then(function (lang) {
                            var query = {
                                name: _this.supportForm.value.name,
                                phone: _this.supportForm.value.phone,
                                email: _this.supportForm.value.email,
                                message: _this.supportForm.value.message,
                                lang: lang || 'es'
                            };
                            _this.api.post('/support', query).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.supportForm.patchValue({
                                                name: '',
                                                phone: '',
                                                email: '',
                                                message: ''
                                            });
                                            return [4 /*yield*/, contactLoading.dismiss()];
                                        case 1:
                                            _a.sent();
                                            this.presentToast(this.translate.instant('MESSAGE_SENT'));
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, contactLoading.dismiss()];
                                        case 1:
                                            _a.sent();
                                            this.presentToast(this.translate.instant('ERRORS.SENDING_MESSAGE'));
                                            console.log('[footer-89]', fail);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Navega hacia la página de políticas de la aplicación
     * @param {string} segment
     */
    FooterComponent.prototype.goToPolitics = function (segment) {
        this.router.navigate(['/politics', segment]);
    };
    /**
     * Presenta un cuadro de mensaje.
     * @param {string} text Mensaje a mostrar.
     */
    FooterComponent.prototype.presentToast = function (text) {
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
                        return [4 /*yield*/, toast.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FooterComponent = __decorate([
        Component({
            selector: 'app-footer',
            templateUrl: 'footer.component.html',
            styleUrls: ['footer.component.scss']
        }),
        __metadata("design:paramtypes", [LoadingController,
            TranslateService,
            ToastController,
            ApiService,
            StorageService,
            Router,
            FormBuilder])
    ], FooterComponent);
    return FooterComponent;
}());
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map