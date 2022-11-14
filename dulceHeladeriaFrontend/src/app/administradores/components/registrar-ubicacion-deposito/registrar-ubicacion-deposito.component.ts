import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { Deposito } from '../../interfaces/deposito';
import { UbicacionDeposito } from '../../interfaces/ubicacion-deposito';
import { DepositosService } from '../../services/depositos.service';
import { UbicacionDepositoService } from '../../services/ubicacion-deposito.service';

declare var window: any;

@Component({
  selector: 'app-registrar-ubicacion-deposito',
  templateUrl: './registrar-ubicacion-deposito.component.html',
  styleUrls: ['./registrar-ubicacion-deposito.component.css']
})
export class RegistrarUbicacionDepositoComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  ubicacion : UbicacionDeposito;
  formNuevo: any;
  depositos: Deposito[];

  nuevaUbicacionForm = new FormGroup({
    column: new FormControl('',Validators.required),
    row: new FormControl('',Validators.required),
    capacity: new FormControl('',Validators.required),
    depositId: new FormControl('',Validators.required),
    itemTypeId: new FormControl('',Validators.required),
  });

  constructor(private ubicacionService : UbicacionDepositoService, private depositoService:DepositosService) { }

  ngOnInit(): void {
    this.formNuevo = new window.bootstrap.Modal(
      document.getElementById('nuevaUbicacion')
    );
    this.consultarDepositos();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openNuevaUbicacion(){
    this.formNuevo.show();
  }
  
  closeNuevaUbicacion(){
    this.formNuevo.hide();
  }

  consultarDepositos(){
    this.sub.add(this.depositoService.getAll().subscribe({
      next: resp => {
        this.depositos = resp;
      },
      error: err => {
        console.log(err);
        swal.fire("Error!", "Error al consultar los Depósito", "error");
      }
    }));
  }

  registrarNuevaUbicacion(){
    if (this.nuevaUbicacionForm.valid) {
      this.ubicacion = this.nuevaUbicacionForm.value as UbicacionDeposito;
      console.log(this.ubicacion);

      if (this.nuevaUbicacionForm.controls.itemTypeId.value) {
        this.ubicacion.itemTypeId = parseInt(
          this.nuevaUbicacionForm.controls.itemTypeId.value
        );
      }
      if (this.nuevaUbicacionForm.controls.depositId.value) {
        this.ubicacion.depositId = parseInt(
          this.nuevaUbicacionForm.controls.depositId.value
        );
      }
      if (this.nuevaUbicacionForm.controls.capacity.value) {
        this.ubicacion.capacity = parseInt(
          this.nuevaUbicacionForm.controls.capacity.value
        );
      }
      
      this.sub.add(
        this.ubicacionService.create(this.ubicacion).subscribe({
          next: (resp: any) => {
            console.log(resp);
            swal.fire("Éxito!", "Ubicación cargado correctamente!", "success");
          },
          error: err=> {
            console.log(err)
            swal.fire("Error!", "Error al cargar la ubicación", "error");
          },
        })
      );
    }

    this.closeNuevaUbicacion();
  }
  
}
