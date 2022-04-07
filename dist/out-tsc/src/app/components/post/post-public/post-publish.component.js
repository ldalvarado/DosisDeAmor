import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { TranslateService } from '@ngx-translate/core';
import { AddEmailsPhonesComponent } from '../../../modals/add-emails-phones/add-emails-phones.component';
import { Platform, ModalController, AlertController } from '@ionic/angular';
import { Component, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService, GoogleMapsApiService, ApiService, TransferImgFileService } from '../../../providers/providers';
import { Router, NavigationEnd, RouteConfigLoadEnd } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { HomePage } from './../../../pages/home/home.page';
import { TabsPage } from './../../../pages/tabs/tabs.page';
var PostPublishComponent = /** @class */ (function () {
    //camaretia = CameraPreview;
    function PostPublishComponent(platform, router, storage, googleMapsApi, api, http, transferImgFile, modalCtrl, alertCtrl, translate, hom, tab, toastCtrl, formBuilder) {
        var _this = this;
        this.platform = platform;
        this.router = router;
        this.storage = storage;
        this.googleMapsApi = googleMapsApi;
        this.api = api;
        this.http = http;
        this.transferImgFile = transferImgFile;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.hom = hom;
        this.tab = tab;
        this.toastCtrl = toastCtrl;
        this.isBrowser = true;
        this.addDirection = false;
        // On drag img
        this.enterTarget = null;
        this.dragClasses = {
            onDrag: false,
        };
        this.files = [];
        this.isReadyToSend = false;
        this.appPostSend = new EventEmitter();
        // Collapse menu
        this.expanded = false;
        this.usuario_id = window.localStorage['usuario_id'];
        this.usuario = window.localStorage['usuario'];
        this.list_mascotas = [];
        this.apiUrl = environment.SERVER_URL;
        this.archivos = [];
        this.fotoPerfil = window.localStorage['fotoPerfil'];
        this.compareWithFn = function (o1, o2) {
            return o1 && o2 ? o1.id === o2.id : o1 === o2;
        };
        this.compareWith = this.compareWithFn;
        this.isBrowser = (!this.platform.is('android') && !this.platform.is('ios')) || this.platform.is('mobileweb');
        this.postForm = formBuilder.group({
            description: ['', [Validators.required]],
            state: ['', [Validators.required]],
            direction_accuracy: [0, Validators.nullValidator],
            direction: formBuilder.group({
                country: ['', [Validators.nullValidator]],
                administrative_area_level_1: ['', [Validators.nullValidator]],
                administrative_area_level_2: ['', [Validators.nullValidator]],
                locality: ['', [Validators.nullValidator]],
                sublocality_level_1: ['', [Validators.nullValidator]],
                route: ['', [Validators.nullValidator]],
                street_number: ['', [Validators.nullValidator]],
                postal_code: ['', [Validators.nullValidator]],
                mts2_construction: ['', [Validators.nullValidator]],
                observacion: ['', [Validators.nullValidator]],
                lat: ['', [Validators.nullValidator]],
                lng: ['', [Validators.nullValidator]],
            })
        });
        this.postForm.valueChanges.subscribe(function (v) {
            _this.isReadyToSend = _this.postForm.valid;
        });
    }
    PostPublishComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.getUser()];
                    case 1:
                        _a.user = _b.sent();
                        this.router.events.subscribe(function (event) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(event instanceof RouteConfigLoadEnd || event instanceof NavigationEnd)) return [3 /*break*/, 2];
                                        _a = this;
                                        return [4 /*yield*/, this.storage.getUser()];
                                    case 1:
                                        _a.user = _b.sent();
                                        _b.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        this.getListMascota();
                        if (this.mapElement) {
                            this.setMap();
                        }
                        if (this.postId) {
                            this.getPost();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PostPublishComponent.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.usuario_id = window.localStorage['usuario_id'];
                this.usuario = window.localStorage['usuario'];
                this.getListMascota();
                return [2 /*return*/];
            });
        });
    };
    /*
    * Busca las mascotas del sistema
    */
    PostPublishComponent.prototype.getListMascota = function () {
        var _this = this;
        this.api.get("pets/" + this.usuario_id).then(function (userContact) {
            if (userContact.length && userContact !== 'Lista Vacia') {
                _this.list_mascotas = userContact;
            }
        }).catch(function (error) {
            console.log('[privacy-55]', error);
        });
    };
    /**
     * Establece la información del elemento a actualizar.
     */
    PostPublishComponent.prototype.getPost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/post/" + this.postId)];
                    case 1:
                        post = _a.sent();
                        this.postForm.patchValue({
                            id: this.postId,
                            description: post.description,
                            state: post.state,
                            direction_accuracy: post.direction_accuracy,
                        });
                        if (post.direction) {
                            this.postForm.patchValue({
                                direction: {
                                    country: post.direction.country,
                                    administrative_area_level_1: post.direction.administrative_area_level_1,
                                    administrative_area_level_2: post.direction.administrative_area_level_2,
                                    route: post.direction.route,
                                    street_number: post.direction.street_number,
                                    postal_code: post.direction.postal_code,
                                    lat: post.direction.lat,
                                    lng: post.direction.lng
                                }
                            });
                            this.addDirection = true;
                            if (parseFloat(post.direction.lat) && parseFloat(post.direction.lng)) {
                                this.setMarker(this.postForm.value.description, {
                                    lat: parseFloat(post.direction.lat),
                                    lng: parseFloat(post.direction.lng)
                                });
                            }
                        }
                        this.files = post.media || [];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Navega hacia la pagina de la cuenta del usuario.
     */
    PostPublishComponent.prototype.goToAccount = function () {
        this.router.navigate(['/account']);
    };
    /**
     * Navega hacia la pagina del login.
     */
    PostPublishComponent.prototype.goToLogin = function () {
        this.router.navigate(['/login']);
    };
    /**
     * Valida el formulario y evia toda la información.
     */
    PostPublishComponent.prototype.sendPost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, request_1, query, post;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.postForm.valid) {
                            return [2 /*return*/];
                        }
                        if (!this.postId) return [3 /*break*/, 1];
                        return [3 /*break*/, 4];
                    case 1:
                        headers = new HttpHeaders();
                        request_1 = ({ headers: headers });
                        if (!this.files.length) return [3 /*break*/, 2];
                        this.files.forEach(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            var x, query;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!!file.type) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.transferImgFile.uploadImg('subirfoto', file.url, { params: {
                                                    id_usuario: this.usuario_id.toString(),
                                                    perfil: 0,
                                                    idMascota: this.postForm.value.state
                                                } })];
                                    case 1:
                                        x = _a.sent();
                                        if (x[0]['idFoto'] !== null) {
                                            query = {
                                                contenido: this.postForm.value.description,
                                                foto: true,
                                                video: false,
                                                archivo: x[0]['idFoto'],
                                                id_mascotas: this.postForm.value.state
                                            };
                                            console.log(x[0]['idFoto'], 'subir foto');
                                            this.http.post(this.apiUrl + 'publicar' + '?json=' + JSON.stringify(query), JSON.stringify(query), request_1)
                                                .subscribe(function (data) {
                                                if (data['status'] != "error") {
                                                    _this.postForm.reset();
                                                    _this.archivos.splice(0, 1);
                                                    _this.files.splice(0, 1);
                                                }
                                                _this.presentToast(data['message']);
                                            });
                                        }
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 4];
                    case 2:
                        query = {
                            contenido: this.postForm.value.description,
                            foto: false,
                            video: false,
                            id_mascotas: this.postForm.value.state
                        };
                        return [4 /*yield*/, this.http.post(this.apiUrl + 'publicar' + '?json=' + JSON.stringify(query), JSON.stringify(query), request_1)
                                .subscribe(function (data) {
                                if (data['status'] != "error") {
                                    _this.postForm.reset();
                                }
                                _this.presentToast(data['message']);
                            })];
                    case 3:
                        post = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Toma la lista de archivos y los sube
     * @param {Post} post
     */
    PostPublishComponent.prototype.uploadImgs = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                post.user = this.user;
                if (this.files.length) {
                    post.media = [];
                    this.files.forEach(function (file) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (!!file.type) return [3 /*break*/, 2];
                                    _b = (_a = post.media).push;
                                    return [4 /*yield*/, this.transferImgFile.uploadImg('/post/file', file.url, { params: {
                                                id: post.id
                                            } })];
                                case 1:
                                    _b.apply(_a, [_c.sent()]);
                                    _c.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    this.files = [];
                    this.postForm.reset();
                    this.appPostSend.emit(post);
                }
                else {
                    this.postForm.reset();
                    this.appPostSend.emit(post);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Establece el mapa.
     */
    PostPublishComponent.prototype.setMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mapElement, latLng, mapOptions, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mapElement = this.mapElement.nativeElement;
                        latLng = { lat: 10.073532, lng: -69.326608 };
                        mapOptions = {
                            zoom: 8,
                            mapTypeId: 'satellite'
                        };
                        _a = this;
                        return [4 /*yield*/, this.googleMapsApi.setMap({ map: this.map, mapElement: mapElement, latLng: latLng })];
                    case 1:
                        _a.map = _b.sent();
                        this.googleMapsApi.addListenerOnce(this.map, 'click', function (event) {
                            _this.googleMapsApi.getDirectionData(event.latLng).then(function (direction) {
                                _this.pathDirectionForm(direction);
                            }, function (fail) {
                                console.log('[post-form-180]', fail);
                            });
                            _this.setMarker(_this.postForm.value.description, {
                                lat: event.latLng.lat(),
                                lng: event.latLng.lng()
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Establece el marcador segun la ubicacion del usuario en el formulario.
     */
    PostPublishComponent.prototype.getGoogleDirection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var direction, latLng;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        direction = this.postForm.value.direction;
                        if (!(direction.administrative_area_level_1
                            && direction.administrative_area_level_2 && direction.country
                            && direction.sublocality_level_1 && direction.locality)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.googleMapsApi.getCoords(direction)];
                    case 1:
                        latLng = _a.sent();
                        this.setMarker(this.postForm.value.description, latLng);
                        this.postForm.patchValue({
                            direction: {
                                lat: latLng.lat,
                                lng: latLng.lng,
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Establece la pocición del markador del usuario.
     * @param {LatLng} latLng
     */
    PostPublishComponent.prototype.setMarker = function (description, latLng) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, marker, infoWindow;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.postForm.patchValue({
                            direction: {
                                lat: latLng.lat,
                                lng: latLng.lng,
                            }
                        });
                        if (!!this.marker) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.googleMapsApi.setMarker({
                                content: "<p>" + description + "</p>",
                                latLng: latLng,
                                map: this.map,
                                title: description
                            })];
                    case 1:
                        _a = _b.sent(), marker = _a.marker, infoWindow = _a.infoWindow;
                        this.map.setCenter(latLng);
                        this.marker = marker;
                        this.infoWindow = infoWindow;
                        this.googleMapsApi.markerAddListener(this.marker, 'drag', function (markerDrag) {
                            if (_this.circle) {
                                _this.circle.setCenter(markerDrag.latLng);
                            }
                        });
                        this.googleMapsApi.markerAddListener(this.marker, 'dragend', function (markerDragend) {
                            _this.postForm.patchValue({
                                direction: {
                                    lat: markerDragend.latLng.lat(),
                                    lng: markerDragend.latLng.lng(),
                                }
                            });
                            _this.googleMapsApi.getDirectionData(markerDragend.latLng).then(function (direction) {
                                _this.pathDirectionForm(direction);
                            });
                        });
                        if (this.postForm.value.direction_accuracy !== 0) {
                            if (!this.circle) {
                                this.circle = this.googleMapsApi.addCircle({
                                    radius: this.postForm.value.direction_accuracy / 2, map: this.map, center: this.marker.getPosition()
                                });
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.map.setCenter(latLng);
                        this.marker.setPosition(latLng);
                        this.infoWindow.setContent("<p>" + description + "</p>");
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Agrega un ciculo al mapa.
     * @param event
     */
    PostPublishComponent.prototype.setMapCircle = function (event) {
        if (this.marker) {
            if (!this.circle) {
                this.circle = this.googleMapsApi.addCircle({
                    radius: event.target.value / 2, map: this.map, center: this.marker.getPosition()
                });
            }
            else {
                this.circle.setCenter(this.marker.getPosition());
                this.circle.setRadius(event.target.value / 2);
            }
        }
    };
    /**
     * Establece la dirección segun la respuesta de google.
     * @param {any} direction
     */
    PostPublishComponent.prototype.pathDirectionForm = function (direction) {
        var _this = this;
        if (direction) {
            this.postForm.patchValue({
                direction: {
                    route: '',
                    sublocality_level_1: '',
                    locality: '',
                    administrative_area_level_2: '',
                    administrative_area_level_1: '',
                    country: '',
                    postal_code: '',
                    street_number: '',
                }
            });
            direction.forEach(function (element) {
                element.types.forEach(function (type) {
                    switch (type) {
                        case 'route':
                            {
                                if (element.long_name !== 'Unnamed Road') {
                                    _this.postForm.patchValue({
                                        direction: {
                                            route: element['long_name']
                                        }
                                    });
                                }
                            }
                            break;
                        case 'street_number':
                            {
                                _this.postForm.patchValue({
                                    direction: {
                                        street_number: element['long_name']
                                    }
                                });
                            }
                            break;
                        case 'country':
                            {
                                _this.postForm.patchValue({
                                    direction: {
                                        country: element['long_name']
                                    }
                                });
                            }
                            break;
                        case 'administrative_area_level_2':
                            {
                                _this.postForm.patchValue({
                                    direction: {
                                        administrative_area_level_2: element['long_name']
                                    }
                                });
                            }
                            break;
                        case 'locality':
                            {
                                _this.postForm.patchValue({
                                    direction: {
                                        locality: element['long_name']
                                    }
                                });
                            }
                            break;
                        case 'administrative_area_level_1':
                            {
                                _this.postForm.patchValue({
                                    direction: {
                                        administrative_area_level_1: element['long_name']
                                    }
                                });
                            }
                            break;
                        case 'country':
                            {
                                _this.postForm.patchValue({
                                    direction: {
                                        country: element['long_name']
                                    }
                                });
                            }
                            break;
                        case 'sublocality_level_1':
                            {
                                _this.postForm.patchValue({
                                    direction: {
                                        sublocality_level_1: element['long_name']
                                    }
                                });
                            }
                            break;
                        case 'postal_code':
                            {
                                _this.postForm.patchValue({
                                    direction: {
                                        postal_code: element['long_name']
                                    }
                                });
                            }
                            break;
                        default:
                            break;
                    }
                });
            });
        }
    };
    /**
     * Selecciona archivos con un boton.
     * @param event
     */
    PostPublishComponent.prototype.selectFiles = function (event) {
        var _this = this;
        if (event) {
            this.transferImgFile.getMultipleBase64Imgs(event.srcElement.files).subscribe(function (file) {
                _this.files = [];
                _this.files.push(file);
                _this.archivos = Array.from(event.srcElement.files);
            });
        }
        else {
            this.transferImgFile.getImg().then(function (img) {
                _this.files = [];
                _this.files.push({ url: img, alt: 'post' });
            }, function (fail) {
                console.log('[post-form-302]', fail);
            });
        }
    };
    /**
     * Seleciona archivos al dejarlos caer.
     * @param event
     */
    PostPublishComponent.prototype.onDrop = function (event) {
        var _this = this;
        event.preventDefault();
        this.transferImgFile.getMultipleBase64Imgs(event.dataTransfer).subscribe(function (file) {
            _this.files.push(file);
        });
        this.dragClasses.onDrag = false;
    };
    /**
     * Abre un modal.
     * @param {'email' | 'phone'} type
     */
    PostPublishComponent.prototype.addEmailsPhones = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: AddEmailsPhonesComponent,
                            componentProps: {
                                type: type,
                                name: name
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Elimina un archivo de la lista.
     * @param {Media} file
     */
    PostPublishComponent.prototype.removeFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var alert_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!file.id) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: this.translate.instant('ALERTS.DELETE_FILE.TITLE'),
                                message: this.translate.instant('ALERTS.DELETE_FILE.MESSAGE'),
                                buttons: [
                                    {
                                        text: this.translate.instant('CANCEL'),
                                        role: 'cancel',
                                        handler: function () { }
                                    }, {
                                        text: this.translate.instant('ACCEPT'),
                                        handler: function () {
                                            _this.api.delete("/post/file/" + file.id).then(function () {
                                                _this.archivos.splice(_this.files.indexOf(file), 1);
                                                _this.files.splice(_this.files.indexOf(file), 1);
                                            }, function (error) {
                                                console.log('[post-form-422]', error);
                                            });
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        //this.archivos.splice(0, 1);
                        this.archivos.splice(this.files.indexOf(file), 1);
                        this.files.splice(this.files.indexOf(file), 1);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Al desplazar un objeto sobre un elemento de la pagina.
     * @param event
     */
    PostPublishComponent.prototype.onDragEnter = function (event) {
        this.enterTarget = event.target;
    };
    /**
     * Al desplazar un objeto sobre un elemento especifico de la pagina.
     * @param event
     */
    PostPublishComponent.prototype.onDragOver = function (event) {
        event.stopPropagation();
        event.preventDefault();
        this.dragClasses.onDrag = true;
    };
    /**
     * Al salir del elemento arrastrando un objeto.
     * @param event
     */
    PostPublishComponent.prototype.onDragLeave = function (event) {
        if (this.enterTarget === event.target && this.dragClasses.onDrag) {
            event.stopPropagation();
            event.preventDefault();
            this.dragClasses.onDrag = false;
        }
    };
    /**
     * Presenta un cuadro de mensaje.
     * @param {string} text Mensaje a mostrar.
     */
    PostPublishComponent.prototype.presentToast = function (text) {
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
        Input(),
        __metadata("design:type", Number)
    ], PostPublishComponent.prototype, "postId", void 0);
    __decorate([
        ViewChild('mapCanvas', { static: false }),
        __metadata("design:type", ElementRef)
    ], PostPublishComponent.prototype, "mapElement", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PostPublishComponent.prototype, "appPostSend", void 0);
    PostPublishComponent = __decorate([
        Component({
            selector: 'app-publish-form',
            templateUrl: './post-publish.component.html',
            styleUrls: ['./post-publish.component.scss']
        }),
        __metadata("design:paramtypes", [Platform,
            Router,
            StorageService,
            GoogleMapsApiService,
            ApiService,
            HttpClient,
            TransferImgFileService,
            ModalController,
            AlertController,
            TranslateService,
            HomePage,
            TabsPage,
            ToastController,
            FormBuilder])
    ], PostPublishComponent);
    return PostPublishComponent;
}());
export { PostPublishComponent };
//# sourceMappingURL=post-publish.component.js.map