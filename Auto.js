var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<reference path="Vehiculo.ts"/>
var App;
(function (App) {
    var Auto = /** @class */ (function (_super) {
        __extends(Auto, _super);
        function Auto(marca, patente, precio, color, foto) {
            var _this = _super.call(this, marca, patente, precio) || this;
            _this._color = color;
            _this._foto = foto;
            return _this;
        }
        Auto.prototype.autoToJson = function () {
            return "{" + _super.prototype.vehiculoToString.call(this) + ", \"color\":" + this._color + ", \"foto\":\"" + this._foto + "\"}";
        };
        return Auto;
    }(App.Vehiculo));
    App.Auto = Auto;
})(App || (App = {}));
