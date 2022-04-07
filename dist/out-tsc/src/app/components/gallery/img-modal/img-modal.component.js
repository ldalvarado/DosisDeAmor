import { __decorate, __metadata } from "tslib";
import { NavParams, ModalController, IonSlides } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
var ImgModalComponent = /** @class */ (function () {
    function ImgModalComponent(modalCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.imgs = [];
    }
    ImgModalComponent.prototype.ngOnInit = function () {
        this.imgs = this.navParams.get('imgs');
        this.position = this.navParams.get('position') || 0;
        this.source = this.navParams.get('source') || '';
        this.source_id = this.navParams.get('source_id') || 1;
    };
    ImgModalComponent.prototype.ngAfterViewInit = function () {
        this.slider.slideTo(this.position, 500);
    };
    /**
     * Cierra el modal.
     */
    ImgModalComponent.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    __decorate([
        ViewChild('mySlider', { static: false }),
        __metadata("design:type", IonSlides)
    ], ImgModalComponent.prototype, "slider", void 0);
    ImgModalComponent = __decorate([
        Component({
            selector: 'app-img-modal',
            templateUrl: './img-modal.component.html',
            styleUrls: ['./img-modal.component.scss']
        }),
        __metadata("design:paramtypes", [ModalController,
            NavParams])
    ], ImgModalComponent);
    return ImgModalComponent;
}());
export { ImgModalComponent };
//# sourceMappingURL=img-modal.component.js.map