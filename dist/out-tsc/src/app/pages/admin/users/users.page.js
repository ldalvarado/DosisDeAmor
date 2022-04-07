import { __decorate, __metadata } from "tslib";
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from '../../../providers/providers';
var UsersPage = /** @class */ (function () {
    function UsersPage(router, api) {
        this.router = router;
        this.api = api;
        this.users = [];
        this.lastPage = 1;
        this.search = '';
    }
    UsersPage.prototype.ionViewDidEnter = function () {
        this.getUsers();
    };
    /**
     * Recupera la información de los usuarios.
     * @param {number} page
     * @param {string} search
     * @return {Promise<boolean>} Regresa verdadero en caso de obtener más información y false en caso de obtener un error.
     */
    UsersPage.prototype.getUsers = function (page, search) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (search === void 0) { search = ''; }
        return new Promise(function (result) {
            _this.lastPage = page;
            _this.api.get("/users?page=" + page + "&search=" + search).then(function (response) {
                if (page === 1) {
                    _this.users = response.data;
                }
                else {
                    response.data.map(function (user) {
                        _this.users.push(user);
                    });
                }
                result(true);
            }, function (fail) {
                console.log('[users-40]', fail);
                result(false);
            });
        });
    };
    /**
     * Navega hacia la página de detalles del usuario.
     * @param {User} user
     */
    UsersPage.prototype.goToUserDetail = function (user) {
        this.router.navigate(['/account', user.id]);
    };
    /**
     * Actualiza las variables para realizar una búsqueda
     */
    UsersPage.prototype.onSearch = function () {
        this.lastPage = 1;
        this.getUsers(this.lastPage, this.search);
    };
    /**
     * Refresca la página.
     * @param event
     */
    UsersPage.prototype.doRefresh = function (event) {
        this.getUsers().then(function () {
            event.target.complete();
        });
    };
    /**
     * Llama a la función para cargar mas elementos cuando la página llega al final.
     * @param infiniteScroll
     */
    UsersPage.prototype.doScrollDown = function (infiniteScroll) {
        this.getUsers(this.lastPage + 1, this.search).then(function () {
            infiniteScroll.target.complete();
        });
    };
    UsersPage = __decorate([
        Component({
            selector: 'app-users',
            templateUrl: 'users.page.html',
            styleUrls: ['users.page.scss']
        }),
        __metadata("design:paramtypes", [Router,
            ApiService])
    ], UsersPage);
    return UsersPage;
}());
export { UsersPage };
//# sourceMappingURL=users.page.js.map