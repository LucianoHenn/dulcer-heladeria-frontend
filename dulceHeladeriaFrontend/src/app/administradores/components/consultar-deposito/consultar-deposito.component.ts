import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Deposito } from '../../interfaces/deposito';
import { DepositosService } from '../../services/depositos.service';

@Component({
  selector: 'app-consultar-deposito',
  templateUrl: './consultar-deposito.component.html',
  styleUrls: ['./consultar-deposito.component.css']
})
export class ConsultarDepositoComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  depositos: Deposito[];
  ResultBusqueda: Deposito[];
  constructor(private depositoService: DepositosService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  busquedaForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    capacity: new FormControl('')
  });

  ngOnInit(): void {
    this.consultarDepositos();
  }
  consultarDepositos() {
    this.sub.add(this.depositoService.getAll().subscribe({
      next: resp => {
        this.depositos = resp;
        this.buscarDepositos();
      },
      error: err => {
        console.log(err);
      }
    }));
  }
  buscarDepositos() {
    console.log(this.busquedaForm.value)
    this.ResultBusqueda = this.depositos.filter((x: Deposito) => {
      return x.name?.toLowerCase().includes(this.busquedaForm.controls.name.value!.toLowerCase())
        && x.address?.toLowerCase().includes(this.busquedaForm.controls.address.value!.toLowerCase()) && x.capacity?.toString().toLowerCase().includes(this.busquedaForm.controls.capacity.value!.toString().toLowerCase());
    });
    
  }
}
