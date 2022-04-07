import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { StorageService } from './../storage/storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
/**
 * @name Api
 * @description
 * Api es un controlador genérico de REST Api. Establezca su URL de API primero.
 *
 * @usage
 *
 * ```typescript
 * import { Api } from './../../providers/providers';
 *
 * class MyClass {
 *  constructor(private api: Api) {
 *    this.miFunction();
 *  }
 *
 *  myFunction() {
 *    this.api.post(inUrl, 'query', 10000).then((success) => {
 *      console.log(success);
 *    }, fail => {
 *      console.log(fail);
 *    });
 *  }
 * }
 * ```
 */
var ApiService = /** @class */ (function () {
    function ApiService(http, storage, router) {
        this.http = http;
        this.storage = storage;
        this.router = router;
        /**
         * Es la variable donde se asigna la url.
         */
        this.url = environment.SERVER_URL;
        /**
         * Contar los intentos de comunicación fallidos.
         */
        this.attemptsFailed = 0;
    }
    /**
     * Regresa la url del servidor web ej.: 'http://xxx.xxx.xxx.xxx/xx'.
     * @return {string} url
     */
    ApiService.prototype.getUrl = function () {
        return this.url;
    };
    /**
     * Regresa el host del servidor web ej.: 'xxx.xxx.xxx.xxx'.
     * @return {string} url
     */
    ApiService.prototype.getHost = function () {
        return this.url.split('/').slice(0, -1).join('/');
    };
    /**
     * @name post
     * @description
     * Se envia una peticion `POST` a un servidor web y regresa los datos que son recuperados.
     *
     * @usage
     *
     * ```typescript
     * const query = {
     *  foo: foo,
     *  var: var
     * };
     * this.api.post(inUrl, query, 10000).then(
     * (success) => {
     *  console.log(success);
     * }, fail => {
     *  console.log(fail);
     * });
     * ```
     *
     * @param {string} inUrl url a donde hacer post.
     * @param {any} query Es la consulta a realizar.
     * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
     */
    ApiService.prototype.post = function (inUrl, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var headers, _a, _b, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = HttpHeaders.bind;
                        _b = {
                            'Content-Type': 'application/json'
                        };
                        _c = 'Authorization';
                        _d = "Bearer ";
                        return [4 /*yield*/, this.storage.getAccessToken()];
                    case 1:
                        headers = new (_a.apply(HttpHeaders, [void 0, (_b[_c] = _d + (_e.sent()),
                                _b)]))();
                        this.http.post("" + this.url + inUrl, query, { headers: headers }).subscribe(function (response) {
                            resolve(response);
                        }, function (fail) {
                            _this.logout(fail);
                            reject(fail);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * @name get
     * @description
     * Se envia una peticion `GET` a un servidor web y regresa los datos que son recuperados.
     *
     * @usage
     *
     * ```typescript
     * this.api.get(inUrl, 10000).then(
     * (success) => {
     *  console.log(success);
     * }, fail => {
     *  console.log(fail);
     * });
     * ```
     *
     * @param {string} inUrl url a donde hacer post.
     * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
     */
    ApiService.prototype.get = function (inUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var headers, _a, _b, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = HttpHeaders.bind;
                        _b = {
                            'Content-Type': 'application/json'
                        };
                        _c = 'Authorization';
                        _d = "Bearer ";
                        return [4 /*yield*/, this.storage.getAccessToken()];
                    case 1:
                        headers = new (_a.apply(HttpHeaders, [void 0, (_b[_c] = _d + (_e.sent()),
                                _b)]))();
                        this.http.get("" + this.url + inUrl.trim().replace(' ', '+'), { headers: headers }).subscribe(function (response) {
                            resolve(response);
                        }, function (fail) {
                            _this.logout(fail);
                            reject(fail);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * @name delete
     * @description
     * Se envia una peticion `DELETE` a un servidor web y regresa los datos que son recuperados.
     *
     * @usage
     *
     * ```typescript
     * this.api.delete(inUrl, 10000).then(
     * (success) => {
     *  console.log(success);
     * }, fail => {
     *  console.log(fail);
     * });
     * ```
     *
     * @param {string} inUrl url a donde hacer post.
     * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
     */
    ApiService.prototype.delete = function (inUrl) {
        var _this = this;
        var formedUrl = inUrl.split(' ').join('-');
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var headers, _a, _b, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = HttpHeaders.bind;
                        _b = {
                            'Content-Type': 'application/json'
                        };
                        _c = 'Authorization';
                        _d = "Bearer ";
                        return [4 /*yield*/, this.storage.getAccessToken()];
                    case 1:
                        headers = new (_a.apply(HttpHeaders, [void 0, (_b[_c] = _d + (_e.sent()),
                                _b)]))();
                        this.http.delete("" + this.url + formedUrl, { headers: headers }).subscribe(function (response) {
                            resolve(response);
                        }, function (fail) {
                            _this.logout(fail);
                            reject(fail);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * @name put
     * @description
     * Se envia una peticion `PUT` a un servidor web y regresa los datos que son recuperados.
     *
     * @usage
     *
     * ```typescript
     * const query = {
     *  foo: foo,
     *  var: var
     * };
     * this.api.put(inUrl, query, 10000).then(
     * (success) => {
     *  console.log(success);
     * }, fail => {
     *  console.log(fail);
     * });
     * ```
     *
     * @param {string} inUrl url a donde hacer post.
     * @param {any} query Es la consulta a realizar.
     * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
     */
    ApiService.prototype.put = function (inUrl, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var headers, _a, _b, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = HttpHeaders.bind;
                        _b = {
                            'Content-Type': 'application/json'
                        };
                        _c = 'Authorization';
                        _d = "Bearer ";
                        return [4 /*yield*/, this.storage.getAccessToken()];
                    case 1:
                        headers = new (_a.apply(HttpHeaders, [void 0, (_b[_c] = _d + (_e.sent()),
                                _b)]))();
                        this.http.put("" + this.url + inUrl, query, { headers: headers }).subscribe(function (response) {
                            resolve(response);
                        }, function (fail) {
                            _this.logout(fail);
                            reject(fail);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Función para cerrar sesión cuando el usuario no está correctamente logeado.
     */
    ApiService.prototype.logout = function (fail) {
        if (fail.status !== 500) {
            if (fail.error === 'SERVER.NO_SESION') {
                this.attemptsFailed++;
                if (this.attemptsFailed >= 3) {
                    this.storage.logout();
                    this.router.navigate([environment.MAIN_URL]);
                }
            }
        }
    };
    ApiService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            StorageService,
            Router])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map