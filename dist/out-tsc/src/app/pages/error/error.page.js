import { __decorate, __metadata } from "tslib";
import { environment } from './../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
var ErrorPage = /** @class */ (function () {
    function ErrorPage(route, router) {
        this.route = route;
        this.router = router;
        this.error = {
            title: 'ERRORS_PAGE.NOT_FOUND.TITLE',
            code: '404',
            message: 'ERRORS_PAGE.NOT_FOUND.MESSAGE'
        };
    }
    ErrorPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params.error) {
                switch (params.error) {
                    case '400':
                        {
                            _this.error = {
                                title: 'ERRORS_PAGE.SOMETHING_WENT_WRONG.TITLE',
                                code: '400',
                                message: 'ERRORS_PAGE.SOMETHING_WENT_WRONG.MESSAGE'
                            };
                        }
                        break;
                    case '404':
                        {
                            _this.error = {
                                title: 'ERRORS_PAGE.NOT_FOUND.TITLE',
                                code: '404',
                                message: 'ERRORS_PAGE.NOT_FOUND.MESSAGE'
                            };
                        }
                        break;
                    case '406':
                        {
                            _this.error = {
                                title: 'ERRORS_PAGE.UNAUTHORIZED.TITLE',
                                code: '406',
                                message: 'ERRORS_PAGE.UNAUTHORIZED.MESSAGE'
                            };
                        }
                        break;
                }
            }
        });
    };
    ErrorPage.prototype.goToMain = function () {
        this.router.navigate([environment.MAIN_URL]);
    };
    ErrorPage = __decorate([
        Component({
            selector: 'app-error',
            templateUrl: './error.page.html',
            styleUrls: ['./error.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router])
    ], ErrorPage);
    return ErrorPage;
}());
export { ErrorPage };
//# sourceMappingURL=error.page.js.map