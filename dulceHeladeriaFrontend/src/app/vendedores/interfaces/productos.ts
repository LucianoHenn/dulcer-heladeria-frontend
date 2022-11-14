//  export interface productos1{
//  helado1kg = [nombre='helado1kg',precio=1500,cantidadMaxGustos=4];
// heladomediokg:string;
// heladocuartokg:string;
// cucurucho:string;
// unabocha:string;
// dosbochas:string;
// cocacola:string;
// fanta:string;
// sprite:string;
// te:string;
// cafe:string;
// agua:string;
//}

import { Articulo } from "./articulo";
import { gustos } from "./gustos";

export interface productos{
    nombre:string;
    precio:number;
    cantidadMaxGustos?: number;
    imagen?: string;
    cantidad:number;
    articulos?: Articulo[];
//ESTO VIENE DE LA API??
}

// export class producto2{
//      primero = {
//         nombre: 'helado1kg',
//         precio: 1000,
//         cantidadMaxGustos: 4
//     }
//     segundo = {
//         nombre: 'helado 1/2kg',
//         precio: 700,
//         cantidadMaxGustos:3
//     }
// }