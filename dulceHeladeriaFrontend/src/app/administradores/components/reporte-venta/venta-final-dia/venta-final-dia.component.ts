import { ContentObserver } from '@angular/cdk/observers';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ingreso } from 'src/app/administradores/interfaces/ingreso';
import { VentaService } from 'src/app/administradores/services/venta.service';
@Component({
  selector: 'app-venta-final-dia',
  templateUrl: './venta-final-dia.component.html',
  styleUrls: ['./venta-final-dia.component.css']
})
export class VentaFinalDiaComponent implements OnInit{
  selectValue: number;
  today:Date; 
  @ViewChild('select') select: HTMLSelectElement;

  onChangeDay($event: Event) {
    if(this.selectValue == 1) {
      let yesterday: Date = new Date()
      yesterday.setDate(this.today.getDate() - 1); 
      console.log("ayer")
      console.log(yesterday);
      this.obtenerVentas(yesterday);
  } else {
    this.obtenerVentas(this.today);
  }
}
total: number;
ingresos: ingreso[];
  constructor(public dialogRef:MatDialogRef<VentaFinalDiaComponent>,
    private ventaService:VentaService) {
      this.today = new Date();
     }

  ngOnDestroy(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

 closeDialog(){
  this.dialogRef.close();
 }

 obtenerVentas(date:Date){
  this.ventaService.getVentaConMetodoPago(date).subscribe({
    next:(resp)=>{
      this.ingresos = resp; 
      this.ingresos.forEach(i => {
        i.paymentMethod === 1? i.title = "EFECTIVO" : 
        i.paymentMethod === 2? i.title = "TARJETA" : i.title = "MERCADO PAGO";
        this.total += i.total;
      })
    }
  })
 }

}
