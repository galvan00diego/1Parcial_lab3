///<reference path="libs/jquery/index.d.ts"/>
///<reference path="Vehiculo.ts"/>
///<reference path="Auto.ts"/>
namespace App
{
     
     export class ManejadoraDeAutos extends Auto
    {
        public static agregarAuto():void
        {
            let marca:any=$("#txtMarca").val();
            let patente:any=$("#txtPatente").val();
            let precio:any=$("#txtPrecio").val();
            let color:any=$("#txtColor").val();

            let archivo : any = (<HTMLInputElement>document.getElementById("archivo"));

            let formData : FormData = new FormData();
            formData.append("foto",archivo.files[0]);
            

            var autoN:Auto=new Auto(marca,patente,precio,color,archivo);
            let dataJ:string= autoN.autoToJson();
            console.log(dataJ);
            formData.append("valorJ",dataJ);
            formData.append("caso","1");
            
            $.ajax({
                type:"POST",
                url:"backend.php",
                dataType:"text",
                cache: false,
                contentType: false,
                processData: false,
                data:formData,
                async:true
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
        }

        public static mostrarAutos():void
        {
            $.ajax({
            type:"POST",
            url:"backend.php",
            dataType:"text",
            data:"caso="+2,
            async:true
        })
        .done(function (jsonRecibido) {
        let tabla:string="<table border=4><tr><td>MARCA</td><td>PATENTE</td><td>PRECIO</td><td>COLOR</td><td>IMAGEN</td><td>ACCION</td></tr>";
        let jsonMuestro:any[]=JSON.parse(jsonRecibido);
        console.log("Se muestra lista de autos en pantalla.");
            for(var i=0;i<jsonMuestro.length;i++)
            {
                tabla+="<tr><td>"+jsonMuestro[i].marca+"</td><td>"+jsonMuestro[i].patente+"</td><td>"+jsonMuestro[i].precio+"</td><td>"+jsonMuestro[i].color+`</td><td><img src="./BACKEND/fotos/${jsonMuestro[i].foto}" width='50px' height='50px'></td>`;
                tabla+=`<td><input type="button" value="Eliminar" onclick="App.ManejadoraDeAutos.eliminarAuto('${jsonMuestro[i].patente}')">`;
                tabla+=`<input type="button" value="Modificar" onclick="App.ManejadoraDeAutos.modificarAuto('${jsonMuestro[i].marca}','${jsonMuestro[i].patente}','${jsonMuestro[i].precio}','${jsonMuestro[i].color}','${jsonMuestro[i].foto}')"></td></tr>`;
            }
            tabla+="</table>";
            $("#divTabla").html(tabla);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
        });    
        }

        public static mostrarAutosEliminados():void
        {
            $.ajax({
            type:"POST",
            url:"backend.php",
            dataType:"text",
            data:"caso="+5,
            async:true
        })
        .done(function (jsonRecibido) {
        let tabla:string="<table border=4><tr><td>MARCA</td><td>PATENTE</td><td>PRECIO</td><td>COLOR</td><td>IMAGEN</td></tr>";
        let jsonMuestro:any[]=JSON.parse(jsonRecibido);
        console.log("Se muestra lista de autos eliminados en pantalla.");
            for(var i=0;i<jsonMuestro.length;i++)
            {
                tabla+="<tr><td>"+jsonMuestro[i].marca+"</td><td>"+jsonMuestro[i].patente+"</td><td>"+jsonMuestro[i].precio+"</td><td>"+jsonMuestro[i].color+`</td><td><img src="./BACKEND/fotoseliminadas/${jsonMuestro[i].foto}" width='50px' height='50px'></td>`;                
            }
            tabla+="</table>";
            $("#divTabla").html("");
            $("#divTabla").html(tabla);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
        });    
        }

        public static modificarAuto(marca:string,patente:string,precio:number,color:string,foto:any):void
        {
            $("#btnAgregar").attr("value","Guardar");
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
            
            

            
            $.ajax({
                    type:"POST",
                    url:"backend.php",
                    dataType:"text",
                   
                    data:"patenteE="+patente+"&caso="+3,
                    async:true
                })
            .done(function (res) {
            console.log(res);
            ManejadoraDeAutos.mostrarAutos();
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });    
        }

        public static eliminarAuto(patenteElimino:string):void
        {
            if(confirm(`Esta seguro que quiere eliminar el auto de patente ${patenteElimino}`)==true)
            {
            $.ajax({
                type:"POST",
                url:"backend.php",
                dataType:"text",
                data:"patenteE="+patenteElimino+"&caso="+4,
                async:true
            })
            .done(function (res) {
                alert(res);
                ManejadoraDeAutos.mostrarAutos();
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });    
            }
        }
        public static filtrarPorMarca():void
        {
            $.ajax({
                type:"POST",
                url:"backend.php",
                dataType:"text",
                data:"caso="+6,
                async:true
            })
            .done(function (jsonRecibido) {
            let tabla:string="<table border=4><tr><td>MARCA</td><td>PATENTE</td><td>PRECIO</td><td>COLOR</td><td>IMAGEN</td><td>ACCION</td></tr>";
            let jsonMuestro:any[]=JSON.parse(jsonRecibido);
            console.log("Se muestra lista de autos en pantalla.");
                for(var i=0;i<jsonMuestro.length;i++)
                {
                    tabla+="<tr><td>"+jsonMuestro[i].marca+"</td><td>"+jsonMuestro[i].patente+"</td><td>"+jsonMuestro[i].precio+"</td><td>"+jsonMuestro[i].color+`</td><td><img src="./BACKEND/fotos/${jsonMuestro[i].foto}" width='50px' height='50px'></td>`;
                    tabla+=`<td><input type="button" value="Eliminar" onclick="App.ManejadoraDeAutos.eliminarAuto('${jsonMuestro[i].patente}')">`;
                    tabla+=`<input type="button" value="Modificar" onclick="App.ManejadoraDeAutos.modificarAuto('${jsonMuestro[i].marca}','${jsonMuestro[i].patente}','${jsonMuestro[i].precio}','${jsonMuestro[i].color}','${jsonMuestro[i].foto}')"></td></tr>`;
                }
                tabla+="</table>";
                $("#divTabla").html(tabla);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });    
        }
    }
}
