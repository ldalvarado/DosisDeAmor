import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { ToastController, Platform, Events } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService, StorageService, GoogleMapsApiService } from './../../../../providers/providers';
import { TranslateService } from '@ngx-translate/core';
var UserFormComponent = /** @class */ (function () {
    function UserFormComponent(toastCtrl, platform, storage, api, translate, events, googleMapsApi, formBuilder) {
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.storage = storage;
        this.api = api;
        this.translate = translate;
        this.events = events;
        this.googleMapsApi = googleMapsApi;
        this.isReadyToUpdate = false;
        this.isPrimary = false;
        this.isSelf = true;
        this.userForm = formBuilder.group({
            id: [''],
            name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
            first_name: ['', [Validators.required, Validators.maxLength(60)]],
            last_name: ['', [Validators.required, Validators.maxLength(60)]],
            gender: ['', Validators.nullValidator],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.maxLength(15)],
            birthday: ['', Validators.nullValidator],
            lang: ['es', Validators.nullValidator],
            address: formBuilder.group({
                country: ['', Validators.maxLength(60)],
                administrative_area_level_1: ['', Validators.maxLength(60)],
                administrative_area_level_2: ['', Validators.maxLength(60)],
                route: ['', Validators.maxLength(60)],
                street_number: ['', Validators.nullValidator],
                postal_code: ['', Validators.nullValidator],
                lat: ['', Validators.nullValidator],
                lng: ['', Validators.nullValidator],
            })
        });
    }
    UserFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userForm.valueChanges.subscribe(function (v) {
            _this.isReadyToUpdate = _this.userForm.valid;
        });
    };
    UserFormComponent.prototype.ngOnChanges = function () {
        if (this.user) {
            this.setUserData(this.user);
        }
    };
    /**
     * Coloca la información del usuario en los formularios.
     */
    UserFormComponent.prototype.setUserData = function (user) {
        var _this = this;
        this.userForm.patchValue({
            id: user.id,
            name: user.name,
            first_name: user.first_name,
            last_name: user.last_name,
            gender: user.gender,
            email: user.email,
            phone: user.phone,
            birthday: user.birthday,
            lang: user.lang,
        });
        if (user.address) {
            this.userForm.patchValue({
                address: {
                    country: user.address.country,
                    administrative_area_level_1: user.address.administrative_area_level_1,
                    administrative_area_level_2: user.address.administrative_area_level_2,
                    route: user.address.route,
                    street_number: user.address.street_number,
                    postal_code: user.address.postal_code,
                    lat: user.address.lat,
                    lng: user.address.lng,
                }
            });
        }
        this.platform.ready().then(function () {
            _this.setMap(user);
        });
    };
    /**
     * Establece el mapa.
     * @param {User} user
     */
    UserFormComponent.prototype.setMap = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var mapElement, latLng, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mapElement = this.mapElement.nativeElement;
                        latLng = { lat: 24.020, lng: -104.658 };
                        if (user.address && user.address.lat && user.address.lng) {
                            latLng.lat = parseFloat(user.address.lat);
                            latLng.lng = parseFloat(user.address.lng);
                        }
                        _a = this;
                        return [4 /*yield*/, this.googleMapsApi.setMap({ map: this.map, mapElement: mapElement, latLng: latLng })];
                    case 1:
                        _a.map = _b.sent();
                        if (user.address && user.address.lat && user.address.lng) {
                            this.setMarker(user, latLng);
                        }
                        else {
                            this.googleMapsApi.addListenerOnce(this.map, 'click', function (event) {
                                _this.googleMapsApi.getDirectionData(event.latLng).then(function (address) {
                                    _this.patchAddressForm(address);
                                }, function (fail) {
                                    console.log('[account-127]', fail);
                                });
                                _this.setMarker(user, {
                                    lat: event.latLng.lat(),
                                    lng: event.latLng.lng()
                                });
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Establece el marcador segun la ubicacion del usuario en el formulario.
     */
    UserFormComponent.prototype.getGoogleDirection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address, latLng;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        address = this.userForm.value.address;
                        if (!(address.street_number && address.route && address.administrative_area_level_1
                            && address.administrative_area_level_2 && address.country)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.googleMapsApi.getCoords(address)];
                    case 1:
                        latLng = _a.sent();
                        this.setMarker(this.userForm.value, latLng);
                        this.userForm.patchValue({
                            address: {
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
     * @param {Usre} user
     * @param {LatLng} latLng
     */
    UserFormComponent.prototype.setMarker = function (user, latLng) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, marker, infoWindow;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.userForm.patchValue({
                            address: {
                                lat: latLng.lat,
                                lng: latLng.lng,
                            }
                        });
                        if (!!this.marker) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.googleMapsApi.setMarker({
                                content: "<h5>" + user.name + "</h5>",
                                latLng: latLng,
                                map: this.map,
                                title: user.name
                            })];
                    case 1:
                        _a = _b.sent(), marker = _a.marker, infoWindow = _a.infoWindow;
                        this.marker = marker;
                        this.infoWindow = infoWindow;
                        this.googleMapsApi.markerAddListener(this.marker, 'dragend', function (markerDrag) {
                            _this.userForm.patchValue({
                                address: {
                                    lat: markerDrag.latLng.lat(),
                                    lng: markerDrag.latLng.lng(),
                                }
                            });
                            _this.googleMapsApi.getDirectionData(markerDrag.latLng).then(function (address) {
                                _this.patchAddressForm(address);
                            });
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        this.map.setCenter(latLng);
                        this.marker.setPosition(latLng);
                        this.infoWindow.setContent("<h5>" + user.name + "</h5>");
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Establece la dirección segun la respuesta de google.
     * @param address
     */
    UserFormComponent.prototype.patchAddressForm = function (address) {
        var _this = this;
        if (address) {
            this.userForm.patchValue({
                address: {
                    country: '',
                    administrative_area_level_1: '',
                    administrative_area_level_2: '',
                    route: '',
                    street_number: '',
                    postal_code: ''
                }
            });
            address.forEach(function (element) {
                element.types.forEach(function (type) {
                    switch (type) {
                        case 'route':
                            {
                                if (element.long_name !== 'Unnamed Road') {
                                    _this.userForm.patchValue({
                                        address: {
                                            route: element['long_name']
                                        }
                                    });
                                }
                            }
                            break;
                        case 'street_number':
                            {
                                _this.userForm.patchValue({
                                    address: {
                                        street_number: element['long_name']
                                    }
                                });
                            }
                            break;
                        case 'country':
                            {
                                _this.userForm.patchValue({
                                    address: {
                                        country: element['long_name']
                                    }
                                });
                            }
                            break;
                        case 'administrative_area_level_2':
                            {
                                _this.userForm.patchValue({
                                    address: {
                                        administrative_area_level_2: element['long_name']
                                    }
                                });
                            }
                            break;
                        case 'locality':
                            {
                                _this.userForm.patchValue({
                                    address: {
                                        administrative_area_level_2: element['long_name']
                                    }
                                });
                            }
                            break;
                        case 'administrative_area_level_1':
                            {
                                _this.userForm.patchValue({
                                    address: {
                                        administrative_area_level_1: element['long_name']
                                    }
                                });
                            }
                            break;
                        case 'country':
                            {
                                _this.userForm.patchValue({
                                    address: {
                                        country: element['long_name']
                                    }
                                });
                            }
                            break;
                        case 'postal_code':
                            {
                                _this.userForm.patchValue({
                                    address: {
                                        postal_code: element['long_name']
                                    }
                                });
                            }
                            break;
                        default:
                            break;
                    }
                    _this.isReadyToUpdate = true;
                });
            });
        }
    };
    /**
     * Actualiza el idioma selecionado por el user.
     */
    UserFormComponent.prototype.setLang = function () {
        var _this = this;
        if (this.isSelf) {
            this.presentToast(this.translate.instant('UPDATES.LANGUAGE_SUCCESS'));
            this.events.publish('user:lang', this.userForm.value.lang || 'es');
        }
        else {
            this.api.put("/user/lang/" + this.user.id, { lang: this.userForm.value.lang }).then(function (lang) {
                _this.presentToast(_this.translate.instant('UPDATES.LANGUAGE_SUCCESS'));
            }, function (fail) {
                console.log('[account-287]', fail);
            });
        }
    };
    /**
     * Compara dos dirección para verificar que sean diferentes.
     * @param {Address} form
     * @param {Address} stored
     */
    UserFormComponent.prototype.compareAddress = function (form, stored) {
        return form.administrative_area_level_1 != stored.administrative_area_level_1 ||
            form.administrative_area_level_2 != stored.administrative_area_level_2 ||
            form.country != stored.country ||
            form.lat != stored.lat ||
            form.lng != stored.lng ||
            form.postal_code != stored.postal_code ||
            form.route != stored.route ||
            form.street_number != stored.street_number;
    };
    /**
     * Envía una solicitud al servidor para actualizar la información del user.
     */
    UserFormComponent.prototype.updateUser = function () {
        var _this = this;
        if (!this.userForm.valid) {
            return;
        }
        this.storage.getUser().then(function (storage) {
            if (_this.isSelf) {
                if (_this.userForm.value.email !== storage.email) {
                    _this.api.put('/user/email', _this.userForm.value).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.EMAIL_SUCCESS'));
                        _this.storage.setEmail(user.email);
                    }, function (fail) {
                        console.log('[user-form-302]', fail);
                    });
                }
                if (!storage.address || (_this.compareAddress(_this.userForm.value.address, storage.address))) {
                    _this.api.put('/user/address', _this.userForm.value.address).then(function (address) {
                        _this.presentToast(_this.translate.instant('UPDATES.DIRECTION_SUCCESS'));
                        _this.storage.setAddress(address);
                    }, function (fail) {
                        console.log('[user-form-311]', fail);
                    });
                }
                if (_this.userForm.value.name !== storage.name) {
                    _this.api.put('/user', { name: _this.userForm.value.name }).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.NAME_SUCCESS'));
                        _this.storage.setName(user.name);
                    }, function (fail) {
                        console.log('[user-form-319]', fail);
                    });
                }
                if (_this.userForm.value.first_name !== storage.first_name) {
                    _this.api.put('/user', { first_name: _this.userForm.value.first_name }).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.FIRST_NAME_SUCCESS'));
                        _this.storage.setFirstName(user.first_name);
                    }, function (fail) {
                        console.log('[user-form-327]', fail);
                    });
                }
                if (_this.userForm.value.last_name !== storage.last_name) {
                    _this.api.put('/user', { last_name: _this.userForm.value.last_name }).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.LAST_NAME_SUCCESS'));
                        _this.storage.setLastName(user.last_name);
                    }, function (fail) {
                        console.log('[user-form-335]', fail);
                    });
                }
                if (_this.userForm.value.gender !== storage.gender) {
                    _this.api.put('/user', { gender: _this.userForm.value.gender }).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.GENERO_SUCCESS'));
                        _this.storage.setGender(user.gender);
                    }, function (fail) {
                        console.log('[user-form-343]', fail);
                    });
                }
                if (_this.userForm.value.phone !== storage.phone) {
                    _this.api.put('/user', { phone: _this.userForm.value.phone }).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.PHONE_NUMBER_SUCCESS'));
                        _this.storage.setPhoneNumber(user.phone);
                    }, function (fail) {
                        console.log('[user-form-351]', fail);
                    });
                }
                var date = _this.userForm.value.birthday;
                date = (date && date.year) ? date.year.text + "-" + date.month.text + "-" + date.day.text : date;
                if (date !== storage.birthday) {
                    _this.api.put('/user', { birthday: date }).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.BIRTHDAY_SUCCESS'));
                        _this.storage.setBirthday(user.birthday);
                    }, function (fail) {
                        console.log('[user-form-361]', fail);
                    });
                }
            }
            else {
                if (_this.userForm.value.email !== _this.user.email) {
                    _this.api.put("/user/email/" + _this.user.id, _this.userForm.value).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.EMAIL_SUCCESS'));
                        _this.user = user;
                    }, function (fail) {
                        console.log('[user-form-370]', fail);
                    });
                }
                if (!_this.user.address || (_this.compareAddress(_this.userForm.value.address, _this.user.address))) {
                    _this.api.put("/user/address/" + _this.user.id, _this.userForm.value.address).then(function (address) {
                        _this.presentToast(_this.translate.instant('UPDATES.DIRECTION_SUCCESS'));
                        _this.user.address = address;
                    }, function (fail) {
                        console.log('[user-form-378]', fail);
                    });
                }
                if (_this.userForm.value.name !== _this.user.name) {
                    _this.api.put("/user/" + _this.user.id, { name: _this.userForm.value.name }).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.NAME_SUCCESS'));
                        _this.user = user;
                    }, function (fail) {
                        console.log('[user-form-386]', fail);
                    });
                }
                if (_this.userForm.value.first_name !== _this.user.first_name) {
                    _this.api.put("/user/" + _this.user.id, { first_name: _this.userForm.value.first_name }).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.FIRST_NAME_SUCCESS'));
                        _this.user = user;
                    }, function (fail) {
                        console.log('[user-form-394]', fail);
                    });
                }
                if (_this.userForm.value.last_name !== _this.user.last_name) {
                    _this.api.put("/user/" + _this.user.id, { last_name: _this.userForm.value.last_name }).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.LAST_NAME_SUCCESS'));
                        _this.user = user;
                    }, function (fail) {
                        console.log('[user-form-402]', fail);
                    });
                }
                if (_this.userForm.value.gender !== _this.user.gender) {
                    _this.api.put("/user/" + _this.user.id, { gender: _this.userForm.value.gender }).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.GENERO_SUCCESS'));
                        _this.user = user;
                    }, function (fail) {
                        console.log('[user-form-410]', fail);
                    });
                }
                if (_this.userForm.value.phone !== _this.user.phone) {
                    _this.api.put("/user/" + _this.user.id, { phone: _this.userForm.value.phone }).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.PHONE_NUMBER_SUCCESS'));
                        _this.user = user;
                    }, function (fail) {
                        console.log('[user-form-418]', fail);
                    });
                }
                var date = _this.userForm.value.birthday;
                date = (date && date.year) ? date.year.text + "-" + date.month.text + "-" + date.day.text : date;
                if (date !== _this.user.birthday) {
                    _this.api.put("/user/" + _this.user.id, { birthday: date }).then(function (user) {
                        _this.presentToast(_this.translate.instant('UPDATES.BIRTHDAY_SUCCESS'));
                        _this.user = user;
                    }, function (fail) {
                        console.log('[user-form-428]', fail);
                    });
                }
            }
        });
        this.isReadyToUpdate = false;
    };
    /**
     * Presenta un cuadro de mensaje.
     * @param {string} text Mensaje a mostrar.
     */
    UserFormComponent.prototype.presentToast = function (text) {
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
        __metadata("design:type", Object)
    ], UserFormComponent.prototype, "user", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], UserFormComponent.prototype, "isSelf", void 0);
    __decorate([
        ViewChild('mapCanvas', { static: false }),
        __metadata("design:type", ElementRef)
    ], UserFormComponent.prototype, "mapElement", void 0);
    UserFormComponent = __decorate([
        Component({
            selector: 'app-user-form',
            templateUrl: './user-form.component.html',
            styleUrls: ['./user-form.component.scss']
        }),
        __metadata("design:paramtypes", [ToastController,
            Platform,
            StorageService,
            ApiService,
            TranslateService,
            Events,
            GoogleMapsApiService,
            FormBuilder])
    ], UserFormComponent);
    return UserFormComponent;
}());
export { UserFormComponent };
//# sourceMappingURL=user-form.component.js.map