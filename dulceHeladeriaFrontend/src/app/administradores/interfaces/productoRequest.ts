import { productoArticuloResponse } from "./productoArticuloResponse";

export interface ProductoRequest{
    name: string,
    price: number,
    imageUrl: string
    items: productoArticuloResponse[],
    maxItemAmount: number
}