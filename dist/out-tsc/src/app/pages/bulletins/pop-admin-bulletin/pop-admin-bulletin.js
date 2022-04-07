import { __decorate, __metadata } from "tslib";
import { PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';
/**
 * Genera un pop up, proporciona opciones.
 * @author Juan Lozoya <jlozoya1995@gmail.com>
 */
var PopAdminBulletin = /** @class */ (function () {
    function PopAdminBulletin(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
    }
    PopAdminBulletin.prototype.update = function () {
        this.dismiss('update');
    };
    PopAdminBulletin.prototype.delete = function () {
        this.dismiss('delete');
    };
    /**
     * Al cerrar el pop se puede regresar un mensaje.
     * @param {string} message
     */
    PopAdminBulletin.prototype.dismiss = function (message) {
        this.popoverCtrl.dismiss(message);
    };
    PopAdminBulletin = __decorate([
        Component({
            selector: './pop-admin-bulletin',
            templateUrl: './pop-admin-bulletin.html',
            styleUrls: ['./pop-admin-bulletin.scss']
        }),
        __metadata("design:paramtypes", [PopoverController])
    ], PopAdminBulletin);
    return PopAdminBulletin;
}());
export { PopAdminBulletin };
//# sourceMappingURL=pop-admin-bulletin.js.map