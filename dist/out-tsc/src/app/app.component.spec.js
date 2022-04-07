import { __awaiter, __generator } from "tslib";
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './providers/storage/storage.service';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Platform, IonicModule, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
describe('AppComponent', function () {
    var statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;
    beforeEach(async(function () {
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
        TestBed.configureTestingModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                RouterTestingModule,
                TranslateModule.forRoot(),
                IonicStorageModule.forRoot()
            ],
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                HttpClient,
                HttpHandler,
                TranslateStore,
                StorageService,
                Events,
                { provide: Router, useClass: /** @class */ (function () {
                        function class_1() {
                            this.navigate = jasmine.createSpy('navigate');
                        }
                        return class_1;
                    }()) },
                { provide: StatusBar, useValue: statusBarSpy },
                { provide: SplashScreen, useValue: splashScreenSpy },
                { provide: Platform, useValue: platformSpy },
            ],
        }).compileComponents();
    }));
    it('should create the app', function () {
        var fixture = TestBed.createComponent(AppComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    it('should initialize the app', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    TestBed.createComponent(AppComponent);
                    expect(platformSpy.ready).toHaveBeenCalled();
                    return [4 /*yield*/, platformReadySpy];
                case 1:
                    _a.sent();
                    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
                    expect(splashScreenSpy.hide).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    // TODO: add more tests!
});
//# sourceMappingURL=app.component.spec.js.map