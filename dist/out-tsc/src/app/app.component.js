import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { environment } from './../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { Platform, Config, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService, ApiService /*, PushNotifications */ } from './providers/providers';
import { Router } from '@angular/router';
var AppComponent = /** @class */ (function () {
    function AppComponent(translate, storage, config, platform, events, splashScreen, statusBar, router, api) {
        var _this = this;
        this.translate = translate;
        this.storage = storage;
        this.config = config;
        this.platform = platform;
        this.events = events;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.router = router;
        this.api = api;
        this.loggedIn = false;
        this.user = {
            name: '',
            email: '',
            media: {
                url: ''
            }
        };
        this.img_url = this.user.media.url;
        this.informationPages = [
            { title: 'NAV.APP_NAME', name: 'MainPage', link: '/main', icon: 'chatbubbles' },
            { title: 'NAV.WALL', name: 'WallPage', link: '/wall', icon: 'paw' }
        ];
        this.adminPages = [
            { title: 'NAV.ANALYTICS', name: 'AnalyticsPage', link: '/analytics', icon: 'analytics' },
            { title: 'NAV.USERS', name: 'UsersPage', link: '/users', icon: 'contacts' }
        ];
        this.loggedOutPages = [
            { title: 'NAV.PRESENTATION', name: 'TutorialPage', link: '/tutorial', icon: 'star' },
            { title: 'NAV.SIGNUP', name: 'SignupPage', link: '/signup', icon: 'person-add' },
            { title: 'Salir', name: 'LoginPage', link: '/login', icon: 'log-in' }
        ];
        this.loggedInPages = [
            { title: 'NAV.ACCOUNT', name: 'AccountPage', link: '/account', icon: 'person' },
            { title: 'NAV.PRIVACY_CONFIG', name: 'PrivacyPage', link: '/privacy', icon: 'shirt' },
            { title: 'NAV.LOGOUT', name: 'MainPage', icon: 'log-out', logsOut: true }
        ];
        this.lastTimeBackPress = 0;
        this.timePeriodToExit = 2000;
        this.langSelector = [{
                title: 'Español',
                selected: false,
                lang: 'es'
            },
            {
                title: 'English',
                selected: false,
                lang: 'en'
            }];
        this.initTranslate();
        this.initializeApp();
        // Comprueba si el usuario ya ha visto el tutorial
        this.storage.checkHasSeenTutorial().then(function (hasSeenTutorial) {
            if (!hasSeenTutorial) {
                _this.router.navigate(['/tutorial']);
            }
        });
        this.platform.ready().then(function () {
            _this.storage.isLoged().then(function (isLoged) {
                _this.storage.getUser().then(function (user) {
                    if (user && !user.hasOwnProperty('media')) {
                        user.media = {};
                    }
                    _this.user = user;
                });
                if (isLoged) {
                    setTimeout(function () {
                        _this.updateLocalUserInformation();
                    }, 1000);
                }
                _this.loggedIn = (isLoged === true);
            });
        });
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        this.listenEvents();
    };
    /**
     * Establezca el idioma predeterminado para las cadenas de traducción y el idioma actual.
     */
    AppComponent.prototype.initTranslate = function () {
        var _this = this;
        this.translate.setDefaultLang('es');
        this.storage.getLang().then(function (lang) {
            if (!lang && _this.translate.getBrowserLang() !== undefined) {
                _this.translate.use(_this.translate.getBrowserLang());
            }
            else {
                _this.translate.use(lang || 'es'); // Establezca su idioma aquí
                _this.langSelector.find(function (item) {
                    return item.lang === (lang || 'es');
                }).selected = true;
            }
            _this.translate.get(['BACK_BUTTON_TEXT']).subscribe(function (values) {
                _this.config.set('backButtonText', values.BACK_BUTTON_TEXT);
            });
        });
    };
    /**
     * Cambia el idioma seleccionado.
     * @param item
     */
    AppComponent.prototype.changeLang = function (inItem) {
        this.storage.setLang(inItem.lang);
        this.langSelector.forEach(function (item) {
            item.selected = false;
        });
        this.langSelector.find(function (item) {
            return item.lang === (inItem.lang);
        }).selected = true;
    };
    /**
     * Cierra el splash screen para mostrar la aplicación.
     */
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    /**
     * Administra la navegación por la aplicación y las opciones de la sesión para el usuario.
     */
    AppComponent.prototype.openPage = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (page.logsOut === true) {
                    // da el tiempo de menú para cerrar antes de cambiar a desconectado
                    this.api.delete('/user/sesion').catch(function (error) {
                        console.log('[app-118]', error);
                    });
                    this.storage.logout();
                }
                else {
                    this.router.navigateByUrl(page.link || environment.MAIN_URL);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Escucha los eventos _user:login_ y _user:logout_ que son disparados desde el menú de la izquierda
     * según el estado de la sesión.
     */
    AppComponent.prototype.listenEvents = function () {
        var _this = this;
        this.events.subscribe('user:login', function (user) {
            if (user && !user.hasOwnProperty('media')) {
                user.media = {};
            }
            _this.user = user;
            _this.loggedIn = true;
        });
        this.events.subscribe('user:avatar', function (url) {
            _this.user.media.url = url;
        });
        this.events.subscribe('user:logout', function () {
            _this.loggedIn = false;
            _this.user = {
                name: '',
                email: '',
                media: { url: '' }
            };
            _this.router.navigate(['/login']);
        });
        this.events.subscribe('user:lang', function (lang, upload) {
            if (upload === void 0) { upload = true; }
            lang = (lang.match(/es|en/) ? lang : 'es');
            _this.translate.use(lang);
            if (upload) {
                _this.storage.getId().then(function (userId) {
                    if (userId) {
                        _this.api.put('/user/lang', { lang: lang });
                    }
                });
            }
        });
        this.events.subscribe('navigate:root', function (page) {
            _this.openPage(page);
        });
        this.events.subscribe('user:role', function (role) {
            _this.user.role = role;
        });
    };
    /**
     * Llama la información del usuario para actualizar en el almacenamiento local.
     */
    AppComponent.prototype.updateLocalUserInformation = function () {
        var _this = this;
        this.storage.getId().then(function (userId) {
            if (userId) {
                _this.api.get('/user').then(function (user) {
                    _this.storage.setCredentials(user);
                    _this.user = user;
                    _this.storage.setLang(user.lang, false);
                }, function (fail) {
                    console.log('[app-171]', fail);
                });
            }
        });
    };
    /**
     * Verifica si esta activa la página que se seleccione del menú de la izquierda,
     * ilumina el icono correspondiente en caso de que no.
     */
    AppComponent.prototype.isActive = function (page) {
        if (page.link && this.router.url === page.link) {
            return 'primary';
        }
        return;
    };
    /**
     * Navega hacia la página para gestionar el usuario.
     */
    AppComponent.prototype.goToAccount = function () {
        this.router.navigate(['/account']);
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.scss']
        }),
        __metadata("design:paramtypes", [TranslateService,
            StorageService,
            Config,
            Platform,
            Events,
            SplashScreen,
            StatusBar,
            Router,
            ApiService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map