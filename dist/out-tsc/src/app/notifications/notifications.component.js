import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
var NotificationsComponent = /** @class */ (function () {
    function NotificationsComponent(http) {
        this.http = http;
        this.apiUrl = environment.SERVER_URL;
        this.usuario_id = window.localStorage['usuario_id'];
        this.CargaPerfil(this.usuario_id);
    }
    NotificationsComponent.prototype.ngOnInit = function () { };
    NotificationsComponent.prototype.CargaPerfil = function (id) {
        var _this = this;
        this.http.get(this.apiUrl + 'pets/' + id)
            .subscribe(function (data) {
            _this.perfil = data;
            console.log(_this.perfil);
        });
    };
    NotificationsComponent = __decorate([
        Component({
            selector: 'app-notifications',
            templateUrl: './notifications.component.html',
            styleUrls: ['./notifications.component.scss'],
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], NotificationsComponent);
    return NotificationsComponent;
}());
export { NotificationsComponent };
//# sourceMappingURL=notifications.component.js.map