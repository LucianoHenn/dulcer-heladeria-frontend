import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/administradores/interfaces/articulo';
import { Articulos } from 'src/app/administradores/interfaces/articulos';
import { ArticulosService } from 'src/app/administradores/services/articulos.service';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {
  labels: string[]; 
  data: number[]; 
  articulosData: Articulos[]; 
  datos : any; 
  colors:string[];

  constructor(
    private articuloService: ArticulosService
    ) { }

  ngOnInit(): void {

    this.articuloService.getAll().subscribe({
      next: (resp) => {
        this.articulosData = resp; 
        this.labels = this.articulosData.map(x => x.name);
        this.data = this.articulosData.map(x => x.amount);
        console.log(this.data);
        console.log(this.labels);
        console.log(this.colors);
        this.datos = {
          labels: this.labels,
          datasets: [
            {
              label: 'Grafico torta items',
              data: this.data,
              backgroundColor: this.colors,
              hoverOffset: 4,
              weight:50
            }
          ]
        }
      } 
    })

    for(let i=0;i<this.data.length;i++){
      this.colors.push(this.dynamicColors());
    }
  }


  dynamicColors():string {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };

}
