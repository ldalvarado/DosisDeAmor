import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../directives/validation.service';
import { TranslateService } from '@ngx-translate/core';
var ControlMessagesComponent = /** @class */ (function () {
    function ControlMessagesComponent(translate) {
        this.translate = translate;
    }
    Object.defineProperty(ControlMessagesComponent.prototype, "errorMessage", {
        get: function () {
            for (var propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                    return this.translate.instant(ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName])) + " " + (this.control.errors[propertyName].requiredLength || '');
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", FormControl)
    ], ControlMessagesComponent.prototype, "control", void 0);
    ControlMessagesComponent = __decorate([
        Component({
            selector: 'control-messages',
            template: "<div *ngIf=\"errorMessage !== null\">\n    <ion-label color=\"danger\">{{errorMessage}}</ion-label>\n  </div>",
            styles: ['ion-label { padding-left: 15px; }']
        }),
        __metadata("design:paramtypes", [TranslateService])
    ], ControlMessagesComponent);
    return ControlMessagesComponent;
}());
export { ControlMessagesComponent };
//# sourceMappingURL=control-messages.component.js.map