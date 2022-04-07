import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './../../providers/storage/storage.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { async, TestBed } from '@angular/core/testing';
import { BulletinComponent } from './bulletin.component';
describe('BulletinComponent', function () {
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
            declarations: [BulletinComponent],
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
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(BulletinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=bulletin.component.spec.js.map