import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions} from 'chart.js'
import { range } from 'src/app/administradores/interfaces/range';
import { ventaPorDia } from 'src/app/administradores/interfaces/ventaPordia';
import { RangeService } from 'src/app/administradores/services/range.service';
import { VentaService } from 'src/app/administradores/services/venta.service';
@Component({
  selector: 'app-reporte-grafico-linea',
  templateUrl: './reporte-grafico-linea.component.html',
  styleUrls: ['./reporte-grafico-linea.component.css']
})
export class ReporteGraficoLineaComponent implements OnInit {
  @ViewChild('input') input:HTMLInputElement;
  @Input() start : Date | null | undefined; 
  @Input() end : Date | null | undefined; 
  verPeriodoAnterior :boolean = false;
  cantDineroPorDia: number[]; 
  range: range; 
  dias: string[] = [];
  montos: number[] = [];
  ventas : any; 
  datos: ChartData<'bar'>; 
  options: ChartOptions = {
    plugins: {
      title: {text:"nombre del chart", display:true, font:{size:30}}
    }
  }
  constructor(private rangeService:RangeService, private ventaService:VentaService) { }

  ngOnInit(): void {
    this.rangeService.rangeEmit().subscribe({
      next: (range:range) => {
        this.ventaService.getAllVenta2(range.start!,range.end!)
        .subscribe(
        {
          next: (resp:any) =>{
              //this.obtenerDias(range.start!,range.end!);
              this.ventas = resp  
              this.montos = this.ventas.map((x:ventaPorDia) => x.total)
              this.dias = this.ventas.map((x:ventaPorDia) => x.date);
          }
        });
        this.datos = this.getOneChart();
      },
      error: () => {
        alert("error al cargar en rango en el grafico")
      }
    }); 
  }

  obtenerDias(start:Date, end:Date) {
    var dateArray = new Array();
    var currentDate:Date = start;
    while (currentDate <= end) {
        dateArray.push(new Date (currentDate));
        currentDate.setDate(currentDate.getDate()+1);
    }
    this.dias = dateArray.map((x:Date)=>`${x.toLocaleDateString()}`);
}

  cambiarCharts(){
    this.verPeriodoAnterior = !this.verPeriodoAnterior; 
    if(this.verPeriodoAnterior){
     this.datos = this.getTwoCharts();
    } else {
      this.datos = this.getOneChart();
    }
  }

  getOneChart(){
    return {
      labels : this.dias,
      datasets: [
        {
        data:this.montos,
        backgroundColor: '#4dc9f6',
        tension: 0.1,
        borderWidth: 3.5
        }
      ]
    }
  }

  getTwoCharts(){
    return {
      labels : this.dias,
      datasets: [
        {
        data:[20,30,25],
        backgroundColor: '#4dc9f6',
        borderWidth: 3.5
  
        },
        {
          data:[15,32,45],
          borderWidth: 3.5
        }
      ]
    }
  }

}
