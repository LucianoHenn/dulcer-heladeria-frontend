import { Deposito } from "./deposito";

export interface UbicacionDeposito{
    column?: string;
    row?: string;
    capacity?: number;
    depositId?: number;
    deposit?: string;
    itemTypeId?: number;
    itemType?: string;
    deletionDate?: Date;
    id: number;
}