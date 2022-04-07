import { __decorate, __metadata } from "tslib";
import { StorageService } from './../storage/storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
var SesionGuard = /** @class */ (function () {
    function SesionGuard(router, storage) {
        this.router = router;
        this.storage = storage;
    }
    /**
     * Evalúa la sesión del usuario regresa un booleano según corresponda.
     * @param {ActivatedRouteSnapshot} next
     * @param {RouterStateSnapshot} state
     */
    SesionGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        return this.storage.getId().then(function (userId) {
            if (userId) {
                return true;
            }
            _this.router.navigate(['./login']);
            return false;
        });
    };
    SesionGuard = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Router,
            StorageService])
    ], SesionGuard);
    return SesionGuard;
}());
export { SesionGuard };
//# sourceMappingURL=sesion.guard.js.map