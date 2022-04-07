import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { AddEmailsPhonesComponent } from './../../../modals/add-emails-phones/add-emails-phones.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastController, ModalController, Platform } from '@ionic/angular';
import { ApiService } from './../../../providers/providers';
import { Component } from '@angular/core';
var PrivacyPage = /** @class */ (function () {
    function PrivacyPage(api, toastCtrl, translate, modalCtrl, platform) {
        this.api = api;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.userPermissions = {
            show_main_email: true,
            show_alternative_emails: true,
            show_main_phone: true,
            show_alternative_phones: true,
            show_address: true,
            receive_mail_adds: true
        };
    }
    PrivacyPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.getUserPermissions();
            _this.getUserContact();
        });
    };
    /**
     * Recupera información del usuario.
     */
    PrivacyPage.prototype.getUserPermissions = function () {
        var _this = this;
        this.api.get('/user/permissions').then(function (userPermissions) {
            _this.userPermissions = userPermissions;
        }).catch(function (error) {
            console.log('[privacy-45]', error);
        });
    };
    /**
     * Recupera información del usuario.
     */
    PrivacyPage.prototype.getUserContact = function () {
        var _this = this;
        this.api.get('/user/contact').then(function (userContact) {
            _this.userContact = userContact;
        }).catch(function (error) {
            console.log('[privacy-55]', error);
        });
    };
    /**
     * Navega al lugar correspondiente.
     * @param {string} value
     */
    PrivacyPage.prototype.openLink = function (value, type) {
        if (type === 'email') {
            window.location.href = "mailto:" + value;
        }
        else if (type === 'phone') {
            window.location.href = "tel:+" + value;
        }
    };
    /**
     * Actualiza información del usuario.
     * @param {string} key
     * @param {boolean} value
     */
    PrivacyPage.prototype.updateUserPermissions = function (key, value) {
        var _a;
        var _this = this;
        this.api.put('/user/permissions', (_a = {}, _a[key] = (value) ? false : true, _a)).then(function (userPermissions) {
            _this.userPermissions = userPermissions;
            _this.presentToast(_this.translate.instant('FORM.SUCCESS'));
        }, function (error) {
            console.log('[privacy-79]', error);
        });
    };
    /**
     * Abre un modal.
     * @param {'email' | 'tel'} type
     */
    PrivacyPage.prototype.addEmailsPhones = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: AddEmailsPhonesComponent,
                            componentProps: {
                                type: type,
                                name: name
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        modal.onDidDismiss().then(function (detail) {
                            if (detail.data) {
                                detail.data.forEach(function (element) {
                                    if (type === 'email') {
                                        _this.userContact.contact.emails.push(element);
                                    }
                                    else {
                                        _this.userContact.contact.phones.push(element);
                                    }
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Elimina un valor.
     * @param {CatEmail | CatPhone} value
     * @param {'email' | 'phone'} type
     */
    PrivacyPage.prototype.deleteEmailPhone = function (value, type) {
        var _this = this;
        this.api.delete("/user/cat/" + type + "/" + value.id).then(function () {
            _this.userContact.contact[type + "s"].splice(_this.userContact.contact[type + "s"].indexOf(value), 1);
        }, function (fail) {
            console.log('[privacy-105]', fail);
        });
    };
    /**
    * Presenta un cuadro de mensaje.
    * @param {string} text Mensaje a mostrar.
    */
    PrivacyPage.prototype.presentToast = function (text) {
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
    PrivacyPage = __decorate([
        Component({
            selector: 'app-privacy',
            templateUrl: './privacy.page.html',
            styleUrls: ['./privacy.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            ToastController,
            TranslateService,
            ModalController,
            Platform])
    ], PrivacyPage);
    return PrivacyPage;
}());
export { PrivacyPage };
//# sourceMappingURL=privacy.page.js.map