import { FacebookService } from 'ngx-facebook';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './../../../providers/storage/storage.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Router } from '@angular/router';
import { GalleryComponent } from './../../gallery/gallery.component';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { PostPetsCardComponent } from './post-pets-card.component';
import { IonicModule } from '@ionic/angular';
describe('PostCardComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                IonicModule,
                CommonModule,
                TranslateModule.forChild(),
                IonicStorageModule.forRoot()
            ],
            declarations: [PostPetsCardComponent, GalleryComponent],
            providers: [
                HttpClient,
                HttpHandler,
                SocialSharing,
                TranslateStore,
                StorageService,
                FacebookService,
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
        fixture = TestBed.createComponent(PostPetsCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=post-pets-card.component.spec.js.map