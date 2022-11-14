import { Cliente } from "./cliente-interface";
import { productos } from "./productos";

export interface dtoNuevaVenta{
    id?:number;
    total?: number;
    fecha?: string;
    producto?: productos[];
    Cliente?: Cliente;
    formaPago?: string;
}