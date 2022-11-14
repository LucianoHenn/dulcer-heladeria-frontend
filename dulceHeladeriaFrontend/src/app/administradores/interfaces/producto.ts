import { ProductoArticulo } from "./productoArticulo";

export interface Producto {
    id: number, 
    nombre: string, 
    precio: number, 
    articulos: ProductoArticulo[],
    cantidad?: number
    cantMaxArticulos: number
}
