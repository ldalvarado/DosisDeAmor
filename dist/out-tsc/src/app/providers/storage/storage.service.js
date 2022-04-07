import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var StorageService = /** @class */ (function () {
    function StorageService(events, storage) {
        this.events = events;
        this.storage = storage;
        this.HAS_LOGGED_IN = 'respetHasLoggedIn';
        this.HAS_SEEN_TUTORIAL = 'respetHasSeenTutorial';
        this.USER = 'respetUser';
        this.SESION_STATE = 'respetSesionState';
        this.SESION_TOKEN = 'respetSesionToken';
        this.REGISTRATION_ID = 'respetRegistrationId';
        this.LANG = 'respetLang';
    }
    /**
     * Estable el id del usuario para recibir notificaciones push personalizadas.
     * @param {UserRegistrationId} userRegistrationId
     */
    StorageService.prototype.setUserRegistrationId = function (userRegistrationId) {
        this.storage.set(this.REGISTRATION_ID, userRegistrationId);
    };
    /**
     * Recupera id del usuario para recibir notificaciones push personalizadas.
     * @return {UserRegistrationId} userRegistrationId
     */
    StorageService.prototype.getUserRegistrationId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.REGISTRATION_ID).then(function (userRegistrationId) {
                            return (userRegistrationId) ? userRegistrationId : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Almacena los correspondientes al usuario, para poder ustilizar en la aplicación.
     * @param {User} user
     */
    StorageService.prototype.setCredentials = function (user) {
        this.storage.set(this.SESION_STATE, true);
        this.events.publish('user:login', user);
        return this.setUser(user);
    };
    /**
     * Almacena la información del usuario.
     * @param {User} user
     */
    StorageService.prototype.setUser = function (user) {
        return this.storage.set(this.USER, user);
    };
    /**
     * Devuelve la información del usuario almacenado
     * @return {Promise<User>} user
     */
    StorageService.prototype.getUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.USER).then(function (user) {
                            return (user) ? user : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Almacena el tipo de usuario.
     * @param {'visitor' | 'user'| 'admin' | 'other'} role
     */
    StorageService.prototype.setUserRole = function (role) {
        var _this = this;
        this.storage.get(this.USER).then(function (user) {
            user.role = role;
            _this.storage.set(_this.USER, user);
        });
    };
    /**
     * Devuelve el tipo de usuario.
     * @return {Promise<'visitor' | 'user'| 'admin' | 'other'>} role.
     */
    StorageService.prototype.getUserRole = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.USER).then(function (user) {
                            return (user) ? user.role : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Almacena el id del usuario
     * @param {number} userId
     */
    StorageService.prototype.setId = function (userId) {
        var _this = this;
        this.storage.get(this.USER).then(function (user) {
            user.id = userId;
            _this.storage.set(_this.USER, user);
        });
    };
    /**
     * Devuelve la id del usuario almacenado
     * @return {Promise<number>} Id
     */
    StorageService.prototype.getId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.USER).then(function (user) {
                            return (user) ? user.id : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Almacena la sesión del usuario
     * @param {Sesion} sesion
     */
    StorageService.prototype.setSesion = function (sesion) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.set(this.SESION_TOKEN, sesion).then(function () {
                            return true;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Devuelve el token del usuario almacenado
     * @return {Promise<string>} token
     */
    StorageService.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.SESION_TOKEN).then(function (sesion) {
                            return (sesion) ? sesion.access_token : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Almacena el nombre del usuario
     * @param {string} name Nombre del usuario
     */
    StorageService.prototype.setName = function (name) {
        var _this = this;
        this.storage.get(this.USER).then(function (user) {
            user.name = name;
            _this.storage.set(_this.USER, user);
        });
    };
    /**
     * Devuelve el nombre de usuario almacenado
     * @return {Promise<string>} Nombre de usuario
     */
    StorageService.prototype.getName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.USER).then(function (user) {
                            return (user) ? user.name : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Almacena el nombre del usuario
     * @param {string} first_name Nombre del usuario
     */
    StorageService.prototype.setFirstName = function (first_name) {
        var _this = this;
        this.storage.get(this.USER).then(function (user) {
            user.first_name = first_name;
            _this.storage.set(_this.USER, user);
        });
    };
    /**
     * Devuelve el nombre de usuario almacenado
     * @return {Promise<string>} Primer nombre del usuario
     */
    StorageService.prototype.getFirstName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.storage.get(this.USER).then(function (user) {
                        return (user) ? user.first_name : null;
                    })];
            });
        });
    };
    /**
     * Almacena el nombre del usuario.
     * @param {string} last_name Apellido del usuario
     */
    StorageService.prototype.setLastName = function (last_name) {
        var _this = this;
        this.storage.get(this.USER).then(function (user) {
            user.last_name = last_name;
            _this.storage.set(_this.USER, user);
        });
    };
    /**
     * Devuelve el nombre de usuario almacenado
     * @return {Promise<string>} Apellido del usuario
     */
    StorageService.prototype.getLastName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.USER).then(function (user) {
                            return (user) ? user.last_name : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Almacena el nombre del usuario.
     * @param {string} gender Nombre del usuario
     */
    StorageService.prototype.setGender = function (gender) {
        var _this = this;
        this.storage.get(this.USER).then(function (user) {
            user.gender = gender;
            _this.storage.set(_this.USER, user);
        });
    };
    /**
     * Devuelve el nombre de usuario almacenado.
     * @return {Promise<string>} Nombre de usuario.
     */
    StorageService.prototype.getGender = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.USER).then(function (user) {
                            return (user) ? user.gender : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Almacena el número de teléfono del usuario.
     * @param {string} phone Número de teléfono del usuario
     */
    StorageService.prototype.setPhoneNumber = function (phone) {
        var _this = this;
        this.storage.get(this.USER).then(function (user) {
            user.phone = phone;
            _this.storage.set(_this.USER, user);
        });
    };
    /**
     * Devuelve el número de teléfono de usuario almacenado.
     * @return {Promise<string>} Número de teléfono de usuario.
     */
    StorageService.prototype.getPhoneNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.USER).then(function (user) {
                            return (user) ? user.phone : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Almacena dirección del usuario
     * @param {Address} address Drección del usuario.
     */
    StorageService.prototype.setAddress = function (address) {
        var _this = this;
        this.storage.get(this.USER).then(function (user) {
            user.address = address;
            _this.storage.set(_this.USER, user);
        });
    };
    /**
     * Devuelve la dirección del usuario.
     * @return {Promise<Address>} Dirección del usuario.
     */
    StorageService.prototype.getAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.USER).then(function (user) {
                            return (user) ? user.address : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Almacena la fecha de cumpleaños del usuario
     * @param {string} birthday Fecha de cumpleaños del usuario
     */
    StorageService.prototype.setBirthday = function (birthday) {
        var _this = this;
        this.storage.get(this.USER).then(function (user) {
            user.birthday = birthday;
            _this.storage.set(_this.USER, user);
        });
    };
    /**
     * Devuelve la fecha de cumpleaños del usuario
     * @return {Promise<string>} Fecha de cumpleaños del usuario
     */
    StorageService.prototype.getBirthday = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.USER).then(function (user) {
                            return (user) ? user.birthday : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Almacena el email del usuario.
     * @param {string} email
     */
    StorageService.prototype.setEmail = function (email) {
        var _this = this;
        this.storage.get(this.USER).then(function (user) {
            user.email = email;
            _this.storage.set(_this.USER, user);
        });
    };
    /**
     * Devuelve el email del usuario almacenado.
     * @return {Promise<string>} Email.
     */
    StorageService.prototype.getEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.USER).then(function (user) {
                            return (user) ? user.email : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Devuelve la url de la imagen del usuario.
     * @return {Promise<string>} url.
     */
    StorageService.prototype.getImgUrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.USER).then(function (user) {
                            return (user.media) ? user.media.url : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Almacena el url donde está la imagen de perfil del usuario.
     * @param {string} url
     */
    StorageService.prototype.setImgUrl = function (url) {
        var _this = this;
        this.storage.get(this.USER).then(function (user) {
            user.media.url = url;
            _this.storage.set(_this.USER, user);
        });
    };
    /**
     * Devuelve la funte desde donde se esta conectando el usuario almacenado.
     * @return {Promise<string>} grant_type.
     */
    StorageService.prototype.getGrantType = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.USER).then(function (user) {
                            return (user) ? user.grant_type : null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Almacena la fuente desde donde se conecta el usuario.
     * @param {string} grantType
     */
    StorageService.prototype.setGrantType = function (grantType) {
        var _this = this;
        this.storage.get(this.USER).then(function (user) {
            user.grant_type = grantType;
            _this.storage.set(_this.USER, user);
        });
    };
    /**
     * Devuelve el estado de la sesión.
     * @return {Promise<boolean>} Estado de la sesión.
     */
    StorageService.prototype.isLoged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.SESION_STATE).then(function (value) {
                            return value === true;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Emite el evento para indicar que el usuario se registró.
     * @param {User} user
     */
    StorageService.prototype.signup = function (user) {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.setUser(user);
        this.events.publish('user:signup');
    };
    /**
     * Cierra la sesión del usuario.
     */
    StorageService.prototype.logout = function () {
        this.storage.remove(this.HAS_LOGGED_IN);
        this.storage.remove(this.USER);
        this.storage.remove(this.SESION_STATE);
        this.storage.remove(this.SESION_TOKEN);
        this.events.publish('user:logout');
    };
    /**
     * Almacena el idioma selecionado por el usuario.
     * @param lang Nombre del usuario
     */
    StorageService.prototype.setLang = function (lang, upload) {
        if (upload === void 0) { upload = true; }
        this.storage.set(this.LANG, lang);
        this.events.publish('user:lang', lang, upload);
    };
    /**
     * Devuelve el idioma selecionado por el usuario.
     * @return {Promise<string>} Nombre de usuario.
     */
    StorageService.prototype.getLang = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.LANG).then(function (value) {
                            return value;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StorageService.prototype.hasLoggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.HAS_LOGGED_IN).then(function (value) {
                            return value === true;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Revisa si el usuario ha visualizado la introducción.
     * @return {Promise<boolean>} Si ha visto el tutorial.
     */
    StorageService.prototype.checkHasSeenTutorial = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.HAS_SEEN_TUTORIAL).then(function (hasSeenTutorial) {
                            return hasSeenTutorial;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Establece si el usuario ha visto el tutorial
     * @return {boolean} Si ha visto el tutorial.
     */
    StorageService.prototype.setHasSeenTutorial = function (hasSeenTutorial) {
        this.storage.set(this.HAS_SEEN_TUTORIAL, hasSeenTutorial);
    };
    StorageService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Events,
            Storage])
    ], StorageService);
    return StorageService;
}());
export { StorageService };
//# sourceMappingURL=storage.service.js.map