import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { FacebookService } from 'ngx-facebook';
import { Platform, ToastController, ActionSheetController, ModalController, NavParams, PopoverController, AlertController } from '@ionic/angular';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService, ApiService } from './../../../providers/providers';
import { MapComponent } from './../../../modals/map/map.component';
import { PostUpdateComponenet } from './../post-update/post-update.component';
import { environment } from './../../../../environments/environment';
var PostCardComponent = /** @class */ (function () {
    function PostCardComponent(translate, toastCtrl, router, platform, socialSharing, actionSheetCtrl, modalCtrl, popoverCtrl, api, fb, alertCtrl, storage) {
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.router = router;
        this.platform = platform;
        this.socialSharing = socialSharing;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.api = api;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.isBrowser = false;
        this.appPostDeleted = new EventEmitter();
        var initParams = {
            appId: environment.FACEBOOK_APP_ID,
            xfbml: true,
            version: 'v3.2'
        };
        fb.init(initParams);
        this.isBrowser = (!this.platform.is('android') && !this.platform.is('ios')) || this.platform.is('mobileweb');
    }
    PostCardComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.getUser()];
                    case 1:
                        _a.user = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Navega hacia la pagina del usuario.
     * @param {User} user
     */
    PostCardComponent.prototype.goToAccount = function (user) {
        this.router.navigate(['/wall', user.id]);
    };
    /**
     * Despliega un action sheet.
     * @param {Post} post
     */
    PostCardComponent.prototype.presentActionSheet = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var browser, movile, actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        browser = [{
                                text: 'Twitter',
                                icon: 'logo-twitter',
                                handler: function () {
                                    _this.doShare('twitter', post);
                                }
                            }, {
                                text: 'Whatsapp',
                                icon: 'logo-whatsapp',
                                handler: function () {
                                    _this.doShare('whatsapp', post);
                                }
                            }, {
                                text: 'Facebook',
                                icon: 'logo-facebook',
                                handler: function () {
                                    _this.doShare('facebook', post);
                                }
                            }];
                        movile = [{
                                text: 'Twitter',
                                icon: 'logo-twitter',
                                handler: function () {
                                    _this.doShare('twitter', post);
                                }
                            }, {
                                text: 'Whatsapp',
                                icon: 'logo-whatsapp',
                                handler: function () {
                                    _this.doShare('whatsapp', post);
                                }
                            }, {
                                text: 'Facebook',
                                icon: 'logo-facebook',
                                handler: function () {
                                    _this.doShare('facebook', post);
                                }
                            }, {
                                text: 'Instagram',
                                icon: 'logo-instagram',
                                handler: function () {
                                    _this.doShare('instagram', post);
                                }
                            }];
                        return [4 /*yield*/, this.actionSheetCtrl.create({
                                header: this.translate.instant('SHARE'),
                                buttons: (this.isBrowser) ? browser : movile
                            })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostCardComponent.prototype.openMap = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var mapModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: MapComponent,
                            componentProps: { post: post }
                        })];
                    case 1:
                        mapModal = _a.sent();
                        mapModal.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Abre la pagina correspondiente para compartir contenido.
     * @param {String} via
     * @param {Post} post
     */
    PostCardComponent.prototype.doShare = function (via, post) {
        return __awaiter(this, void 0, void 0, function () {
            var url, media;
            var _this = this;
            return __generator(this, function (_a) {
                url = environment.APP_URL + "/#/posts/" + post.id;
                media = post.media[0] ? post.media[0].url : environment.APP_URL + "/assets/imgs/appicon.png";
                switch (via) {
                    case 'facebook':
                        {
                            if (this.isBrowser) {
                                this.fb.ui({
                                    method: 'share_open_graph',
                                    action_type: 'og.shares',
                                    action_properties: JSON.stringify({
                                        object: {
                                            'og:url': url,
                                            'og:title': post.description,
                                            'og:description': post.description.replace(/(&nbsp;|<([^>]+)>)/ig, ' '),
                                            'og:image': media || '""',
                                            'og:image:url': media || '""',
                                            'og:image:alt': media || '""'
                                        }
                                    })
                                });
                            }
                            else {
                                this.socialSharing.shareViaFacebook('message', media, url).then(function (response) {
                                    console.log(response);
                                }).catch(function (error) {
                                    console.log('[post-card-133]', JSON.stringify(error));
                                    _this.presentToast(_this.translate.instant('SHARE.ERROR.FACEBOOK'));
                                });
                            }
                        }
                        break;
                    case 'twitter':
                        {
                            if (this.isBrowser) {
                                window.open("https://twitter.com/share?url=" + encodeURIComponent(media) + "&text=" + encodeURIComponent(post.description));
                            }
                            else {
                                this.socialSharing.shareViaTwitter('message', media, url).then(function (response) {
                                    console.log(response);
                                }).catch(function (error) {
                                    console.log('[post-card-145]', JSON.stringify(error));
                                    _this.presentToast(_this.translate.instant('SHARE.ERROR.TWITTER'));
                                });
                            }
                        }
                        break;
                    case 'instagram':
                        {
                            if (this.isBrowser) {
                                this.presentToast(this.translate.instant('SHARE.ERROR.INSTAGRAM'));
                            }
                            else {
                                this.socialSharing.shareViaInstagram('message', media).then(function (response) {
                                    console.log(response);
                                }).catch(function (error) {
                                    console.log('[post-card-157]', JSON.stringify(error));
                                    _this.presentToast(_this.translate.instant('SHARE.ERROR.INSTAGRAM'));
                                });
                            }
                        }
                        break;
                    case 'whatsapp':
                        {
                            if (this.isBrowser) {
                                window.location.href = "whatsapp://send?text=" + encodeURIComponent(post.description) + " " + url;
                            }
                            else {
                                this.socialSharing.shareViaWhatsApp('message', media, url).then(function (response) {
                                    console.log(response);
                                }).catch(function (error) {
                                    console.log('[post-card-169]', JSON.stringify(error));
                                    _this.presentToast(_this.translate.instant('SHARE.ERROR.WHATSAPP'));
                                });
                            }
                        }
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Muestra un popover.
     * @param event
     */
    PostCardComponent.prototype.openPop = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var popoverCtrl;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: PostCardPopComponent,
                            componentProps: { user_id: this.post.user.id },
                            event: event
                        })];
                    case 1:
                        popoverCtrl = _a.sent();
                        return [4 /*yield*/, popoverCtrl.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, popoverCtrl.onDidDismiss().then(function (result) {
                                switch (result.data) {
                                    case 'update':
                                        {
                                            _this.update();
                                        }
                                        break;
                                    case 'delete':
                                        {
                                            _this.delete();
                                        }
                                        break;
                                    case 'report':
                                        {
                                            _this.report();
                                        }
                                        break;
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Actualiza un registro.
     */
    PostCardComponent.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modalCtrl;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: PostUpdateComponenet,
                            componentProps: { postId: this.post.id }
                        })];
                    case 1:
                        modalCtrl = _a.sent();
                        return [4 /*yield*/, modalCtrl.present()];
                    case 2:
                        _a.sent();
                        modalCtrl.onDidDismiss().then(function (response) {
                            if (response.data) {
                                _this.post = response.data;
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Elimina un registro.
     */
    PostCardComponent.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: this.translate.instant('ALERTS.DELETE_PET.TITLE'),
                            message: this.translate.instant('ALERTS.DELETE_PET.MESSAGE'),
                            buttons: [
                                {
                                    text: this.translate.instant('CANCEL'),
                                    role: 'cancel',
                                    handler: function () { }
                                },
                                {
                                    text: this.translate.instant('ACCEPT'),
                                    handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            this.api.delete("/post/" + this.post.id).then(function () {
                                                _this.appPostDeleted.emit(_this.post);
                                            }, function (error) {
                                                console.log('[post-card-246]', error);
                                            });
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
     * Abre un alert.
     */
    PostCardComponent.prototype.report = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: this.translate.instant('ALERTS.REPORT_PET.TITLE'),
                            message: this.translate.instant('ALERTS.REPORT_PET.MESSAGE'),
                            inputs: [
                                {
                                    type: 'text',
                                    name: 'description',
                                    value: ''
                                }
                            ],
                            buttons: [
                                {
                                    text: this.translate.instant('CANCEL'),
                                    role: 'cancel',
                                    handler: function () { }
                                },
                                {
                                    text: this.translate.instant('ACCEPT'),
                                    handler: function (data) { return __awaiter(_this, void 0, void 0, function () {
                                        var query;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            if (data) {
                                                query = {
                                                    description: data.description
                                                };
                                                this.api.post("/post/report/" + this.post.id, query).then(function () {
                                                    _this.presentToast(_this.translate.instant('ALERT.REPORT_PET.SUCCESS'));
                                                }, function (fail) {
                                                    _this.presentToast(_this.translate.instant('ALERT.REPORT_PET.FAIL'));
                                                    console.log('[post-card-285]', fail);
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
    PostCardComponent.prototype.presentToast = function (text) {
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
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PostCardComponent.prototype, "post", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PostCardComponent.prototype, "appPostDeleted", void 0);
    PostCardComponent = __decorate([
        Component({
            selector: 'app-post-card',
            templateUrl: './post-card.component.html',
            styleUrls: ['./post-card.component.scss']
        }),
        __metadata("design:paramtypes", [TranslateService,
            ToastController,
            Router,
            Platform,
            SocialSharing,
            ActionSheetController,
            ModalController,
            PopoverController,
            ApiService,
            FacebookService,
            AlertController,
            StorageService])
    ], PostCardComponent);
    return PostCardComponent;
}());
export { PostCardComponent };
var PostCardPopComponent = /** @class */ (function () {
    function PostCardPopComponent(popoverCtrl, navParams, storage) {
        this.popoverCtrl = popoverCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.isSelf = false;
    }
    PostCardPopComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.getUser()];
                    case 1:
                        user = _a.sent();
                        this.isSelf = (user.id === this.navParams.get('user_id'));
                        return [2 /*return*/];
                }
            });
        });
    };
    PostCardPopComponent.prototype.dissmis = function (acction) {
        this.popoverCtrl.dismiss(acction);
    };
    PostCardPopComponent = __decorate([
        Component({
            selector: 'app-post-card-pop',
            template: "<ion-list *ngIf=\"isSelf\">\n    <ion-item (click)=\"dissmis('update')\">{{ \"UPDATE\" | translate }}</ion-item>\n    <ion-item (click)=\"dissmis('delete')\">{{ \"DELETE\" | translate }}</ion-item>\n  </ion-list>\n  <ion-list *ngIf=\"!isSelf\">\n    <ion-item (click)=\"dissmis('report')\">{{ \"REPORT\" | translate }}</ion-item>\n  </ion-list>"
        }),
        __metadata("design:paramtypes", [PopoverController,
            NavParams,
            StorageService])
    ], PostCardPopComponent);
    return PostCardPopComponent;
}());
export { PostCardPopComponent };
//# sourceMappingURL=post-card.component.js.map