import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
/**
 * Genera un modal, muestra un formulario para crear una nueva organización de viaje.
 * @author <a href="mailto:jlozoya1995@gmail.com">Juan Lozoya</a>
 *
 * @param {1/1 | 4 / 3 | 16 / 9} aspectRatio
 * @param {number} targetWidth
 * @param {string} imageBase64
 *
 * @returns string
 */
var CropImgComponent = /** @class */ (function () {
    function CropImgComponent(modalCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.imageBase64 = '';
        this.croppedImage = '';
        this.targetWidth = 200;
        this.aspectRatio = 1;
    }
    /**
     * Lee los parametros de entrada.
     */
    CropImgComponent.prototype.ngOnInit = function () {
        this.aspectRatio = this.navParams.get('aspectRatio') || 1;
        this.targetWidth = this.navParams.get('targetWidth') || 200;
        this.imageBase64 = this.navParams.get('imageBase64');
    };
    /**
     * Regresa la imagen recortada.
     * @param {string} image
     */
    CropImgComponent.prototype.imageCropped = function (image) {
        this.croppedImage = image;
    };
    /**
     * Cierra la vista.
     */
    CropImgComponent.prototype.returnImg = function () {
        this.modalCtrl.dismiss(this.croppedImage || this.imageBase64, 'img');
    };
    /**
     * Cierra el modal.
     */
    CropImgComponent.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    CropImgComponent = __decorate([
        Component({
            selector: 'app-crop-img',
            templateUrl: 'crop-img.component.html',
            styleUrls: ['crop-img.component.scss']
        }),
        __metadata("design:paramtypes", [ModalController,
            NavParams])
    ], CropImgComponent);
    return CropImgComponent;
}());
export { CropImgComponent };
//# sourceMappingURL=crop-img.component.js.map