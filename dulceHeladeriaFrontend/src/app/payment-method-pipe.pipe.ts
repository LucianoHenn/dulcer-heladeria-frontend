import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentMethodPipe'
})
export class PaymentMethodPipePipe implements PipeTransform {

  nvalue: number
  transform(value: unknown, ...args: unknown[]): any {
    return this.nvalue == 1? "EFECTIVO" : "TARJETA"
;  }

}
