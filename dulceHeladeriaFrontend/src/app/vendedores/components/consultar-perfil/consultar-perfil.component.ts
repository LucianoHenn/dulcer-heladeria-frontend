import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsuarioResponse } from '../../interfaces/usuarioResponse';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-consultar-perfil',
  templateUrl: './consultar-perfil.component.html',
  styleUrls: ['./consultar-perfil.component.css'],
})
export class ConsultarPerfilComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  usuario: UsuarioResponse;
  usuarioId: number = 0;
  edicionActiva: boolean = false;
  formPerfil = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required),
  });
  constructor(private usuarioService: UsuarioService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.edicionActiva = false;
    this.formPerfil.disable();
    this.usuarioId = parseInt(localStorage.getItem('userId')!);
    this.cargarUsuario();
  }
  editarPerfil() {
    this.edicionActiva = false;
    this.formPerfil.disable();
  }
  habilitarEdicion() {
    this.edicionActiva = true;
    this.formPerfil.enable();
  }
  cargarUsuario() {
    this.sub.add(this.usuarioService.getUserById(this.usuarioId).subscribe({
      next: resp =>{
        this.usuario = resp;
        this.formPerfil.setValue({nombre: this.usuario.name, apellido: this.usuario.lastName, dni: this.usuario.dni, email: this.usuario.email, rol: this.usuario.rolId!.toString()})
      },
      error: err =>{
        console.log(err)
      }
    }));
  }
  cancelarEdicion(){
    this.edicionActiva = false;
    this.formPerfil.disable();
  }
}
