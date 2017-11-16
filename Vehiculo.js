var App;
(function (App) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(marca, patente, precio) {
            this._marca = marca;
            this._patente = patente;
            this._precio = precio;
        }
        Vehiculo.prototype.vehiculoToString = function () {
            return "\"marca\":\"" + this._marca + "\", \"patente\":\"" + this._patente + "\", \"precio\":\"" + this._precio + "\"";
        };
        return Vehiculo;
    }());
    App.Vehiculo = Vehiculo;
})(App || (App = {}));
