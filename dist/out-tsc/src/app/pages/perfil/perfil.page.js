import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
var PerfilPage = /** @class */ (function () {
    function PerfilPage(translate, http) {
        this.translate = translate;
        this.http = http;
        this.fotoPerfil = window.localStorage['fotoPerfil'];
        this.idMascota = window.localStorage['IdMascota'];
        this.token = window.localStorage['token'];
        this.apiUrl = environment.SERVER_URL;
        this.datosPerfil(this.idMascota);
    }
    PerfilPage.prototype.ngOnInit = function () {
    };
    PerfilPage.prototype.ionViewWillEnter = function () {
        this.idMascota = window.localStorage['IdMascota'];
        this.fotoPerfil = window.localStorage['fotoPerfil'];
        this.datosPerfil(this.idMascota);
    };
    PerfilPage.prototype.datosPerfil = function (idM) {
        var _this = this;
        this.http.get(this.apiUrl + 'petprofile/' + idM)
            .subscribe(function (data) {
            console.log(data);
            _this.especie = data['especie'];
            _this.nombre = data['nombre'];
            _this.raza = data['raza'];
            _this.pais = data['pais'];
            _this.ciudad = data['ciudad'];
            _this.estado = data['estado'];
            _this.edad = data['edad'];
            _this.genero = data['genero'];
            _this.galeria = data['fotos'].original;
        });
    };
    PerfilPage.prototype.goToAccount = function (valor) {
        /*switch(valor) {
          case 1:
            this.expandedEspecie = true;
            this.expandedEstatus = false;
            this.expandedSexo = false;
            break;
          case 2:
            this.expandedEspecie = false;
            this.expandedEstatus = true;
            this.expandedSexo = false;
            break;
          case 3:
            this.expandedEspecie = false;
            this.expandedEstatus = false;
            this.expandedSexo = true;
            break;
          default:
            this.expandedEspecie = true;
            this.expandedEstatus = false;
            this.expandedSexo = false;
            break;
        }*/
    };
    /**
    * Refresca la página.
    * @param event
    */
    PerfilPage.prototype.doRefresh = function (event) {
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    PerfilPage = __decorate([
        Component({
            selector: 'app-perfil',
            templateUrl: './perfil.page.html',
            styleUrls: ['./perfil.page.scss'],
        }),
        __metadata("design:paramtypes", [TranslateService,
            HttpClient])
    ], PerfilPage);
    return PerfilPage;
}());
export { PerfilPage };
//# sourceMappingURL=perfil.page.js.map