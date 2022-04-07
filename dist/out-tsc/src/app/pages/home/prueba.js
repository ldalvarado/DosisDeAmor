import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
var PopoverComponent = /** @class */ (function () {
    function PopoverComponent(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    /**
      * Presenta un cuadro de mensaje.
      * @param {string} text Mensaje a mostrar.
      */
    PopoverComponent.prototype.presentToast = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: 'Notification',
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    PopoverComponent = __decorate([
        Component({
            template: "\n<ion-list *ngFor=\"let s of window.localStorage['mascota']\">\n  <ion-item>\n    <ion-label>{{s.Nombre }}</ion-label>\n  </ion-item>\n</ion-list>\n      <button (click)=\"close()\">Report</button>\n      <button (click)=\"close()\">Copy Share URL</button>\n      <button (click)=\"close()\">Turn on Post Notifications</button>\n      <button (click)=\"close()\">Share on Messenger</button>\n\n  "
        }),
        __metadata("design:paramtypes", [ToastController])
    ], PopoverComponent);
    return PopoverComponent;
}());
export { PopoverComponent };
//# sourceMappingURL=prueba.js.map