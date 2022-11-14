import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Deposito } from '../../interfaces/deposito';
import { DepositosService } from '../../services/depositos.service';
import swal from 'sweetalert2';

declare var window: any;

@Component({
  selector: 'app-registrar-deposito',
  templateUrl: './registrar-deposito.component.html',
  styleUrls: ['./registrar-deposito.component.css'],
})
export class RegistrarDepositoComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  deposito: Deposito;
  formNuevo: any;
  nuevoDepositoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });
  constructor(private depositoService: DepositosService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.formNuevo = new window.bootstrap.Modal(
      document.getElementById('NuevoDeposito')
    );
  }

  openNuevoDeposito() {
    this.formNuevo.show();
  }
  closeNuevoDeposito() {
    this.formNuevo.hide();
  }

  registrarArticulo() {
    if (this.nuevoDepositoForm.valid) {
      this.deposito = this.nuevoDepositoForm.value as Deposito;
      console.log("component",this.deposito);

      this.sub.add(
        this.depositoService.create(this.deposito).subscribe({
          next: (resp: any) => {
            console.log(resp);
            swal.fire("Éxito!", "Depósito cargado correctamente!", "success");
          },
          error: () => {
            swal.fire("Error!", "Error al cargar el depósito!", "error");
          },
        })
      );
    }

    this.closeNuevoDeposito();
  }
}
