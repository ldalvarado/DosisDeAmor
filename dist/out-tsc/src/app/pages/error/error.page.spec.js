import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ErrorPage } from './error.page';
describe('ErrorPage', function () {
    var component;
    var fixture;
    var fakeActivatedRoute = {
        snapshot: { data: {} }
    };
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                IonicModule,
                TranslateModule.forChild()
            ],
            declarations: [ErrorPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                TranslateStore,
                { provide: ActivatedRoute, useValue: fakeActivatedRoute },
                { provide: Router, useClass: /** @class */ (function () {
                        function class_1() {
                            this.navigate = jasmine.createSpy('navigate');
                        }
                        return class_1;
                    }()) }
            ],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ErrorPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=error.page.spec.js.map