import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './../storage/storage.service';
import { Router } from '@angular/router';
import { TestBed, inject } from '@angular/core/testing';
import { SesionGuard } from './sesion.guard';
describe('SesionGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                IonicStorageModule.forRoot()
            ],
            providers: [
                SesionGuard,
                StorageService,
                { provide: Router, useClass: /** @class */ (function () {
                        function class_1() {
                            this.navigate = jasmine.createSpy('navigate');
                        }
                        return class_1;
                    }()) }
            ]
        });
    });
    it('should ...', inject([SesionGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=sesion.guard.spec.js.map