import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, NavParams } from '@ionic/angular';
import { async, TestBed } from '@angular/core/testing';
import { ImgModalComponent } from './img-modal.component';
describe('ImgModalComponent', function () {
    var component;
    var fixture;
    var MockNavParams = /** @class */ (function () {
        function MockNavParams() {
            this.data = {
                imgs: [],
                position: 0,
                source: '',
                source_id: 1
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
                TranslateModule.forChild()
            ],
            declarations: [ImgModalComponent],
            providers: [
                { provide: NavParams, useClass: MockNavParams },
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ImgModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=img-modal.component.spec.js.map