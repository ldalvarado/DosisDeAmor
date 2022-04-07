import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
var PoliticsPage = /** @class */ (function () {
    function PoliticsPage(route) {
        this.route = route;
        this.segment = 'end_user_agreement';
    }
    PoliticsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.segment = params.segment || 'end_user_agreement';
        });
    };
    /**
     * Cambia el segmento donde se encuentra.
     * @param {string} segment
     */
    PoliticsPage.prototype.changeTo = function (segment) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.segment = segment;
                this.content.scrollToPoint(0, 0, 1000);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Navega hacia el componente que corresponda
     * @param {string} elementId
     */
    PoliticsPage.prototype.scrollTo = function (elementId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.content.scrollToPoint(0, document.getElementById(elementId).offsetTop, 1000);
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        ViewChild(IonContent, { static: false }),
        __metadata("design:type", IonContent)
    ], PoliticsPage.prototype, "content", void 0);
    PoliticsPage = __decorate([
        Component({
            selector: 'app-politics',
            templateUrl: 'politics.page.html',
            styleUrls: ['politics.page.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute])
    ], PoliticsPage);
    return PoliticsPage;
}());
export { PoliticsPage };
//# sourceMappingURL=politics.page.js.map