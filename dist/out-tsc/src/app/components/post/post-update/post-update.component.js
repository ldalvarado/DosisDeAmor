import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
var PostUpdateComponenet = /** @class */ (function () {
    function PostUpdateComponenet(modalCtrl, navParams, toastCtrl) {
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.postId = this.navParams.get('postId');
    }
    /**
     * Cierra el modal.
     */
    PostUpdateComponenet.prototype.dismiss = function (post) {
        this.modalCtrl.dismiss(post);
    };
    /**
     * Presenta un cuadro de mensaje.
     * @param {string} text Mensaje a mostrar.
     */
    PostUpdateComponenet.prototype.presentToast = function (text) {
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
    PostUpdateComponenet = __decorate([
        Component({
            selector: 'app-post-update',
            templateUrl: 'post-update.component.html',
            styleUrls: ['post-update.component.scss']
        }),
        __metadata("design:paramtypes", [ModalController,
            NavParams,
            ToastController])
    ], PostUpdateComponenet);
    return PostUpdateComponenet;
}());
export { PostUpdateComponenet };
//# sourceMappingURL=post-update.component.js.map