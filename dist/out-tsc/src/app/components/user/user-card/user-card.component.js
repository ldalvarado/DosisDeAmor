import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { environment } from './../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ApiService, StorageService } from './../../../providers/providers';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, Events } from '@ionic/angular';
var UserCardComponent = /** @class */ (function () {
    function UserCardComponent(router, api, translate, toastCtrl, events, storage) {
        this.router = router;
        this.api = api;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.storage = storage;
    }
    UserCardComponent.prototype.ngOnInit = function () { };
    /**
     * Navega hacia la página de detalles del usuario.
     * @param {User} user
     */
    UserCardComponent.prototype.goToUserDetail = function (user) {
        this.router.navigate(['/account', user.id]);
    };
    /**
   * Establece el rol del usuario.
   * @param {User} user
   */
    UserCardComponent.prototype.changeRole = function (user) {
        var _this = this;
        this.api.put("/user/role/" + user.id, { role: user.role }).then(function (userRole) {
            user.role = userRole;
            _this.storage.getUser().then(function (localUser) {
                if (_this.user.id === localUser.id) {
                    _this.events.publish('user:role', userRole);
                    if (userRole !== 'admin') {
                        _this.router.navigate([environment.MAIN_URL]);
                    }
                }
                _this.presentToast(_this.translate.instant('FORM.SUCCESS'));
            });
        }, function (fail) {
            console.log('[user-101]', fail);
            _this.presentToast(_this.translate.instant('FORM.ERROR'));
        });
    };
    /**
     * Presenta un cuadro de mensaje.
     * @param {string} text Mensaje a mostrar.
     */
    UserCardComponent.prototype.presentToast = function (text) {
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
    ], UserCardComponent.prototype, "user", void 0);
    UserCardComponent = __decorate([
        Component({
            selector: 'app-user-card',
            templateUrl: './user-card.component.html',
            styleUrls: ['./user-card.component.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            ApiService,
            TranslateService,
            ToastController,
            Events,
            StorageService])
    ], UserCardComponent);
    return UserCardComponent;
}());
export { UserCardComponent };
//# sourceMappingURL=user-card.component.js.map