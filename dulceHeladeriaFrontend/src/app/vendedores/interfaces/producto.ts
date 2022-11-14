import { Articulo } from "./articulo";

export interface Producto {
    id: number, 
    nombre: string, 
    precio: number, 
    articulos: Articulo[],
    cantidad?: number,
    cantMaxArticulos: number,
    imagen: string
}
