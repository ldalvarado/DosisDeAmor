import { Router } from '@angular/router';
import { StorageService } from './../../../providers/storage/storage.service';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { PrivacyPage } from './privacy.page';
import { IonicModule } from '@ionic/angular';
describe('PrivacyPage', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                IonicModule,
                TranslateModule.forChild(),
                IonicStorageModule.forRoot()
            ],
            declarations: [PrivacyPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                HttpClient,
                HttpHandler,
                TranslateStore,
                StorageService,
                { provide: Router, useClass: /** @class */ (function () {
                        function class_1() {
                            this.navigate = jasmine.createSpy('navigate');
                        }
                        return class_1;
                    }()) }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PrivacyPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=privacy.page.spec.js.map