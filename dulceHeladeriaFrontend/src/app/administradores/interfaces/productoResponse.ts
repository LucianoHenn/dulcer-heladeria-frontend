import { productoArticuloResponse } from "./productoArticuloResponse";

export interface productoResponse{
    id: number,
    name: string,
    price: number,
    items: productoArticuloResponse[],
    maxItemAmount: number
}