import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { StorageService } from '../../providers/providers';
var TutorialPage = /** @class */ (function () {
    function TutorialPage(router, menu, storage) {
        this.router = router;
        this.menu = menu;
        this.storage = storage;
        this.lang = 'es';
    }
    TutorialPage.prototype.ngAfterViewInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.getLang()];
                    case 1:
                        _a.lang = (_b.sent()) || 'es';
                        this.slides.startAutoplay();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Navega hacia tabs main.
     */
    TutorialPage.prototype.startApp = function () {
        var _this = this;
        this.router.navigate([environment.MAIN_URL]).then(function () {
            _this.storage.setHasSeenTutorial(true);
        });
    };
    /**
     * Navega hacia login.
     */
    TutorialPage.prototype.startLogin = function () {
        var _this = this;
        this.router.navigate(['/login']).then(function () {
            _this.storage.setHasSeenTutorial(true);
        });
    };
    /**
     * Navega hacia signup.
     */
    TutorialPage.prototype.startSignUp = function () {
        var _this = this;
        this.router.navigate(['/signup']).then(function () {
            _this.storage.setHasSeenTutorial(true);
        });
    };
    /**
     * El menú raíz de la izquierda debe estar deshabilitado en la página de tutorial.
     */
    TutorialPage.prototype.ionViewDidEnter = function () {
        this.menu.enable(false);
    };
    /**
     * Habilitar el menú de la raíz izquierda al salir de la página de tutorial.
     */
    TutorialPage.prototype.ionViewWillLeave = function () {
        this.menu.enable(true);
    };
    /**
     * Actualiza el idioma selecionado por el usuario.
     */
    TutorialPage.prototype.setLang = function (lang) {
        this.storage.setLang(lang.target.value);
    };
    __decorate([
        ViewChild(IonSlides, { static: false }),
        __metadata("design:type", IonSlides)
    ], TutorialPage.prototype, "slides", void 0);
    TutorialPage = __decorate([
        Component({
            selector: 'app-tutorial',
            templateUrl: 'tutorial.page.html',
            styleUrls: ['tutorial.page.scss']
        }),
        __metadata("design:paramtypes", [Router,
            MenuController,
            StorageService])
    ], TutorialPage);
    return TutorialPage;
}());
export { TutorialPage };
//# sourceMappingURL=tutorial.page.js.map