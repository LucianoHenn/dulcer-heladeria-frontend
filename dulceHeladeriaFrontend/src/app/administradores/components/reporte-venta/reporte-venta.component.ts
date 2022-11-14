import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { range } from '../../interfaces/range';
import { RangeService } from '../../services/range.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VentaFinalDiaComponent } from './venta-final-dia/venta-final-dia.component';
import { ReporteGraficoLineaComponent } from './reporte-grafico-linea/reporte-grafico-linea.component';
import swal from 'sweetalert2';



@Component({
  selector: 'app-reporte-venta',
  templateUrl: './reporte-venta.component.html',
  styleUrls: ['./reporte-venta.component.css']
})
export class ReporteVentaComponent implements OnInit {

  @ViewChild(ReporteGraficoLineaComponent) reporte: ReporteGraficoLineaComponent; 
  @Input() start: Date | null | undefined;
  @Input() end: Date | null | undefined;

  total:number; 
  date:range; 

  constructor(private rangeService:RangeService, 
    private matDialog: MatDialog) {
   }

  ngOnInit(): void {
    const initialValue = 0;
    // this.total = this.reporte.montos.reduce(
    //   (previousValue, currentValue) => previousValue + currentValue,
    //   initialValue
    // );
    
    this.rangeService.rangeEmit()
    .subscribe({
      next: (resp:range) => {
        console.log("se obtuvo la fecha")
        console.log(resp);
        this.date = resp
      },
      error: () => {swal.fire("Error!", "Error al recibir el rango de fechas!", "error");}
    }); 
  }

  ventaFinal() {
    let dialogRef = this.matDialog.open(VentaFinalDiaComponent)

    dialogRef.afterClosed().subscribe(result => {
    });
    }
}
