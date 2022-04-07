import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { CropImgComponent } from './../../../../modals/crop-img/crop-img.component';
import { TransferImgFileService, StorageService } from './../../../../providers/providers';
import { Platform, ToastController, ModalController, LoadingController, Events } from '@ionic/angular';
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
var AvatarComponent = /** @class */ (function () {
    function AvatarComponent(transferImgFile, toastCtrl, modalCtrl, loadingCtrl, translate, storage, events, platform) {
        this.transferImgFile = transferImgFile;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.storage = storage;
        this.events = events;
        this.platform = platform;
        this.enterTarget = null;
        this.dragClasses = {
            onDrag: false,
        };
        this.isBrowser = true;
        this.isSelf = true;
        this.file = {
            url: './assets/imgs/warehouse.png',
            alt: 'warehouse.png'
        };
        this.isBrowser = !this.platform.is('android') && !this.platform.is('ios');
    }
    AvatarComponent.prototype.ngOnInit = function () {
    };
    /**
     * Maneja la captura de imágenes desde móviles o páginas web.
     * @param {string} img
     */
    AvatarComponent.prototype.uploadNewAvatarImg = function (img) {
        var _this = this;
        this.transferImgFile.getImg(img).then(function (imgUrl) {
            if (imgUrl !== './assets/imgs/avatar.png') {
                _this.cropImg(imgUrl, { targetWidth: 300 }).then(function (newImg) {
                    if (newImg) {
                        _this.file = { url: newImg, alt: 'croped_img' };
                        _this.uploadAvatar(newImg);
                    }
                }, function (fail) {
                    console.log('[avatar-49]', fail);
                    console.log(JSON.stringify(fail));
                });
            }
        }, function (fail) {
            console.log('[avatar-54]', fail);
            _this.presentToast(fail);
        });
    };
    /**
     * Rectora las imágenes seleccionadas.
     * @param {string} imgUrl
     * @param {aspectRatio?: string, targetWidth?: number} params
     */
    AvatarComponent.prototype.cropImg = function (imgUrl, params) {
        var _this = this;
        return new Promise(function (success) {
            _this.modalCtrl.create({
                component: CropImgComponent,
                componentProps: {
                    imageBase64: imgUrl,
                    aspectRatio: params.aspectRatio,
                    targetWidth: params.targetWidth
                }
            }).then(function (modalCropImg) {
                modalCropImg.present();
                modalCropImg.onDidDismiss().then(function (detail) {
                    success(detail.data);
                });
            });
        });
    };
    /**
     * Envia las imagenes al servidor.
     * @param {string} img
     */
    AvatarComponent.prototype.uploadAvatar = function (img) {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({
                            message: this.translate.instant('UPDATING_IMG'),
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        if (this.isSelf) {
                            this.transferImgFile.uploadImg('/user/avatar', img).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    this.storage.setImgUrl(response);
                                    this.events.publish('user:avatar', response);
                                    loading.dismiss();
                                    console.log('[avatar-98]', response);
                                    return [2 /*return*/];
                                });
                            }); }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    loading.dismiss();
                                    console.log('[avatar-101]', fail);
                                    return [2 /*return*/];
                                });
                            }); });
                        }
                        else {
                            this.transferImgFile.uploadImg("/user/avatar/" + this.user.id, img)
                                .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    loading.dismiss();
                                    console.log('[avatar-107]', response);
                                    return [2 /*return*/];
                                });
                            }); }, function (fail) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    loading.dismiss();
                                    console.log('[avatar-110]', fail);
                                    return [2 /*return*/];
                                });
                            }); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Seleciona archivos al dejarlos caer.
     * @param event
     */
    AvatarComponent.prototype.onDrop = function (event) {
        var _this = this;
        event.preventDefault();
        var first = true;
        this.transferImgFile.getMultipleBase64Imgs(event.dataTransfer).subscribe(function (file) {
            if (first) {
                _this.cropImg(file.url, { targetWidth: 300 }).then(function (newImg) {
                    if (newImg) {
                        _this.file = { url: newImg, alt: 'croped_img' };
                        _this.uploadAvatar(newImg);
                    }
                }, function (fail) {
                    console.log('[avatar-49]', fail);
                    console.log(JSON.stringify(fail));
                });
            }
            first = false;
        });
        this.dragClasses.onDrag = false;
    };
    /**
     * Al desplazar un objeto sobre un elemento de la pagina.
     * @param event
     */
    AvatarComponent.prototype.onDragEnter = function (event) {
        this.enterTarget = event.target;
    };
    /**
     * Al desplazar un objeto sobre un elemento especifico de la pagina.
     * @param event
     */
    AvatarComponent.prototype.onDragOver = function (event) {
        event.stopPropagation();
        event.preventDefault();
        this.dragClasses.onDrag = true;
    };
    /**
     * Al salir del elemento arrastrando un objeto.
     * @param event
     */
    AvatarComponent.prototype.onDragLeave = function (event) {
        if (this.enterTarget === event.target && this.dragClasses.onDrag) {
            event.stopPropagation();
            event.preventDefault();
            this.dragClasses.onDrag = false;
        }
    };
    /**
    * Presenta un cuadro de mensaje.
    * @param {string} text Mensaje a mostrar.
    */
    AvatarComponent.prototype.presentToast = function (text) {
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
    ], AvatarComponent.prototype, "user", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AvatarComponent.prototype, "isSelf", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AvatarComponent.prototype, "file", void 0);
    AvatarComponent = __decorate([
        Component({
            selector: 'app-avatar',
            templateUrl: './avatar.component.html',
            styleUrls: ['./avatar.component.scss']
        }),
        __metadata("design:paramtypes", [TransferImgFileService,
            ToastController,
            ModalController,
            LoadingController,
            TranslateService,
            StorageService,
            Events,
            Platform])
    ], AvatarComponent);
    return AvatarComponent;
}());
export { AvatarComponent };
//# sourceMappingURL=avatar.component.js.map