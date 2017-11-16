///<reference path="Vehiculo.ts"/>
namespace App
{
    export class Auto extends Vehiculo
    {
        private _color:string;
        private _foto:any;

        public constructor(marca:string,patente:string,precio:number,color:string,foto?:string)
        {
            super(marca,patente,precio);
            this._color=color;
            this._foto=foto;
        }

    public autoToJson():any
    {
        return `{${super.vehiculoToString()}, "color":"${this._color}", "foto":"${this._foto}"}`;
    }
    }
}