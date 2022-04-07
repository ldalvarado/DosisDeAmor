import { Router } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './../../../providers/storage/storage.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { AnalyticsPage } from './analytics.page';
describe('AnalyticsPage', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                TranslateModule.forChild(),
                IonicStorageModule.forRoot()
            ],
            declarations: [AnalyticsPage],
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
                    }()) }
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AnalyticsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=analytics.page.spec.js.map