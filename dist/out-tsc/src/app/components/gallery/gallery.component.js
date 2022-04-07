import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { ModalController } from '@ionic/angular';
import { Component, Input } from '@angular/core';
import { ImgModalComponent } from './img-modal/img-modal.component';
var GalleryComponent = /** @class */ (function () {
    function GalleryComponent(modalCtrl) {
        this.modalCtrl = modalCtrl;
        this.offset = 0;
        this.imgs = [];
        this.source = '';
        this.source_id = 1;
    }
    GalleryComponent.prototype.ngOnInit = function () {
        if (this.imgs && this.imgs.length > 5) {
            this.offset = this.imgs.length - 5;
        }
    };
    GalleryComponent.prototype.openImgModal = function (img) {
        return __awaiter(this, void 0, void 0, function () {
            var imgModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: ImgModalComponent,
                            componentProps: {
                                imgs: this.imgs,
                                position: this.imgs.indexOf(img),
                                source: this.source,
                                source_id: this.source_id
                            }
                        })];
                    case 1:
                        imgModal = _a.sent();
                        setTimeout(function () {
                            imgModal.present();
                        }, 500);
                        imgModal.onDidDismiss().then(function (detail) {
                            // console.log(detail);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], GalleryComponent.prototype, "imgs", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GalleryComponent.prototype, "source", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GalleryComponent.prototype, "source_id", void 0);
    GalleryComponent = __decorate([
        Component({
            selector: 'app-gallery',
            templateUrl: './gallery.component.html',
            styleUrls: ['./gallery.component.scss']
        }),
        __metadata("design:paramtypes", [ModalController])
    ], GalleryComponent);
    return GalleryComponent;
}());
export { GalleryComponent };
//# sourceMappingURL=gallery.component.js.map