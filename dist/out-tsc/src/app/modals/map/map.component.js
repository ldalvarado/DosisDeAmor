import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiService, GoogleMapsApiService } from '../../providers/providers';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
var MapComponent = /** @class */ (function () {
    function MapComponent(api, navParams, toastCtrl, modalCtrl, googleMapsApi) {
        this.api = api;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.googleMapsApi = googleMapsApi;
        this.markers = [];
    }
    MapComponent.prototype.ngAfterViewInit = function () {
        this.setMap(this.navParams.get('post'));
    };
    /**
     * Establece el mapa.
     * @param {User} user
     */
    MapComponent.prototype.setMap = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var mapElement, latLng, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mapElement = this.mapElement.nativeElement;
                        latLng = { lat: 24.020, lng: -104.658 };
                        if (post.direction && post.direction.lat && post.direction.lng) {
                            latLng.lat = parseFloat(post.direction.lat);
                            latLng.lng = parseFloat(post.direction.lng);
                        }
                        _a = this;
                        return [4 /*yield*/, this.googleMapsApi.setMap({ map: this.map, mapElement: mapElement, latLng: latLng })];
                    case 1:
                        _a.map = _b.sent();
                        if (post.direction && post.direction.lat && post.direction.lng) {
                            this.map.setCenter(latLng);
                            this.addMarker(post);
                        }
                        this.getAnotherPoints(post).then(function (posts) {
                            posts.forEach(function (inPost) {
                                if (inPost.id !== post.id) {
                                    _this.addMarker(inPost);
                                }
                            });
                        }, function (fail) {
                            console.log('[posts-51]', fail);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MapComponent.prototype.getAnotherPoints = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/posts?latLng=" + post.direction.lat + "," + post.direction.lng)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Establece la pocición del markador del usuario.
     * @param {Usre} user
     */
    MapComponent.prototype.addMarker = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var latLng, marker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        latLng = { lat: parseFloat(post.direction.lat), lng: parseFloat(post.direction.lng) };
                        if (!(latLng.lat !== 0 && latLng.lng !== 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.googleMapsApi.setMarker({
                                content: "<p>" + post.description + "</p>",
                                latLng: latLng,
                                map: this.map,
                                title: post.description,
                                draggable: false
                            })];
                    case 1:
                        marker = (_a.sent()).marker;
                        this.markers.push(marker);
                        if (post.direction_accuracy) {
                            this.googleMapsApi.addCircle({
                                map: this.map,
                                center: latLng,
                                radius: post.direction_accuracy
                            });
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Cierra el modal.
    */
    MapComponent.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    /**
     * Presenta un cuadro de mensaje.
     * @param {string} text Mensaje a mostrar.
     */
    MapComponent.prototype.presentToast = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: text,
                            duration: 3000,
                            position: 'bottom'
                        })];
                    case 1:
                        toast = _a.sent();
                        return [4 /*yield*/, toast.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        ViewChild('mapCanvas', { static: false }),
        __metadata("design:type", ElementRef)
    ], MapComponent.prototype, "mapElement", void 0);
    MapComponent = __decorate([
        Component({
            selector: 'app-map',
            templateUrl: 'map.component.html',
            styleUrls: ['map.component.scss']
        }),
        __metadata("design:paramtypes", [ApiService,
            NavParams,
            ToastController,
            ModalController,
            GoogleMapsApiService])
    ], MapComponent);
    return MapComponent;
}());
export { MapComponent };
//# sourceMappingURL=map.component.js.map