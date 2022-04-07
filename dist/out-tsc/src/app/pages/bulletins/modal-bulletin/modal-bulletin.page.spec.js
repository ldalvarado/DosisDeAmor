import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { TransferImgFileService } from './../../../providers/transfer/transfer-img-file.service';
import { Router } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './../../../providers/storage/storage.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, NavParams } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ModalBulletinPage } from './modal-bulletin.page';
describe('ModalBulletinPage', function () {
    var component;
    var fixture;
    var MockNavParams = /** @class */ (function () {
        function MockNavParams() {
            this.data = {
                user: {
                    bulletin_id: '1',
                }
            };
        }
        MockNavParams.prototype.get = function (param) {
            return this.data[param];
        };
        return MockNavParams;
    }());
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
            declarations: [ModalBulletinPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                Camera,
                File,
                FilePath,
                StorageService,
                HttpClient,
                HttpHandler,
                TransferImgFileService,
                TranslateStore,
                { provide: NavParams, useClass: MockNavParams },
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
        fixture = TestBed.createComponent(ModalBulletinPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=modal-bulletin.page.spec.js.map