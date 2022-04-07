import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ToastController, NavParams, LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';
/**
 * Genera un modal.
 * @author <a href="mailto:jlozoya1995@gmail.com">Juan Lozoya</a>
 * @see https://www.mercadopago.com.mx/developers/es/tools/sdk/client/javascript/
 */
var MercadopagoComponent = /** @class */ (function () {
    function MercadopagoComponent(modalCtrl, navParams, toastCtrl, translate, loadingCtrl, api) {
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.api = api;
        this.doSubmit = false;
        this.hasEuId = false;
        this.showSecurityCode = true;
        this.showInstallments = false;
        this.showIssuer = false;
    }
    /**
     * O iniciar la vista ejecuta funciones de Mercadopago
     */
    MercadopagoComponent.prototype.ngOnInit = function () {
        Mercadopago.setPublishableKey('TEST-6c040dc1-b630-47ec-af75-dfbaed3b5b6e');
        Mercadopago.getIdentificationTypes();
        this.cardsHandler();
    };
    MercadopagoComponent.prototype.addEvent = function (element, eventName, handler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, handler);
        }
        else {
            element.attachEvent('on' + eventName, function () {
                handler.call(element);
            });
        }
    };
    /**
     * Obtiene los primeros seis dígitos de la tarjeta
     */
    MercadopagoComponent.prototype.getBin = function () {
        var cardSelector = document.querySelector('#cardId');
        if (cardSelector && cardSelector[cardSelector.options.selectedIndex].value !== '-1') {
            return cardSelector[cardSelector.options.selectedIndex].getAttribute('first_six_digits');
        }
        var ccNumber = document.querySelector('input[data-checkout="cardNumber"]');
        return ccNumber.value.replace(/[ .-]/g, '').slice(0, 6);
    };
    MercadopagoComponent.prototype.clearOptions = function () {
        var bin = this.getBin();
        if (bin.length === 0) {
            var select = document.querySelector('#issuer');
            select.style.display = 'none';
            document.querySelector('#issuer').innerHTML = '';
            var selectorInstallments = document.querySelector('#installments'), fragment = document.createDocumentFragment(), option = new Option(this.translate.instant('MERCADOPAGO.CHOOSE'), '-1');
            selectorInstallments.options.length = 0;
            fragment.appendChild(option);
            selectorInstallments.appendChild(fragment);
            selectorInstallments.setAttribute('disabled', 'disabled');
        }
    };
    /**
     * Obtiene el método de pago
     *
     * @param event
     */
    MercadopagoComponent.prototype.guessingPaymentMethod = function (event) {
        var _this = this;
        var bin = this.getBin(), amount = document.querySelector('#amount').value;
        if (event.type === 'keyup') {
            if (bin.length === 6) {
                Mercadopago.getPaymentMethod({
                    'bin': bin
                }, function (status, response) {
                    _this.setPaymentMethodInfo(status, response);
                });
            }
        }
        else {
            setTimeout(function () {
                if (bin.length >= 6) {
                    Mercadopago.getPaymentMethod({
                        'bin': bin
                    }, function (status, response) {
                        _this.setPaymentMethodInfo(status, response);
                    });
                }
            }, 100);
        }
    };
    /**
    * Establece la información del método de pago
    *
    * @see https://www.mercadopago.com.mx/developers/es/solutions/payments/custom-checkout/charge-with-credit-card-and-installments/javascript/
    *
    * @param status
    * @param response
    */
    MercadopagoComponent.prototype.setPaymentMethodInfo = function (status, response) {
        var _this = this;
        console.log(status);
        console.log(response);
        if (status === 200) {
            // do somethings ex: show logo of the payment method
            var form = document.querySelector('#pay');
            if (document.querySelector('input[name=paymentMethodId]') == null) {
                var paymentMethod = document.createElement('input');
                paymentMethod.setAttribute('name', 'paymentMethodId');
                paymentMethod.setAttribute('type', 'hidden');
                paymentMethod.setAttribute('value', response[0].id);
                form.appendChild(paymentMethod);
            }
            else {
                document.querySelector('input[name=paymentMethodId]').value = response[0].id;
            }
            // check if the security code (ex: Tarshop) is required
            var cardConfiguration = response[0].settings, bin = this.getBin(), amount = document.querySelector('#amount').value;
            for (var index = 0; index < cardConfiguration.length; index++) {
                if (bin.match(cardConfiguration[index].bin.pattern) != null && cardConfiguration[index].security_code.length === 0) {
                    /*
                    * In this case you do not need the Security code. You can hide the input.
                    */
                    this.showSecurityCode = false;
                }
                else {
                    /*
                    * In this case you NEED the Security code. You MUST show the input.
                    */
                    this.showSecurityCode = true;
                }
            }
            Mercadopago.getInstallments({
                'bin': bin,
                'amount': amount
            }, function (newStatus, newResponse) {
                _this.setInstallmentInfo(newStatus, newResponse);
            });
            // check if the issuer is necessary to pay
            var issuerMandatory = false, additionalInfo = response[0].additional_info_needed;
            for (var i = 0; i < additionalInfo.length; i++) {
                if (additionalInfo[i] === 'issuer_id') {
                    issuerMandatory = true;
                }
            }
            if (issuerMandatory) {
                this.showIssuer = true;
                Mercadopago.getIssuers(response[0].id, function (newStatus, newResponse) {
                    _this.showCardIssuers(newStatus, newResponse);
                });
                this.addEvent(document.querySelector('#issuer'), 'change', function (newStatus, newResponse) {
                    _this.setInstallmentsByIssuerId(newStatus, newResponse);
                });
            }
            else {
                this.showIssuer = false;
                document.querySelector('#issuer').style.display = 'none';
                document.querySelector('#issuer').options.length = 0;
            }
        }
    };
    MercadopagoComponent.prototype.showCardIssuers = function (status, issuers) {
        console.log(status);
        console.log('card issuers', issuers);
        var issuersSelector = document.querySelector('#issuer'), fragment = document.createDocumentFragment();
        issuersSelector.options.length = 0;
        var option = new Option(this.translate.instant('MERCADOPAGO.CHOOSE'), '-1');
        fragment.appendChild(option);
        for (var i = 0; i < issuers.length; i++) {
            if (issuers[i].name !== 'default') {
                option = new Option(issuers[i].name, issuers[i].id);
            }
            else {
                option = new Option('Otro', issuers[i].id);
            }
            fragment.appendChild(option);
        }
        issuersSelector.appendChild(fragment);
        issuersSelector.removeAttribute('disabled');
        document.querySelector('#issuer').removeAttribute('style');
    };
    MercadopagoComponent.prototype.setInstallmentsByIssuerId = function (status, response) {
        var _this = this;
        var issuerId = document.querySelector('#issuer').value, amount = document.querySelector('#amount').value;
        if (issuerId === '-1') {
            return;
        }
        Mercadopago.getInstallments({
            'bin': this.getBin(),
            'amount': amount,
            'issuer_id': issuerId
        }, function (newStatus, newResponse) {
            _this.setInstallmentInfo(newStatus, newResponse);
        });
    };
    MercadopagoComponent.prototype.setInstallmentInfo = function (status, response) {
        var selectorInstallments = document.querySelector('#installments'), fragment = document.createDocumentFragment();
        selectorInstallments.options.length = 0;
        if (response.length > 0) {
            this.showInstallments = true;
            var option = new Option(this.translate.instant('MERCADOPAGO.CHOOSE'), '-1'), payerCosts = response[0].payer_costs;
            fragment.appendChild(option);
            for (var i = 0; i < payerCosts.length; i++) {
                option = new Option(payerCosts[i].recommended_message ||
                    payerCosts[i].installments, payerCosts[i].installments);
                fragment.appendChild(option);
            }
            selectorInstallments.appendChild(fragment);
            selectorInstallments.removeAttribute('disabled');
        }
        else {
            this.showInstallments = false;
        }
    };
    MercadopagoComponent.prototype.cardsHandler = function () {
        var _this = this;
        this.clearOptions();
        var cardSelector = document.querySelector('#cardId'), amount = document.querySelector('#amount').value;
        if (cardSelector && cardSelector[cardSelector.options.selectedIndex].value !== '-1') {
            var _bin = cardSelector[cardSelector.options.selectedIndex].getAttribute('first_six_digits');
            Mercadopago.getPaymentMethod({
                'bin': _bin
            }, function (status, response) {
                _this.setPaymentMethodInfo(status, response);
            });
        }
    };
    /**
     * Evalúa el resultado del llamado del api de mercadopago para generar un token a
     * partir de los datos de la tarjeta.
     *
     * @see http://beta.mercadopago.com.mx/developers/es/guides/payments/api/receiving-payment-by-card
     * @see https://www.mercadopago.com.mx/developers/es/guides/payments/web-checkout/testing/
     *
     * @param event
     */
    MercadopagoComponent.prototype.doPay = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var $form;
            var _this = this;
            return __generator(this, function (_a) {
                event.preventDefault();
                if (!this.doSubmit) {
                    $form = document.querySelector('#pay');
                    Mercadopago.createToken($form, function (status, response) { return __awaiter(_this, void 0, void 0, function () {
                        var installments;
                        var _this = this;
                        return __generator(this, function (_a) {
                            if (status !== 200 && status !== 201) {
                                switch (response.cause[0].code) {
                                    case '205':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.CARD.NUMBER_NULL'));
                                        }
                                        break;
                                    case '208':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.CARD.EXPIRATION_MONTH_NULL'));
                                        }
                                        break;
                                    case '209':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.CARD.EXPIRATION_YEAR_NULL'));
                                        }
                                        break;
                                    case '212':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.DOC.TYPE_NULL'));
                                        }
                                        break;
                                    case '213':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.DOC.SUBTYPE_NULL'));
                                        }
                                        break;
                                    case '214':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.DOC.NUMBER_NULL'));
                                        }
                                        break;
                                    case '220':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.CARD.CARD_ISSUER_ID_NULL'));
                                        }
                                        break;
                                    case '221':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.CARD.HOLDER_NAME_NULL'));
                                        }
                                        break;
                                    case '224':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.CARD.SECURITY_CODE_NULL'));
                                        }
                                        break;
                                    case 'E301':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.INVALID.CARD_NUMBER'));
                                        }
                                        break;
                                    case 'E302':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.INVALID.SECURITY_CODE'));
                                        }
                                        break;
                                    case '316':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.INVALID.HOLDER_NAME'));
                                        }
                                        break;
                                    case '322':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.INVALID.DOC_TYPE'));
                                        }
                                        break;
                                    case '323':
                                        {
                                            this.presentToast(this.translate.instant('MERCADOPAGO.INVALID.DOC_SUBTYPE'));
                                        }
                                        break;
                                    case '324':
                                        this.presentToast(this.translate.instant('MERCADOPAGO.INVALID.DOC_NUMBER'));
                                        break;
                                    case '325':
                                        this.presentToast(this.translate.instant('MERCADOPAGO.INVALID.EXPIRATION_MONTH'));
                                        break;
                                    case '326':
                                        this.presentToast(this.translate.instant('MERCADOPAGO.INVALID.EXPIRATION_YEAR'));
                                        break;
                                    default: {
                                        this.presentToast(this.translate.instant('MERCADOPAGO.ERROR'));
                                        break;
                                    }
                                }
                                // TODOawait loadingPay.dismiss();
                            }
                            else {
                                installments = document.querySelector('#installments').value;
                                response.installments = parseInt(installments, 36) || 1;
                                console.log('paymentMethodId', document.querySelector('#paymentMethodId').value);
                                response.payment_method_id = document.querySelector('#paymentMethodId').value;
                                response.issuer_id = document.querySelector('#issuer').value;
                                response.email = document.querySelector('#email').value;
                                console.log(response);
                                this.api.post('/user/pay', response).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        console.log(result);
                                        // TODO: await loadingPay.dismiss();
                                        this.dismiss('FORM.SUCCESS');
                                        return [2 /*return*/];
                                    });
                                }); }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        // TODO: await loadingPay.dismiss();
                                        console.log('[modal-mercadopago-187]', fail);
                                        return [2 /*return*/];
                                    });
                                }); });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Cierra la vista.
     * @param {any} message Mensaje en caso de realizar una acción al cerrar el modal.
     */
    MercadopagoComponent.prototype.dismiss = function (message) {
        this.modalCtrl.dismiss(message);
    };
    /**
     * Presenta un cuadro de mensaje.
     * @param {string} text Mensaje a mostrar.
     */
    MercadopagoComponent.prototype.presentToast = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: text,
                            duration: 3000,
                            position: 'top'
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
    MercadopagoComponent = __decorate([
        Component({
            selector: 'app-mercadopago',
            templateUrl: 'mercadopago.component.html',
            styleUrls: ['mercadopago.component.scss']
        }),
        __metadata("design:paramtypes", [ModalController,
            NavParams,
            ToastController,
            TranslateService,
            LoadingController,
            ApiService])
    ], MercadopagoComponent);
    return MercadopagoComponent;
}());
export { MercadopagoComponent };
//# sourceMappingURL=mercadopago.component.js.map