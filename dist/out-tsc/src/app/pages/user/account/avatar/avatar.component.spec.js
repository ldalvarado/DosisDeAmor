import { Router } from '@angular/router';
import { StorageService } from './../../../../providers/storage/storage.service';
import { TranslateService, TranslateStore, TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { TransferImgFileService } from './../../../../providers/transfer/transfer-img-file.service';
import { async, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';
import { IonicStorageModule } from '@ionic/storage';
describe('AvatarComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                IonicModule,
                TranslateModule.forRoot(),
                IonicStorageModule.forRoot()
            ],
            declarations: [AvatarComponent],
            providers: [
                Camera,
                File,
                FilePath,
                HttpClient,
                HttpHandler,
                TranslateService,
                TranslateStore,
                StorageService,
                TransferImgFileService,
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
        fixture = TestBed.createComponent(AvatarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=avatar.component.spec.js.map