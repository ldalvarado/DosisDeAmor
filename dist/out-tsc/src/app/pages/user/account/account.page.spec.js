import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './../../../providers/storage/storage.service';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { AccountPage } from './account.page';
describe('AccountPage', function () {
    var component;
    var fixture;
    var fakeActivatedRoute = {
        params: {
            subscribe: function (fn) { return fn({
                user_id: 1,
            }); },
        },
    };
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                IonicModule,
                TranslateModule.forChild(),
                IonicStorageModule.forRoot(),
            ],
            declarations: [AccountPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                HttpClient,
                HttpHandler,
                StorageService,
                TranslateStore,
                { provide: Router, useClass: /** @class */ (function () {
                        function class_1() {
                            this.navigate = jasmine.createSpy('navigate');
                        }
                        return class_1;
                    }()) },
                { provide: ActivatedRoute, useValue: fakeActivatedRoute }
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AccountPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=account.page.spec.js.map