import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
var NotificacionPage = /** @class */ (function () {
    function NotificacionPage(translate) {
        this.translate = translate;
        this.expandedEspecie = true;
        this.expandedEstatus = false;
        this.expandedSexo = true;
    }
    NotificacionPage.prototype.ngOnInit = function () {
    };
    NotificacionPage.prototype.goToAccount = function (valor) {
        switch (valor) {
            case 1:
                this.expandedEspecie = true;
                this.expandedEstatus = false;
                this.expandedSexo = false;
                break;
            case 2:
                this.expandedEspecie = false;
                this.expandedEstatus = true;
                this.expandedSexo = false;
                break;
            case 3:
                this.expandedEspecie = false;
                this.expandedEstatus = false;
                this.expandedSexo = true;
                break;
            default:
                this.expandedEspecie = true;
                this.expandedEstatus = false;
                this.expandedSexo = false;
                break;
        }
    };
    /**
    * Refresca la página.
    * @param event
    */
    NotificacionPage.prototype.doRefresh = function (event) {
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    NotificacionPage = __decorate([
        Component({
            selector: 'app-notificacion',
            templateUrl: './notificacion.page.html',
            styleUrls: ['./notificacion.page.scss'],
        }),
        __metadata("design:paramtypes", [TranslateService])
    ], NotificacionPage);
    return NotificacionPage;
}());
export { NotificacionPage };
//# sourceMappingURL=notificacion.page.js.map