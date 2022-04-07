import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { TranslateService } from '@ngx-translate/core';
import { PopAdminBulletin } from './pop-admin-bulletin/pop-admin-bulletin';
import { ModalController, PopoverController, AlertController } from '@ionic/angular';
import { Component, NgZone } from '@angular/core';
import { ApiService, StorageService } from '../../providers/providers';
import { ModalBulletinPage } from './modal-bulletin/modal-bulletin.page';
var BulletinsPage = /** @class */ (function () {
    function BulletinsPage(api, modalCtrl, popoverCtrl, storage, alertCtrl, translate, zone) {
        var _this = this;
        this.api = api;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.zone = zone;
        this.bulletins = [];
        this.lastPage = 1;
        this.userRole = 'visitor';
        this.storage.getUserRole().then(function (userRole) {
            _this.userRole = userRole;
        });
    }
    /**
     * Se ejecuta despues del constructor.
     */
    BulletinsPage.prototype.ngOnInit = function () {
        this.getBulletins();
    };
    /**
     * Obtiene las ultimas noticias publicadas.
     * @param {number} page
     * @return {Promise<boolean>} Regresa verdadero en caso de obtener más información y false en caso de obtener un error.
     */
    BulletinsPage.prototype.getBulletins = function (page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        return new Promise(function (result) {
            _this.api.get("/bulletins?page=" + page).then(function (pages) {
                if (page === 1) {
                    _this.bulletins = pages.data;
                }
                else {
                    pages.data.map(function (bulletin) {
                        _this.bulletins.push(bulletin);
                    });
                }
                result(true);
            }, function (fail) {
                console.log('[bulletin-52]', fail);
                result(false);
            });
        });
    };
    /**
     * Refresca la página.
     * @param event
     */
    BulletinsPage.prototype.doRefresh = function (event) {
        this.getBulletins().then(function () {
            event.target.complete();
        });
    };
    /**
     * Llama a la función para cargar mas elementos cuando la página llega al final.
     * @param infiniteScroll
     */
    BulletinsPage.prototype.doScrollDown = function (infiniteScroll) {
        this.getBulletins(this.lastPage + 1).then(function () {
            infiniteScroll.target.complete();
        });
    };
    /**
     * Crear una nueva noticia.
     * @param {Bulletin} bulletin
     * @param {number} bulletin_id
     */
    BulletinsPage.prototype.modalBulletin = function (bulletin, bulletin_id) {
        return __awaiter(this, void 0, void 0, function () {
            var modalBulletinPage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: ModalBulletinPage,
                            componentProps: { bulletin_id: bulletin_id }
                        })];
                    case 1:
                        modalBulletinPage = _a.sent();
                        return [4 /*yield*/, modalBulletinPage.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modalBulletinPage.onDidDismiss().then(function (detail) {
                                if (detail.data) {
                                    if (_this.bulletins.indexOf(bulletin) > -1) {
                                        _this.bulletins[_this.bulletins.indexOf(bulletin)] = detail.data;
                                    }
                                    else {
                                        _this.getBulletins();
                                    }
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
     * Despliega un popover.
     * @param {Event} event
     * @param {Bulletin} bulletin
     */
    BulletinsPage.prototype.presentPopover = function (event, bulletin) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({ component: PopAdminBulletin, componentProps: { bulletin: bulletin }, event: event })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, popover.onDidDismiss().then(function (detail) {
                                if (detail.data) {
                                    switch (detail.data) {
                                        case 'update':
                                            {
                                                _this.modalBulletin(bulletin, bulletin.id);
                                            }
                                            break;
                                        case 'delete':
                                            {
                                                _this.deleteBulletin(bulletin);
                                            }
                                            break;
                                    }
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
     * Envía la instrucción para eliminar una noticia.
     * @param {Bulletin} bulletin
     */
    BulletinsPage.prototype.deleteBulletin = function (bulletin) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: this.translate.instant('BULLETIN.ALERTS.DELETE_BULLETIN.TITLE'),
                            message: this.translate.instant('BULLETIN.ALERTS.DELETE_BULLETIN.MESSAGE'),
                            buttons: [
                                {
                                    text: this.translate.instant('CANCEL'),
                                    role: 'cancel',
                                    handler: function () { }
                                },
                                {
                                    text: this.translate.instant('ACCEPT'),
                                    handler: function () {
                                        _this.api.delete("/bulletin/" + bulletin.id).then(function (response) {
                                            _this.zone.run(function () {
                                                _this.bulletins.splice(_this.bulletins.indexOf(bulletin), 1);
                                            });
                                        }, function (fail) {
                                            console.log('[bulletins-141]', fail);
                                        });
                                    }
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
    BulletinsPage = __decorate([
        Component({
            selector: 'app-bulletins',
            templateUrl: './bulletins.page.html',
            styleUrls: ['./bulletins.page.scss']
        }),
        __metadata("design:paramtypes", [ApiService,
            ModalController,
            PopoverController,
            StorageService,
            AlertController,
            TranslateService,
            NgZone])
    ], BulletinsPage);
    return BulletinsPage;
}());
export { BulletinsPage };
//# sourceMappingURL=bulletins.page.js.map