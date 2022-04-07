import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './../storage/storage.service';
import { Router } from '@angular/router';
import { TestBed, inject } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';
describe('AdminGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                IonicStorageModule.forRoot()
            ],
            providers: [
                AdminGuard,
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
    it('should ...', inject([AdminGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=admin.guard.spec.js.map