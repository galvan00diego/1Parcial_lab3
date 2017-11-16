namespace App
{
    export abstract class Vehiculo
    {
        private _marca:string;
        private _patente:string;
        private _precio:number;

        public constructor(marca:string,patente:string,precio:number)
        {
            this._marca=marca;
            this._patente=patente;
            this._precio=precio;
        }

        public vehiculoToString():string
        {
            return `"marca":"${this._marca}", "patente":"${this._patente}", "precio":"${this._precio}"`;
        }
    }
}