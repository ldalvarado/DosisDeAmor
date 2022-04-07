import { __awaiter, __decorate, __generator, __metadata, __spreadArrays } from "tslib";
import { Component } from '@angular/core';
import { ApiService } from './../../providers/providers';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
var AddEmailsPhonesComponent = /** @class */ (function () {
    function AddEmailsPhonesComponent(api, modalCtrl, navParams, toastCtrl, translate) {
        this.api = api;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.name = 'EMAILS';
        this.type = 'email';
        this.text = '';
        this.toSave = [];
        this.regex = {
            email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g
        };
    }
    AddEmailsPhonesComponent.prototype.ngOnInit = function () {
        this.type = this.navParams.get('type') || 'email';
        this.name = (this.type === 'email') ? 'EMAILS' : 'PHONES';
        this.getUserContact();
    };
    /**
     * Recupera información del usuario.
     */
    AddEmailsPhonesComponent.prototype.getUserContact = function () {
        var _this = this;
        this.api.get('/user/contact').then(function (userContact) {
            _this.userContact = userContact;
        }).catch(function (error) {
            console.log('[privacy-55]', error);
        });
    };
    /**
     * Elimina un valor.
     * @param {CatEmail | CatPhone} value
     * @param {'email' | 'phone'} type
     */
    AddEmailsPhonesComponent.prototype.deleteEmailPhone = function (value, type) {
        var _this = this;
        this.api.delete("/user/cat/" + type + "/" + value.id).then(function () {
            _this.userContact.contact[type + "s"].splice(_this.userContact.contact[type + "s"].indexOf(value), 1);
        }, function (fail) {
            console.log('[privacy-105]', fail);
        });
    };
    /**
     * Navega al lugar correspondiente.
     * @param {string} value
     */
    AddEmailsPhonesComponent.prototype.openLink = function (value) {
        if (this.type === 'email') {
            window.location.href = "mailto:" + value;
        }
        else if (this.type === 'tel') {
            window.location.href = "tel:+" + value;
        }
    };
    /**
     * Separa los valores correctos de los incorrectos
     */
    AddEmailsPhonesComponent.prototype.filterValues = function () {
        var _this = this;
        var toSave = this.text.split(',');
        var _a = this.partition(toSave, function (e) { return e.match((_this.type === 'email') ? _this.regex.email : _this.regex.phone); }), pass = _a[0], fail = _a[1];
        pass.forEach(function (email) { _this.toSave.push(email); });
        this.text = fail.join(', ');
        if (fail.length) {
            this.presentToast(this.translate.instant('ADD_EMAIL_PHONES.SOME_WRONG_VALUES'));
        }
    };
    /**
     * Ejecuta el filtro correspondiente para separar valores correctos e incorrectos.
     * @param {string[]} array
     * @param {any} isValid
     */
    AddEmailsPhonesComponent.prototype.partition = function (array, isValid) {
        return array.reduce(function (_a, elem) {
            var pass = _a[0], fail = _a[1];
            return isValid(elem) ? [__spreadArrays(pass, [elem]), fail] : [pass, __spreadArrays(fail, [elem])];
        }, [[], []]);
    };
    /**
     * Elimina un elemento de la lista.
     * @param {string} value
     */
    AddEmailsPhonesComponent.prototype.remove = function (value) {
        this.toSave.splice(this.toSave.indexOf(value), 1);
    };
    /**
     * Envia al servidor los datos correctos.
     */
    AddEmailsPhonesComponent.prototype.add = function () {
        var _a;
        var _this = this;
        this.filterValues();
        if (this.toSave.length) {
            var source = (this.type === 'email') ? 'emails' : 'phones';
            this.api.post("/user/cat/" + source, (_a = {}, _a[source] = this.toSave, _a)).then(function (result) {
                _this.dismiss(result);
            }, function (fail) {
                console.log('[add-emails-phones-90]', fail);
                _this.presentToast(_this.translate.instant('FORM.FAIL'));
            });
        }
        else {
            this.presentToast(this.translate.instant('ADD_EMAIL_PHONES.NOTHING_TO_SEND'));
        }
    };
    /**
     * Cierra el modal.
     */
    AddEmailsPhonesComponent.prototype.dismiss = function (result) {
        if (result === void 0) { result = []; }
        this.modalCtrl.dismiss(result);
    };
    /**
     * Presenta un cuadro de mensaje.
     * @param {string} text Mensaje a mostrar.
     */
    AddEmailsPhonesComponent.prototype.presentToast = function (text) {
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
    AddEmailsPhonesComponent = __decorate([
        Component({
            selector: 'app-add-emails-phones',
            templateUrl: 'add-emails-phones.component.html',
            styleUrls: ['add-emails-phones.component.scss']
        }),
        __metadata("design:paramtypes", [ApiService,
            ModalController,
            NavParams,
            ToastController,
            TranslateService])
    ], AddEmailsPhonesComponent);
    return AddEmailsPhonesComponent;
}());
export { AddEmailsPhonesComponent };
//# sourceMappingURL=add-emails-phones.component.js.map