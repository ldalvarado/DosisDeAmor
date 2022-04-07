import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
var MainPage = /** @class */ (function () {
    function MainPage() {
        this.facebookChat = true;
    }
    /**
     * Al entrar a la vista abre el chat de facebook
     */
    MainPage.prototype.ionViewDidEnter = function () {
        this.facebookChat = true;
    };
    /**
     * Al salir de la vista cierra el chat de facebook
     */
    MainPage.prototype.ionViewDidLeave = function () {
        this.facebookChat = false;
    };
    MainPage = __decorate([
        Component({
            selector: 'app-main',
            templateUrl: 'main.page.html',
            styleUrls: ['main.page.scss']
        }),
        __metadata("design:paramtypes", [])
    ], MainPage);
    return MainPage;
}());
export { MainPage };
//# sourceMappingURL=main.page.js.map