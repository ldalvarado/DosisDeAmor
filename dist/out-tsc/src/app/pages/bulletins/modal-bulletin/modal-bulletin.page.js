import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { ApiService, TransferImgFileService } from './../../../providers/providers';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ModalController, NavParams, Platform, LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
var ModalBulletinPage = /** @class */ (function () {
    function ModalBulletinPage(modalCtrl, navParams, formBuilder, api, platform, transferImgFile, loadingCtrl, translate, toastCtrl) {
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.api = api;
        this.platform = platform;
        this.transferImgFile = transferImgFile;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.isReadyToSubmit = false;
        this.isBrowser = false;
        this.img = './assets/imgs/bulletin/newspaper.png';
        this.lastImg = '';
        this.isBrowser = (!this.platform.is('android') && !this.platform.is('ios')) || this.platform.is('mobileweb');
        this.bulletin_id = this.navParams.get('bulletin_id');
        if (this.bulletin_id) {
            this.getBulletin(this.bulletin_id);
        }
    }
    /**
     * Se ejecuta después del modal.
     */
    ModalBulletinPage.prototype.ngOnInit = function () {
        var _this = this;
        this.bulletinForm = this.formBuilder.group({
            id: ['', Validators.nullValidator],
            title: ['', [Validators.required, Validators.maxLength(255)]],
            description: ['', Validators.required],
            date: [new Date().toISOString(), Validators.required]
        });
        this.bulletinForm.valueChanges.subscribe(function (v) {
            _this.isReadyToSubmit = _this.bulletinForm.valid;
        });
    };
    /**
     * Obtiene la información de una noticia por su id.
     * @param {number} id
     */
    ModalBulletinPage.prototype.getBulletin = function (id) {
        var _this = this;
        this.api.get("/bulletin/" + id).then(function (bulletin) {
            _this.bulletinForm.patchValue({
                id: bulletin.id,
                title: bulletin.title,
                description: bulletin.description,
                date: bulletin.date
            });
            if (bulletin.media && bulletin.media.url) {
                _this.img = bulletin.media.url;
                _this.lastImg = bulletin.media.url;
            }
        }, function (fail) {
            console.log('[modal-bulletin-63]', fail);
        });
    };
    /**
     * Maneja la captura de imágenes desde móviles o páginas web.
     * @param {string} img
     */
    ModalBulletinPage.prototype.getBulletinImg = function (img) {
        var _this = this;
        this.transferImgFile.getImg(img).then(function (imgUrl) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (imgUrl !== './assets/imgs/bulletin/newspaper.png') {
                    this.img = imgUrl;
                }
                return [2 /*return*/];
            });
        }); });
    };
    /**
     * Envía la información de una noticia para crearla o actualizarla.
     */
    ModalBulletinPage.prototype.sendBulletin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, query, loading_1, loading_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = this.bulletinForm.value.date;
                        date = (date.year) ? date.year.text + "-" + date.month.text + "-" + date.day.text : date;
                        query = {
                            id: this.bulletinForm.value.id,
                            title: this.bulletinForm.value.title,
                            description: this.bulletinForm.value.description,
                            date: date,
                        };
                        if (!!this.bulletin_id) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loadingCtrl.create({
                                message: this.translate.instant('BULLETIN.MODALS.BULLETIN.UPLOAD'),
                            })];
                    case 1:
                        loading_1 = _a.sent();
                        return [4 /*yield*/, loading_1.present()];
                    case 2:
                        _a.sent();
                        this.api.post('/bulletin', query).then(function (bulletin) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.uploadBulletinImg(bulletin, 'create');
                                        return [4 /*yield*/, loading_1.dismiss()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, loading_1.dismiss()];
                                    case 1:
                                        _a.sent();
                                        if (typeof fail === 'string') {
                                            this.presentToast(this.translate.instant(fail));
                                        }
                                        else {
                                            this.presentToast(this.translate.instant('FORM.FAIL'));
                                        }
                                        console.log('[modal-bulletin-109]', fail);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.loadingCtrl.create({
                            message: this.translate.instant('BULLETIN.MODALS.BULLETIN.UPDATE'),
                        })];
                    case 4:
                        loading_2 = _a.sent();
                        return [4 /*yield*/, loading_2.present()];
                    case 5:
                        _a.sent();
                        this.api.put('/bulletin', query).then(function (bulletin) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.uploadBulletinImg(bulletin, 'update');
                                        return [4 /*yield*/, loading_2.dismiss()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, loading_2.dismiss()];
                                    case 1:
                                        _a.sent();
                                        if (typeof fail === 'string') {
                                            this.presentToast(this.translate.instant(fail));
                                        }
                                        else {
                                            this.presentToast(this.translate.instant('FORM.FAIL'));
                                        }
                                        console.log('[modal-bulletin-124]', fail);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sube la imagen seleccionada.
     * @param {Bulletin} bulletin
     */
    ModalBulletinPage.prototype.uploadBulletinImg = function (bulletin, action) {
        return __awaiter(this, void 0, void 0, function () {
            var loading_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((action === 'create' && this.img !== './assets/imgs/bulletin/newspaper.png') ||
                            (action === 'update' && this.img !== this.lastImg && this.img !== './assets/imgs/bulletin/newspaper.png'))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loadingCtrl.create({
                                message: this.translate.instant('UPDATING_IMG'),
                            })];
                    case 1:
                        loading_3 = _a.sent();
                        return [4 /*yield*/, loading_3.present()];
                    case 2:
                        _a.sent();
                        this.transferImgFile.uploadImg('/bulletin/img', this.img, { params: { bulletin_id: bulletin.id } }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, loading_3.dismiss()];
                                    case 1:
                                        _a.sent();
                                        this.dismiss(response);
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, loading_3.dismiss()];
                                    case 1:
                                        _a.sent();
                                        console.log('[modal-bulletin-148]', fail);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 4];
                    case 3:
                        this.dismiss(bulletin);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Cierra el modal.
     * @param {Bulletin} bulletin
     */
    ModalBulletinPage.prototype.dismiss = function (bulletin) {
        this.modalCtrl.dismiss(bulletin);
    };
    /**
     * Presenta un cuadro de mensaje.
     * @param {string} text Mensaje a mostrar.
     */
    ModalBulletinPage.prototype.presentToast = function (text) {
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
    ModalBulletinPage = __decorate([
        Component({
            selector: 'app-modal-bulletin',
            templateUrl: './modal-bulletin.page.html',
            styleUrls: ['./modal-bulletin.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController,
            NavParams,
            FormBuilder,
            ApiService,
            Platform,
            TransferImgFileService,
            LoadingController,
            TranslateService,
            ToastController])
    ], ModalBulletinPage);
    return ModalBulletinPage;
}());
export { ModalBulletinPage };
//# sourceMappingURL=modal-bulletin.page.js.map