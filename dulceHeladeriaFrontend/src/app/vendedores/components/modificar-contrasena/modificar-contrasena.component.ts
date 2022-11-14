import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { UsuarioPasswordResponse } from '../../interfaces/usuarioPasswordDto';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/vendedores/services/usuario.service';

@Component({
  selector: 'app-modificar-contrasena',
  templateUrl: './modificar-contrasena.component.html',
  styleUrls: ['./modificar-contrasena.component.css'],
})
export class ModificarContrasenaComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  contrasenias: UsuarioPasswordResponse = {} as UsuarioPasswordResponse;
  usuarioId: number = 0;
  formCambiarContrasenia = new FormGroup({
    passActual: new FormControl('', Validators.required),
    passNueva: new FormControl('', Validators.required),
    passNuevaRepetida: new FormControl('', Validators.required),
  });
  constructor(
    private usuarioService: UsuarioService,
    private location: Location
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.usuarioId = parseInt(localStorage.getItem('userId')!);
  }
  cambiarContrasenia() {
    const form = this.formCambiarContrasenia.controls;

    this.contrasenias = {
      actualPassword: form.passActual.value!,
      newPassword: form.passNueva.value!,
      repeatNewPassword: form.passNuevaRepetida.value!,
    };
    this.sub.add(
      this.usuarioService
        .changePassword(this.usuarioId, this.contrasenias)
        .subscribe({
          next: (resp) => {
            Swal.fire(
              'Cambio de contraseña',
              'La contraseña fue cambiada exitosamente.',
              'success'
            ).then(()=>{
              this.regresar();
            });
            
          },
          error: (err) => {
            Swal.fire('Error', 'Error al cambiar contraseña.', 'error');
          },
        })
    );
  }
  regresar() {
    this.location.back();
  }
}
