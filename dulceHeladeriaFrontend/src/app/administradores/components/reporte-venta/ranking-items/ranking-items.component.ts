import { Component, OnInit } from '@angular/core';
import { RankItem } from 'src/app/administradores/interfaces/RankItem';

@Component({
  selector: 'app-ranking-items',
  templateUrl: './ranking-items.component.html',
  styleUrls: ['./ranking-items.component.css']
})
export class RankingItemsComponent implements OnInit {
  dataSource: RankItem[];
  
  constructor() { }

  ngOnInit(): void {
    this.dataSource = [
      {posicion: 1, producto: 'HELADO 1KG', totalVenta: 1500, cantVendido: 15},
      {posicion: 2, producto: 'CUCURUCHO 3 BOCHAS', totalVenta: 100, cantVendido: 5},
      {posicion: 3, producto: 'COCA', totalVenta: 500, cantVendido: 3},
    ];
  }

}

