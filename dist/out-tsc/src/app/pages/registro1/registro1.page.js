import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiService, GoogleMapsApiService } from './../../providers/providers';
var Registro1Page = /** @class */ (function () {
    function Registro1Page(api, googleMapsApi, route) {
        this.api = api;
        this.googleMapsApi = googleMapsApi;
        this.route = route;
        this.posts = [];
        this.lastPage = 1;
        this.search = '';
    }
    Registro1Page.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.route.params.subscribe(function (params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.userId = params.user_id;
                if (this.userId) {
                    this.getUserContact(this.userId);
                }
                this.getPosts(this.lastPage, this.userId);
                return [2 /*return*/];
            });
        }); });
    };
    Registro1Page.prototype.addPost = function (post) {
        this.posts.unshift(post);
    };
    /**
     * Recupera la información de los usuarios.
     * @param {number} page
     * @param {string} search
     * @return {Promise<boolean>} Regresa verdadero en caso de obtener más información y false en caso de obtener un error.
     */
    Registro1Page.prototype.getPosts = function (page, user_id, search) {
        if (page === void 0) { page = 1; }
        if (user_id === void 0) { user_id = null; }
        if (search === void 0) { search = ''; }
        return new Promise(function (result) {
            /*  this.lastPage = page;
              const path = (user_id) ? `/posts?page=${page}&user_id=${user_id}&search=${search}` : `/posts?page=${page}&search=${search}`;
              this.api.get(path).then((response: Pagination) => {
                if (page === 1) {
                  this.posts = response.data;
                } else {
                  response.data.map(posts => {
                    this.posts.push(posts);
                  });
                }
                result(true);
              }, (fail) => {
                console.log('[posts-51]', fail);
                result(false);
              });*/
        });
    };
    /**
     * Obtiene la información de un usuario.
     * @param {number} user_id
     * @param {number} page
     */
    Registro1Page.prototype.getUserContact = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Muestra un mapa.
     * @param {UserContact} userContact
     */
    Registro1Page.prototype.setMap = function (userContact) {
        return __awaiter(this, void 0, void 0, function () {
            var latLng, mapElement, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        latLng = {
                            lat: parseFloat(userContact.contact.address.lat),
                            lng: parseFloat(userContact.contact.address.lng)
                        };
                        mapElement = this.mapElement.nativeElement;
                        _a = this;
                        return [4 /*yield*/, this.googleMapsApi.setMap({ map: this.map, mapElement: mapElement,
                                latLng: latLng })];
                    case 1:
                        _a.map = _b.sent();
                        this.setMarker(userContact);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Establece la pocición del markador del usuario.
     * @param {UserContact} userContact
     */
    Registro1Page.prototype.setMarker = function (userContact) {
        return __awaiter(this, void 0, void 0, function () {
            var latLng, _a, marker, infoWindow;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        latLng = {
                            lat: parseFloat(userContact.contact.address.lat),
                            lng: parseFloat(userContact.contact.address.lng)
                        };
                        if (!!this.marker) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.googleMapsApi.setMarker({
                                content: "<h5>" + userContact.name + "</h5>",
                                latLng: latLng,
                                map: this.map,
                                title: userContact.name,
                                draggable: false
                            })];
                    case 1:
                        _a = _b.sent(), marker = _a.marker, infoWindow = _a.infoWindow;
                        this.marker = marker;
                        this.infoWindow = infoWindow;
                        return [3 /*break*/, 3];
                    case 2:
                        this.map.setCenter(latLng);
                        this.marker.setPosition(latLng);
                        this.infoWindow.setContent("<h5>" + userContact.name + "</h5>");
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Elimina un elemento de la lista.
     * @param {Post} post
     */
    Registro1Page.prototype.delete = function (post) {
        this.posts.splice(this.posts.indexOf(post), 1);
    };
    /**
     * Refresca la página.
     * @param event
     */
    Registro1Page.prototype.doRefresh = function (event) {
        this.lastPage = 1;
        this.getPosts(this.lastPage).then(function () {
            event.target.complete();
        });
    };
    /**
     * Llama a la función para cargar mas elementos cuando la página llega al final.
     * @param infiniteScroll
     */
    Registro1Page.prototype.doScrollDown = function (infiniteScroll) {
        this.getPosts(this.lastPage + 1, this.userId, this.search).then(function (success) {
            infiniteScroll.target.complete();
        });
    };
    Registro1Page.prototype.mailTo = function (email) {
        location.href = "mailto:" + email;
    };
    Registro1Page.prototype.callTo = function (phone) {
        location.href = "tel:+" + phone;
    };
    __decorate([
        ViewChild('mapCanvas', { static: false }),
        __metadata("design:type", ElementRef)
    ], Registro1Page.prototype, "mapElement", void 0);
    Registro1Page = __decorate([
        Component({
            selector: 'app-registro1',
            templateUrl: './registro1.page.html',
            styleUrls: ['./registro1.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            GoogleMapsApiService,
            ActivatedRoute])
    ], Registro1Page);
    return Registro1Page;
}());
export { Registro1Page };
//# sourceMappingURL=registro1.page.js.map