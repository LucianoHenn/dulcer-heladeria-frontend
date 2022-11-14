import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MustMatch } from 'src/app/validators/MustMatch';
import swal from 'sweetalert2';
import { usuario } from '../../interfaces/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit, OnDestroy {
  form : FormGroup;
  usuario:usuario = {}; 
  private sub: Subscription = new Subscription();
  constructor(private userService:UsuarioService, private location: Location) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name : new FormControl<string>("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ]),
      lastName : new FormControl("",[
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ]),
      dni : new FormControl("",Validators.required),
      email : new FormControl("",[
        Validators.required,
        Validators.email
      ]),
      password : new FormControl("",[
        Validators.required,
        Validators.minLength(8)
        //Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ]),
      confirmarContraseña : new FormControl("",[
        Validators.required,
        Validators.minLength(8)
        //Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ]),
      rol : new FormControl("",Validators.required)
    });
  }

  

  enviar(){
    if(this.form.valid){
      //this.usuario = this.form.value; 
      this.usuario.name = this.form.value.name;
      this.usuario.lastName = this.form.value.lastName;
      this.usuario.dni = this.form.value.dni;
      this.usuario.email = this.form.value.email;
      this.usuario.password = this.form.value.password;
      this.usuario.rol = parseInt(this.form.value.rol);

      
      console.log(this.form.value.rol); 
      
      if(this.form.value.rol == "Administrador"){
        this.usuario.rol = 0;
      }
      if(this.form.value.rol == "Vendedor"){
        this.usuario.rol = 1;
      }
      console.log(this.usuario)
      this.sub.add(
        this.userService.create(this.usuario)
        .subscribe({
          next: (resp : any) => { swal.fire("Éxito!", "Usuario Cargado Correctamente!", "success");},
          error : () => {swal.fire("Error!", "Error al registrar al usuario!", "error");}
        }
      ))

    } else {
      swal.fire("Formulario Inválido!", "El formulario no esta cargado correctamente!", "error");
    }
  }

  regresar(){
    this.location.back();
  }
}
