import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { TranslateService } from '@ngx-translate/core';
import { AddEmailsPhonesComponent } from '../../../modals/add-emails-phones/add-emails-phones.component';
import { Platform, ModalController, AlertController } from '@ionic/angular';
import { Component, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService, GoogleMapsApiService, TransferImgFileService } from '../../../providers/providers';
import { Router, NavigationEnd, RouteConfigLoadEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { environment } from './../../../../environments/environment';
import { UtilityProvider } from './../../../providers/UtilityProvider';
//import * as moment from "moment";
var PostFormComponent = /** @class */ (function () {
    function PostFormComponent(platform, router, storage, googleMapsApi, http, util, transferImgFile, modalCtrl, alertCtrl, toastCtrl, translate, formBuilder) {
        this.platform = platform;
        this.router = router;
        this.storage = storage;
        this.googleMapsApi = googleMapsApi;
        this.http = http;
        this.util = util;
        this.transferImgFile = transferImgFile;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.isBrowser = true;
        this.addDirection = false;
        this.addtipo_operacion = false;
        // On drag img
        this.enterTarget = null;
        this.dragClasses = {
            onDrag: false,
        };
        this.files = [];
        this.archivos = [];
        this.isReadyToSend = false;
        this.appPostSend = new EventEmitter();
        // Collapse menu
        this.expanded = false;
        this.apiUrl = environment.SERVER_URL;
        this.usuario_id = window.localStorage['usuario_id'];
        this.id_especie = window.localStorage['id_especie'];
        this.idmascota = '';
        this.token = window.localStorage['token'];
        this.isBrowser = (!this.platform.is('android') && !this.platform.is('ios')) || this.platform.is('mobileweb');
        this.postForm = formBuilder.group({
            direction_accuracy: [0, Validators.nullValidator],
            raza: [0, Validators.nullValidator],
            gender: [0, Validators.nullValidator],
            nombreM: ['', Validators.nullValidator],
            edadM: ['', Validators.nullValidator],
            predefinido: ['', [Validators]],
            situacionA: [0, Validators.nullValidator],
            direction: formBuilder.group({
                country: ['', [Validators.nullValidator]],
                administrative_area_level_1: ['', [Validators.nullValidator]],
                administrative_area_level_2: ['', [Validators.nullValidator]],
                locality: ['', [Validators.nullValidator]],
                sublocality_level_1: ['', [Validators.nullValidator]],
                route: ['', [Validators.nullValidator]],
                street_number: ['', [Validators.nullValidator]],
                postal_code: ['', [Validators.nullValidator]],
                lat: ['', [Validators.nullValidator]],
                lng: ['', [Validators.nullValidator]],
            })
        });
        this.BuscarRaza();
        this.BuscarGender();
        this.BuscarSituacion();
        console.log(this.usuario_id, 'id usuario en el post');
        console.log(this.token, 'estoy en el post');
        // this.postForm.resize();
    }
    PostFormComponent.prototype.BuscarRaza = function () {
        var _this = this;
        this.Raza = [];
        this.util.GetRaza(this.id_especie).subscribe(function (data) {
            console.log(JSON.stringify(data));
            if (data) {
                _this.Raza = _this.util.LlenarCombo(JSON.stringify(data));
            }
            else {
                _this.presentToast(data['message']);
            }
        });
    };
    PostFormComponent.prototype.BuscarGender = function () {
        var _this = this;
        this.Gender = [];
        this.util.GetGender().subscribe(function (data) {
            console.log(data);
            if (data) {
                _this.Gender = _this.util.LlenarCombo(JSON.stringify(data));
            }
            else {
                _this.presentToast(data['message']);
            }
        });
    };
    PostFormComponent.prototype.BuscarSituacion = function () {
        var _this = this;
        this.Situacion = [];
        this.util.GetSituacion().subscribe(function (data) {
            console.log(JSON.stringify(data));
            if (data) {
                _this.Situacion = _this.util.LlenarCombo(JSON.stringify(data));
            }
            else {
                _this.presentToast(data['message']);
            }
        });
    };
    PostFormComponent.prototype.ngOnInit = function () {
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
                        if (this.mapElement) {
                            this.setMap();
                        }
                        if (this.postId) {
                            this.router.navigate(['/animal']);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Navega hacia la pagina de la cuenta del usuario.
     */
    PostFormComponent.prototype.goToAccount = function () {
        this.router.navigate(['/account']);
    };
    /**
     * Navega hacia la pagina del login.
     */
    PostFormComponent.prototype.goToLogin = function () {
        this.router.navigate(['/login']);
    };
    /**
     * Valida el formulario y envia toda la información.
     */
    PostFormComponent.prototype.sendPost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, request, query, httpOpti, post;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = new HttpHeaders();
                        request = ({ headers: headers });
                        query = {
                            nombre: this.postForm.value.nombreM,
                            fecha_nac: this.postForm.value.edadM,
                            id_genero: this.postForm.value.gender,
                            id_estado: this.postForm.value.situacionA,
                            id_raza: this.postForm.value.raza,
                            usuario_id: this.usuario_id,
                            habilitado: '1',
                            predefinido: this.postForm.value.predefinido,
                            pais: this.postForm.value.direction.country,
                            estado: this.postForm.value.direction.administrative_area_level_1,
                            ciudad: this.postForm.value.direction.locality,
                            calle: this.postForm.value.direction.route,
                            zona_postal: this.postForm.value.direction.postal_code,
                            latitud: this.postForm.value.direction.lat,
                            longitud: this.postForm.value.direction.lng
                        };
                        console.log(query);
                        if (!this.postId) return [3 /*break*/, 1];
                        return [3 /*break*/, 3];
                    case 1:
                        httpOpti = {
                            headers: new HttpHeaders({
                                'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
                            })
                        };
                        return [4 /*yield*/, this.http.post(this.apiUrl + 'createmascotas' + '?json=' + JSON.stringify(query), JSON.stringify(query), request)
                                .subscribe(function (data) {
                                if (data['status'] != "error") {
                                    var idmascota_1 = data['info'].id_mascotas;
                                    var usuario_id_1 = data['info'].usuario_id;
                                    _this.files.forEach(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                        var x;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!!file.type) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, this.transferImgFile.uploadImg('subirfoto', file.url, { params: {
                                                                id_usuario: usuario_id_1,
                                                                perfil: 1,
                                                                idMascota: idmascota_1
                                                            } })];
                                                case 1:
                                                    x = _a.sent();
                                                    console.log('aqui');
                                                    console.log(x, file.url, 'foto enviada');
                                                    _a.label = 2;
                                                case 2: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    _this.presentToast(data['message']);
                                    _this.router.navigate(['/inicio']);
                                }
                                else {
                                    _this.presentToast(data['message']);
                                }
                            })];
                    case 2:
                        post = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Toma la lista de archivos y los sube
     * @param {Object} post
     */
    PostFormComponent.prototype.uploadImgs = function (file, post) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //post.user = this.user;
                file['id_Usuario'] = this.usuario_id;
                file['perfil'] = 1;
                console.log(file);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Establece el mapa.
     */
    PostFormComponent.prototype.setMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mapElement, latLng, mapOptions, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mapElement = this.mapElement.nativeElement;
                        latLng = { lat: 18.85, lng: -99.2333 };
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
    PostFormComponent.prototype.getGoogleDirection = function () {
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
    PostFormComponent.prototype.setMarker = function (description, latLng) {
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
    PostFormComponent.prototype.setMapCircle = function (event) {
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
    PostFormComponent.prototype.pathDirectionForm = function (direction) {
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
                //console.log(element);
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
    PostFormComponent.prototype.selectFiles = function (event) {
        var _this = this;
        if (event) {
            this.transferImgFile.getMultipleBase64Imgs(event.srcElement.files).subscribe(function (file) {
                _this.files.push(file);
                _this.archivos = Array.from(event.srcElement.files);
            });
        }
        else {
            this.transferImgFile.getImg().then(function (img) {
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
    PostFormComponent.prototype.onDrop = function (event) {
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
    PostFormComponent.prototype.addEmailsPhones = function (type) {
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
    PostFormComponent.prototype.removeFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var alert_1;
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
                                            /*this.http.delete(`/post/file/${file.id}`).then(() => {
                                              this.archivos.splice(this.files.indexOf(file), 1);
                                              this.files.splice(this.files.indexOf(file), 1);
                                            }, (error) => {
                                              console.log('[post-form-422]', error);
                                            });*/
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
    PostFormComponent.prototype.onDragEnter = function (event) {
        this.enterTarget = event.target;
    };
    /**
     * Al desplazar un objeto sobre un elemento especifico de la pagina.
     * @param event
     */
    PostFormComponent.prototype.onDragOver = function (event) {
        event.stopPropagation();
        event.preventDefault();
        this.dragClasses.onDrag = true;
    };
    /**
     * Al salir del elemento arrastrando un objeto.
     * @param event
     */
    PostFormComponent.prototype.onDragLeave = function (event) {
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
    PostFormComponent.prototype.presentToast = function (text) {
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
    ], PostFormComponent.prototype, "postId", void 0);
    __decorate([
        ViewChild('mapCanvas', { static: false }),
        __metadata("design:type", ElementRef)
    ], PostFormComponent.prototype, "mapElement", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PostFormComponent.prototype, "appPostSend", void 0);
    PostFormComponent = __decorate([
        Component({
            selector: 'app-post-form',
            templateUrl: './post-form.component.html',
            styleUrls: ['./post-form.component.scss']
        }),
        __metadata("design:paramtypes", [Platform,
            Router,
            StorageService,
            GoogleMapsApiService,
            HttpClient,
            UtilityProvider,
            TransferImgFileService,
            ModalController,
            AlertController,
            ToastController,
            TranslateService,
            FormBuilder])
    ], PostFormComponent);
    return PostFormComponent;
}());
export { PostFormComponent };
//# sourceMappingURL=post-form.component.js.map