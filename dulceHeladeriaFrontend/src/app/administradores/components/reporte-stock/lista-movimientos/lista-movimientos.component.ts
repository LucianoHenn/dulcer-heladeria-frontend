import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Articulos } from 'src/app/administradores/interfaces/articulos';
import { movimiento } from 'src/app/administradores/interfaces/Movimiento';
import { ArticulosService } from 'src/app/administradores/services/articulos.service';
import { MovimientosService } from 'src/app/administradores/services/movimientos.service';
import { RangeService } from 'src/app/administradores/services/range.service';
import { range } from 'src/app/administradores/interfaces/range';

@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrls: ['./lista-movimientos.component.css']
})
export class ListaMovimientosComponent implements OnInit {


  movimientos: movimiento[]
  items: Articulos[]; 
  myForm : FormGroup; 

  constructor(
    private fb:FormBuilder,
    private movimientoServie: MovimientosService,
    private articuloService: ArticulosService,
    private rangeService: RangeService
    ) { }

  ngOnInit(): void {
    this.rangeSub();
    this.getItems(); 
    

    this.myForm = this.fb.group({
        item : [,]
    })

    this.onChangeItem(); 
    
    

    this.getMovimientos();

    console.log("estos son los movimientos"); 
    console.log(this.movimientos); 
  }

  rangeSub(){
    this.rangeService.rangeEmit().subscribe({
      next: (range:range) => {
        this.movimientoServie.getMovimietosByDates(range.start!,range.end!).subscribe({
          next : (resp: movimiento[]) => {
            this.movimientos = resp; 
            console.log("movimientos por fecha")
            console.log(this.movimientos); 
          },
          error : () => {alert("error al obetener movimientos por fecha")}
        })
      }
    })
  }

  onChangeItem() {
    this.myForm.get("item")!.valueChanges.subscribe(x => {
      this.movimientoServie.getMovimietosByItem(x).subscribe({
        next : (res : movimiento[])  => {
          this.movimientos = res; 
          console.log("movimientos por items")
          console.log(x); 
          console.log(this.movimientos); 
        }, 
        error : (e) => {console.error(e)}
      })
    })
  }

  getItems(){
    this.articuloService.getAll().subscribe({
      next: (resp) => {
        this.items = resp; 
      }
    })
  }

  getMovimientos(){
    this.movimientoServie.getMovimietos().subscribe({
      next : (res : movimiento[])  => {
        this.movimientos = res; 
        console.log("movimientos sin filtro")
        console.log(this.movimientos);
        console.log("fin movimientos")
      }, 
      error : (e) => {console.error(e)}
    });
  }

}
