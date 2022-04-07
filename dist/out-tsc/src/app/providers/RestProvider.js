import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
var RestProvider = /** @class */ (function () {
    function RestProvider(http) {
        this.http = http;
        this.apiUrl = environment.SERVER_URL;
    }
    RestProvider.prototype.login = function (data) {
        var _this = this;
        console.log(data);
        return this.http.post(this.apiUrl + 'login', data)
            .pipe(tap(function (_) { return _this.log('inicio'); }), catchError(this.handleError('inicio', [])));
    };
    RestProvider.prototype.logout = function () {
        var _this = this;
        return this.http.get(this.apiUrl + 'signout')
            .pipe(tap(function (_) { return _this.log('logout'); }), catchError(this.handleError('logout', [])));
    };
    RestProvider.prototype.register = function (data) {
        var _this = this;
        return this.http.post(this.apiUrl + 'signup', data)
            .pipe(tap(function (_) { return _this.log('login'); }), catchError(this.handleError('login', [])));
    };
    RestProvider.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    /** Log a HeroService message with the MessageService */
    RestProvider.prototype.log = function (message) {
        console.log(message);
    };
    RestProvider = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], RestProvider);
    return RestProvider;
}());
export { RestProvider };
//# sourceMappingURL=RestProvider.js.map