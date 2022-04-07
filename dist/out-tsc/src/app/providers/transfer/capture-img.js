import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
/**
 * Modulo para subir imágenes al servidor.
 */
var TomarFoto = /** @class */ (function () {
    function TomarFoto() {
    }
    TomarFoto.prototype.getImg = function () {
        var cameraPreviewOpts = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            camera: 'rear',
            tapPhoto: true,
            previewDrag: true,
            toBack: true,
            alpha: 1
        };
    };
    TomarFoto = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], TomarFoto);
    return TomarFoto;
}());
export { TomarFoto };
//# sourceMappingURL=capture-img.js.map