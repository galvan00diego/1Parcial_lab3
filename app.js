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
            return "{" + _super.prototype.vehiculoToString.call(this) + ", \"color\":\"" + this._color + "\", \"foto\":\"" + this._foto + "\"}";
        };
        return Auto;
    }(App.Vehiculo));
    App.Auto = Auto;
})(App || (App = {}));
///<reference path="libs/jquery/index.d.ts"/>
///<reference path="Vehiculo.ts"/>
///<reference path="Auto.ts"/>
var App;
(function (App) {
    var ManejadoraDeAutos = /** @class */ (function (_super) {
        __extends(ManejadoraDeAutos, _super);
        function ManejadoraDeAutos() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ManejadoraDeAutos.agregarAuto = function () {
            var marca = $("#txtMarca").val();
            var patente = $("#txtPatente").val();
            var precio = $("#txtPrecio").val();
            var color = $("#txtColor").val();
            var archivo = document.getElementById("archivo");
            var formData = new FormData();
            formData.append("foto", archivo.files[0]);
            var autoN = new App.Auto(marca, patente, precio, color, archivo);
            var dataJ = autoN.autoToJson();
            console.log(dataJ);
            formData.append("valorJ", dataJ);
            formData.append("caso", "1");
            $.ajax({
                type: "POST",
                url: "backend.php",
                dataType: "text",
                cache: false,
                contentType: false,
                processData: false,
                data: formData,
                async: true
            })
                .done(function (resultado) {
                $("#txtMarca").val("");
                $("#txtPatente").val("");
                $("#txtPrecio").val("");
                $("#txtColor").val("");
                $("#archivo").val("");
                $("#btnAgregar").val("Agregar");
                $("#divTabla").html("");
                alert(JSON.stringify(resultado));
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        };
        ManejadoraDeAutos.mostrarAutos = function () {
            $.ajax({
                type: "POST",
                url: "backend.php",
                dataType: "text",
                data: "caso=" + 2,
                async: true
            })
                .done(function (jsonRecibido) {
                var tabla = "<table border=4><tr><td>MARCA</td><td>PATENTE</td><td>PRECIO</td><td>COLOR</td><td>IMAGEN</td><td>ACCION</td></tr>";
                var jsonMuestro = JSON.parse(jsonRecibido);
                console.log("Se muestra lista de autos en pantalla.");
                for (var i = 0; i < jsonMuestro.length; i++) {
                    tabla += "<tr><td>" + jsonMuestro[i].marca + "</td><td>" + jsonMuestro[i].patente + "</td><td>" + jsonMuestro[i].precio + "</td><td>" + jsonMuestro[i].color + ("</td><td><img src=\"./BACKEND/fotos/" + jsonMuestro[i].foto + "\" width='50px' height='50px'></td>");
                    tabla += "<td><input type=\"button\" value=\"Eliminar\" onclick=\"App.ManejadoraDeAutos.eliminarAuto('" + jsonMuestro[i].patente + "')\">";
                    tabla += "<input type=\"button\" value=\"Modificar\" onclick=\"App.ManejadoraDeAutos.modificarAuto('" + jsonMuestro[i].marca + "','" + jsonMuestro[i].patente + "','" + jsonMuestro[i].precio + "','" + jsonMuestro[i].color + "','" + jsonMuestro[i].foto + "')\"></td></tr>";
                }
                tabla += "</table>";
                $("#divTabla").html(tabla);
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        };
        ManejadoraDeAutos.mostrarAutosEliminados = function () {
            $.ajax({
                type: "POST",
                url: "backend.php",
                dataType: "text",
                data: "caso=" + 5,
                async: true
            })
                .done(function (jsonRecibido) {
                var tabla = "<table border=4><tr><td>MARCA</td><td>PATENTE</td><td>PRECIO</td><td>COLOR</td><td>IMAGEN</td></tr>";
                var jsonMuestro = JSON.parse(jsonRecibido);
                console.log("Se muestra lista de autos eliminados en pantalla.");
                for (var i = 0; i < jsonMuestro.length; i++) {
                    tabla += "<tr><td>" + jsonMuestro[i].marca + "</td><td>" + jsonMuestro[i].patente + "</td><td>" + jsonMuestro[i].precio + "</td><td>" + jsonMuestro[i].color + ("</td><td><img src=\"./BACKEND/fotoseliminadas/" + jsonMuestro[i].foto + "\" width='50px' height='50px'></td>");
                }
                tabla += "</table>";
                $("#divTabla").html("");
                $("#divTabla").html(tabla);
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        };
        ManejadoraDeAutos.modificarAuto = function (marca, patente, precio, color, foto) {
            $("#btnAgregar").attr("value", "Guardar");
            /********************************************** */
            // $("#btnAgregar").click(function(){
            //     let marca:any=$("#txtMarca").val();
            //     let patente:any=$("#txtPatente").val();
            //     let precio:any=$("#txtPrecio").val();
            //     let color:any=$("#txtColor").val();
            //     let archivo : any = (<HTMLInputElement>document.getElementById("archivo"));
            //     let formData : FormData = new FormData();
            //     formData.append("foto",archivo.files[0]);
            //     var autoN:Auto=new Auto(marca,patente,precio,color,archivo);
            //     let dataJ:string= autoN.autoToJson();
            //     console.log(dataJ);
            //     formData.append("valorJ",dataJ);
            //     formData.append("caso","3");
            /****************************** */
            $("#txtMarca").val(marca);
            $("#txtPatente").val(patente);
            $("#txtPrecio").val(precio);
            $("#txtColor").val(color);
            $("#archivo").hide();
            $.ajax({
                type: "POST",
                url: "backend.php",
                dataType: "text",
                // cache: false,
                // contentType: false,
                // processData: false,
                // data:formData,
                data: "patenteE=" + patente + "&caso=" + 3,
                async: true
            })
                .done(function (res) {
                console.log(res);
                ManejadoraDeAutos.mostrarAutos();
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        };
        ManejadoraDeAutos.eliminarAuto = function (patenteElimino) {
            if (confirm("Esta seguro que quiere eliminar el auto de patente " + patenteElimino) == true) {
                $.ajax({
                    type: "POST",
                    url: "backend.php",
                    dataType: "text",
                    data: "patenteE=" + patenteElimino + "&caso=" + 4,
                    async: true
                })
                    .done(function (res) {
                    alert(res);
                    ManejadoraDeAutos.mostrarAutos();
                })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                });
            }
        };
        ManejadoraDeAutos.filtrarPorMarca = function () {
            $.ajax({
                type: "POST",
                url: "backend.php",
                dataType: "text",
                data: "caso=" + 6,
                async: true
            })
                .done(function (jsonRecibido) {
                var tabla = "<table border=4><tr><td>MARCA</td><td>PATENTE</td><td>PRECIO</td><td>COLOR</td><td>IMAGEN</td><td>ACCION</td></tr>";
                var jsonMuestro = JSON.parse(jsonRecibido);
                console.log("Se muestra lista de autos en pantalla.");
                for (var i = 0; i < jsonMuestro.length; i++) {
                    tabla += "<tr><td>" + jsonMuestro[i].marca + "</td><td>" + jsonMuestro[i].patente + "</td><td>" + jsonMuestro[i].precio + "</td><td>" + jsonMuestro[i].color + ("</td><td><img src=\"./BACKEND/fotos/" + jsonMuestro[i].foto + "\" width='50px' height='50px'></td>");
                    tabla += "<td><input type=\"button\" value=\"Eliminar\" onclick=\"App.ManejadoraDeAutos.eliminarAuto('" + jsonMuestro[i].patente + "')\">";
                    tabla += "<input type=\"button\" value=\"Modificar\" onclick=\"App.ManejadoraDeAutos.modificarAuto('" + jsonMuestro[i].marca + "','" + jsonMuestro[i].patente + "','" + jsonMuestro[i].precio + "','" + jsonMuestro[i].color + "','" + jsonMuestro[i].foto + "')\"></td></tr>";
                }
                tabla += "</table>";
                $("#divTabla").html(tabla);
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        };
        return ManejadoraDeAutos;
    }(App.Auto));
    App.ManejadoraDeAutos = ManejadoraDeAutos;
})(App || (App = {}));
