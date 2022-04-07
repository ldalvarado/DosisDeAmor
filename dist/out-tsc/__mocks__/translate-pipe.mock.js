import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
var TranslatePipeMock = /** @class */ (function () {
    function TranslatePipeMock() {
        this.name = 'translate';
    }
    TranslatePipeMock.prototype.transform = function (query) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return query;
    };
    TranslatePipeMock = __decorate([
        Pipe({
            name: 'translate'
        })
    ], TranslatePipeMock);
    return TranslatePipeMock;
}());
export { TranslatePipeMock };
//# sourceMappingURL=translate-pipe.mock.js.map