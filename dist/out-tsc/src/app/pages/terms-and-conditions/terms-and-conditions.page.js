import { __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
var TermsAndConditionsPage = /** @class */ (function () {
    function TermsAndConditionsPage(route) {
        this.route = route;
        this.segment = '';
    }
    TermsAndConditionsPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.segment = params.segment;
        });
    };
    /**
     * Navega hacia el componente que corresponda
     * @param {string} elementId
     */
    TermsAndConditionsPage.prototype.scrollTo = function (elementId) {
        this.content.scrollToPoint(0, document.getElementById(elementId).offsetTop, 1000);
    };
    __decorate([
        ViewChild(IonContent, { static: false }),
        __metadata("design:type", IonContent)
    ], TermsAndConditionsPage.prototype, "content", void 0);
    TermsAndConditionsPage = __decorate([
        Component({
            selector: 'app-terms-and-conditions',
            templateUrl: 'terms-and-conditions.page.html',
            styleUrls: ['terms-and-conditions.page.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute])
    ], TermsAndConditionsPage);
    return TermsAndConditionsPage;
}());
export { TermsAndConditionsPage };
//# sourceMappingURL=terms-and-conditions.page.js.map