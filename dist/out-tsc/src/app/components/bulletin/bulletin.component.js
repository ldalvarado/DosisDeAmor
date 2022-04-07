import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Router } from '@angular/router';
import { ApiService } from './../../providers/providers';
import { Component } from '@angular/core';
var BulletinComponent = /** @class */ (function () {
    function BulletinComponent(router, api) {
        this.router = router;
        this.api = api;
        this.bulletins = [];
    }
    /**
     * Al cargar el componenete.
     */
    BulletinComponent.prototype.ngOnInit = function () {
        this.getBulletins();
    };
    /**
     * Obtiene las ultimas noticias publicadas.
     */
    BulletinComponent.prototype.getBulletins = function () {
        var _this = this;
        return new Promise(function (finish) { return __awaiter(_this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get('/bulletins').catch(function (error) {
                            console.log('[bulletin-30]', error);
                        })];
                    case 1:
                        pages = _a.sent();
                        this.bulletins = (pages) ? pages.data : [];
                        finish();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Refresca la página.
     * @param event
     */
    BulletinComponent.prototype.doRefresh = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBulletins()];
                    case 1:
                        _a.sent();
                        event.target.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Abre la página para ver mas.
     */
    BulletinComponent.prototype.seeMore = function () {
        this.router.navigate(['/bulletins']);
    };
    BulletinComponent = __decorate([
        Component({
            selector: 'app-bulletin',
            templateUrl: './bulletin.component.html',
            styleUrls: ['./bulletin.component.scss']
        }),
        __metadata("design:paramtypes", [Router,
            ApiService])
    ], BulletinComponent);
    return BulletinComponent;
}());
export { BulletinComponent };
//# sourceMappingURL=bulletin.component.js.map