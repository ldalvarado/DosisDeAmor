import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './../../providers/storage/storage.service';
import { FacebookService } from 'ngx-facebook';
import { SocialLoginService } from './../../providers/api/social-login.service';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
describe('LoginPage', function () {
    var component;
    var fixture;
    var fakeActivatedRoute = {
        snapshot: { data: { token: null } }
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
            declarations: [LoginPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                HttpClient,
                HttpHandler,
                TranslateStore,
                StorageService,
                SocialLoginService,
                FacebookService,
                Facebook,
                GooglePlus,
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
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=login.page.spec.js.map