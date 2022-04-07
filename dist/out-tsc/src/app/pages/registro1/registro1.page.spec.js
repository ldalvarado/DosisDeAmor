import { Router, ActivatedRoute } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './../../providers/storage/storage.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Registro1Page } from './registro1.page';
describe('registro1Page', function () {
    var component;
    var fixture;
    var fakeActivatedRoute = {
        snapshot: { data: { user_id: 1 } }
    };
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                TranslateModule.forChild(),
                IonicStorageModule.forRoot()
            ],
            declarations: [Registro1Page],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                HttpClient,
                HttpHandler,
                StorageService,
                { provide: ActivatedRoute, useValue: fakeActivatedRoute },
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
        fixture = TestBed.createComponent(Registro1Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registro1.page.spec.js.map