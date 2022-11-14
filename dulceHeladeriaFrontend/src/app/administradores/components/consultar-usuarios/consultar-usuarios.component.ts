import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsuarioResponse } from '../../interfaces/usuarioResponse';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-consultar-usuarios',
  templateUrl: './consultar-usuarios.component.html',
  styleUrls: ['./consultar-usuarios.component.css']
})
export class ConsultarUsuariosComponent implements OnInit, OnDestroy {

  usuarios: UsuarioResponse[] = [];
  ResultBusqueda: UsuarioResponse[]= [];
  private sub: Subscription = new Subscription();
  busquedaForm = new FormGroup({
    nombre: new FormControl(''),
    dni: new FormControl(''),
    email: new FormControl(''),
    rol: new FormControl('')
  });
  constructor(private usuarioService: UsuarioService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }
  cargarUsuarios(){
    this.sub.add(
      this.usuarioService.getUsers().subscribe({
        next: (resp: UsuarioResponse[]) => {
            this.usuarios = resp;
            this.buscarUsuarios();          
        },
        error: (err) => {
          console.log(err.error);
        },
      })
    );
  };
  buscarUsuarios(){
    console.log(this.busquedaForm.value)
    this.ResultBusqueda = this.usuarios.filter((x:UsuarioResponse) => {
      return (x.name?.toLowerCase().includes(this.busquedaForm.controls.nombre.value!.toLowerCase()) || x.lastName?.toLowerCase().includes(this.busquedaForm.controls.nombre.value!.toLowerCase()) ) && x.dni?.toLowerCase().includes(this.busquedaForm.controls.dni.value!.toString().toLowerCase()) 
      && x.email?.toLowerCase().includes(this.busquedaForm.controls.email.value!.toString().toLowerCase()) && x.rol?.toLowerCase().includes(this.busquedaForm.controls.rol.value!.toString().toLowerCase());
  });
  }
  editarUsuario(id: number){

  }
}
