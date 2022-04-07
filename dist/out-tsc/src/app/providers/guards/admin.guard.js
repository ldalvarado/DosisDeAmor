import { __decorate, __metadata } from "tslib";
import { StorageService } from '../storage/storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
var AdminGuard = /** @class */ (function () {
    function AdminGuard(router, userData) {
        this.router = router;
        this.userData = userData;
    }
    /**
     * Evalúa si la sesión del usuario es de un adiministrador.
     *
     * No hay problema con evaluarlo del lado del cliente, porque
     * se realiza la evaluación del lado del servidor también.
     *
     * @param {ActivatedRouteSnapshot} next
     * @param {RouterStateSnapshot} state
     */
    AdminGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        return this.userData.getUserRole().then(function (role) {
            if (role === 'admin') {
                return true;
            }
            _this.router.navigate(['./login']);
            return false;
        });
    };
    AdminGuard = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Router,
            StorageService])
    ], AdminGuard);
    return AdminGuard;
}());
export { AdminGuard };
//# sourceMappingURL=admin.guard.js.map