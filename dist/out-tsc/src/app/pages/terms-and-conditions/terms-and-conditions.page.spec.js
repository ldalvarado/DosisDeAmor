import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { TermsAndConditionsPage } from './terms-and-conditions.page';
describe('TermsAndConditionsPage', function () {
    var component;
    var fixture;
    var fakeActivatedRoute = {
        params: {
            subscribe: function (fn) { return fn({
                segment: '',
            }); },
        },
    };
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            declarations: [TermsAndConditionsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: ActivatedRoute, useValue: fakeActivatedRoute }
            ],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(TermsAndConditionsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=terms-and-conditions.page.spec.js.map