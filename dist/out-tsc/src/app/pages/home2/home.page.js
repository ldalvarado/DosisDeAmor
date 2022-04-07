import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ToastController, PopoverController, } from '@ionic/angular';
import { ApiService } from '../../providers/providers';
import { PopoverComponent } from './popover';
import { HttpClient } from '@angular/common/http';
/**
 * Proporciona la vista para un formulario donde el usuario puede ingresar sus datos para iniciar sesión.
 * @author CloudSolutions CA
 */
var HomePage = /** @class */ (function () {
    function HomePage(toastCtrl, http, popoverController, router, api, route) {
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.popoverController = popoverController;
        this.router = router;
        this.api = api;
        this.route = route;
        this.progress = {
            type: 'determinate',
            value: 0
        };
        this.search = '';
        this.isPrimary = false;
        this.isReadyToLogin = false;
        this.token = window.localStorage['token'];
        this.usuario = window.localStorage['usuario'];
        this.usuario_id = window.localStorage['usuario_id'];
        //posts: Post[] = [];
        this.posts = [];
        this.lastPage = 1;
        this.like_btn = {
            color: 'black',
            icon_name: 'heart-outline'
        };
        this.tap = 0;
        // You can get this data from your API. This is a dumb data for being an example.
        this.stories = [
            {
                id: 1,
                img: '/assets/imgs/Imagenes/índice2.jpg',
                user_name: 'Lola'
            },
            {
                id: 2,
                img: '/assets/imgs/Imagenes/índice4.jpg',
                user_name: 'Luna'
            },
            {
                id: 3,
                img: '/assets/imgs/Imagenes/perro00.png',
                user_name: 'Gigante'
            },
            {
                id: 4,
                img: '/assets/imgs/Imagenes/índice.jpg',
                user_name: 'Princesa'
            },
            {
                id: 5,
                img: '/assets/imgs/Imagenes/índice3.jpg',
                user_name: 'Rey'
            },
            {
                id: 6,
                img: '/assets/imgs/Imagenes/índice5.jpg',
                user_name: 'Diego'
            },
            {
                id: 7,
                img: '/assets/imgs/Imagenes/perro00.png',
                user_name: 'Leon'
            },
            {
                id: 8,
                img: '/assets/imgs/Imagenes/índice.jpg',
                user_name: 'Princesa'
            },
            {
                id: 9,
                img: '/assets/imgs/Imagenes/índice3.jpg',
                user_name: 'Rey'
            },
            {
                id: 10,
                img: '/assets/imgs/Imagenes/índice5.jpg',
                user_name: 'Diego'
            },
            {
                id: 11,
                img: '/assets/imgs/Imagenes/perro00.png',
                user_name: 'Leon'
            }
        ];
        this.apiUrl = environment.SERVER_URL;
        this.mascotas();
    }
    HomePage.prototype.ionViewDidEnter = function () {
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
    HomePage.prototype.mascotas = function () {
        var _this = this;
        console.log(this.usuario_id, 'estoy en mascota');
        this.http.get(this.apiUrl + 'pets/' + this.usuario_id)
            .subscribe(function (data) {
            console.log(data);
            window.localStorage['mascota'] = data;
            _this.mascota = data[0]['Nombre'];
        });
    };
    HomePage.prototype.likeButton = function () {
        if (this.like_btn.icon_name === 'heart-outline') {
            this.like_btn.icon_name = 'heart';
            this.like_btn.color = 'danger';
            // Do some API job in here for real!
        }
        else {
            this.like_btn.icon_name = 'heart-outline';
            this.like_btn.color = 'black';
        }
    };
    HomePage.prototype.tapPhotoLike = function (times) {
        this.tap++;
        if (this.tap % 2 === 0) {
            this.likeButton();
        }
    };
    HomePage.prototype.presentPopover = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: PopoverComponent,
                            event: ev,
                            translucent: true
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.logout = function () {
        window.localStorage.clear();
        this.router.navigate(['/login']);
    };
    HomePage.prototype.presentToast = function (text) {
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
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.swipePage = function (event) {
        if (event.direction === 1) { // Swipe Left
            console.log("Swap Camera");
        }
        if (event.direction === 2) { // Swipe Right
            this.presentToast('soy un mensaje');
        }
    };
    HomePage.prototype.onSugerenciaChange = function (stories) {
        console.log(stories);
    };
    HomePage.prototype.getPosts = function (page, user_id, search) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (user_id === void 0) { user_id = null; }
        if (search === void 0) { search = ''; }
        return new Promise(function (result) {
            _this.lastPage = page;
            var path = (user_id) ? "/posts?page=" + page + "&user_id=" + user_id + "&search=" + search : "/posts?page=" + page + "&search=" + search;
            var path2 = 'publicaciones';
            _this.api.get(path2).then(function (response) {
                if (page === 1) {
                    console.log('hola');
                    _this.posts = response.data;
                    console.log(response.data);
                }
                else {
                    response.data.map(function (posts) {
                        //this.posts.push(posts);
                    });
                }
                result(true);
            }, function (fail) {
                console.log('[posts-51]', fail);
                result(false);
            });
        });
    };
    /**
     * Obtiene la información de un usuario.
     * @param {number} user_id
     * @param {number} page
     */
    HomePage.prototype.getUserContact = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.api.get("/user/contact/" + userId).catch(function (error) {
                                console.log('[wall-72]', error);
                            })];
                    case 1:
                        _a.userContact = _b.sent();
                        console.log('hola');
                        if (this.userContact && this.userContact.contact && this.userContact.contact.address) {
                            //this.setMap(this.userContact);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Refresca la página.
     * @param event
     */
    HomePage.prototype.doRefresh = function (event) {
        this.lastPage = 1;
        this.getPosts(this.lastPage).then(function () {
            event.target.complete();
        });
    };
    /**
     * Llama a la función para cargar mas elementos cuando la página llega al final.
     * @param infiniteScroll
     */
    HomePage.prototype.doScrollDown = function (infiniteScroll) {
        this.getPosts(this.lastPage + 1, this.userId, this.search).then(function (success) {
            infiniteScroll.target.complete();
        });
    };
    HomePage = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss']
        }),
        __metadata("design:paramtypes", [ToastController,
            HttpClient,
            PopoverController,
            Router,
            ApiService,
            ActivatedRoute])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map