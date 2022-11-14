import { productoArticuloResponse } from "./productoArticuloResponse";

export interface VentaRequestDto{    
    clientId: number;
    clientName: string;
    paymentMethod: number;
    details: {productId: number, productName: string, amount: number, salePrice: number,productDetail: productoArticuloResponse[]}[];
}