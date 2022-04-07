import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { ModalBulletinPageModule } from './modal-bulletin/modal-bulletin.module';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './../../providers/storage/storage.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BulletinsPage } from './bulletins.page';
describe('BulletinsPage', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                ModalBulletinPageModule,
                IonicModule,
                TranslateModule.forChild(),
                IonicStorageModule.forRoot()
            ],
            declarations: [BulletinsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                StorageService,
                HttpClient,
                HttpHandler,
                TranslateStore,
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
        fixture = TestBed.createComponent(BulletinsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=bulletins.page.spec.js.map