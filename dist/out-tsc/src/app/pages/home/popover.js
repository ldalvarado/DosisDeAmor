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
            template: "\n\n      <button >Report</button>\n      <button >Copy Share URL</button>\n      <button >Turn on Post Notifications</button>\n      <button >Share on Messenger</button>\n\n  "
        }),
        __metadata("design:paramtypes", [ToastController])
    ], PopoverComponent);
    return PopoverComponent;
}());
export { PopoverComponent };
//# sourceMappingURL=popover.js.map