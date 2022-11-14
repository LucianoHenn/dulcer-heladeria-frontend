import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UbicacionDeposito } from '../../interfaces/ubicacion-deposito';
import { UbicacionDepositoService } from '../../services/ubicacion-deposito.service';
import { Location } from '@angular/common'
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-consultar-ubicacion-deposito',
  templateUrl: './consultar-ubicacion-deposito.component.html',
  styleUrls: ['./consultar-ubicacion-deposito.component.css']
})
export class ConsultarUbicacionDepositoComponent implements OnInit, OnDestroy {

  ubicacionDeposito: UbicacionDeposito[];
  ResultBusqueda: UbicacionDeposito[];
  private sub: Subscription = new Subscription();

  constructor(private depositoService: UbicacionDepositoService) { }
  
  form = new FormGroup({
    column: new FormControl(''),
    row: new FormControl(''),
    capacity: new FormControl(''),
    deposit: new FormControl(''),
    itemtype: new FormControl('')
  })

  ngOnInit(): void {
    this.consultarUbicaciones();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  consultarUbicaciones() {
    this.sub.add(this.depositoService.getAll().subscribe({
      next: resp => {
        this.ubicacionDeposito = resp;
        this.buscarUbicacion();
      },
      error: err => {
        console.log(err);
      }
    }));
  }

  buscarUbicacion() {
    //console.log(this.form.value)
    this.ResultBusqueda = this.ubicacionDeposito.filter((x: UbicacionDeposito) => {
      return x.column?.toLowerCase().includes(this.form.controls.column.value!.toLowerCase())
        && x.row?.toLowerCase().includes(this.form.controls.row.value!.toLowerCase())
        && x.capacity?.toString().toLowerCase().includes(this.form.controls.capacity.value!.toString().toLowerCase())
    });
    console.log(this.ResultBusqueda)
  }

  buscar(){
    this.buscarUbicacion();
  }
}
