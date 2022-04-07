import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { PoliticsPage } from './politics.page';
describe('PoliticsPage', function () {
    var component;
    var fixture;
    var fakeActivatedRoute = {
        params: {
            subscribe: function (fn) { return fn({
                segment: 'end_user_agreement',
            }); },
        },
    };
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                TranslateModule.forChild()
            ],
            declarations: [PoliticsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                TranslateStore,
                { provide: ActivatedRoute, useValue: fakeActivatedRoute }
            ],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PoliticsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=politics.page.spec.js.map