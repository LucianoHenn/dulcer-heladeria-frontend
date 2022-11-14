import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
import { Cliente } from '../../interfaces/cliente-interface';
import { ClientesService } from '../../services/clientes.service';

declare var window:any;
@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit, OnDestroy {
  formNuevo:any;
  formModificar:any;
  ResultClientes: Cliente[];
  ResultBusqueda: Cliente[]=[];
  TiposIdentifiers: string[]=['','DNI','CUIT','CUIL']
  cliente: Cliente;
  private sub: Subscription = new Subscription();

  constructor(private clientService:ClientesService) { }

  nuevoClienteForm = new FormGroup({
    businessName: new FormControl('', Validators.required),
    identifierTypeId: new FormControl('1', Validators.required),
    identifier: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
    homeAdress: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required])
  });
  busquedaForm = new FormGroup({
    businessName: new FormControl(''),
    identifier: new FormControl(''),
    homeAdress: new FormControl(''),
    email: new FormControl('')
  });
  modificarClienteForm = new FormGroup({
    businessName: new FormControl('', Validators.required),
    identifierTypeId: new FormControl('1', Validators.required),
    identifier: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
    homeAdress: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    id: new FormControl('', Validators.required)
  });
  ngOnInit(): void {
    this.formNuevo = new window.bootstrap.Modal(
      document.getElementById("NuevoCliente")
    );
    this.formModificar = new window.bootstrap.Modal(
      document.getElementById("ModifCliente")
    );
    this.cargarClientes();
    this.buscarClientes();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  openNuevoCliente(){
    this.formNuevo.show();
  }
  closeNuevoCliente(){
    this.formNuevo.hide();
    this.cliente={} as Cliente;
  }
  openModifCliente(cliente:Cliente){
    //this.cliente=cliente;
    this.modificarClienteForm.controls.businessName.setValue(cliente.businessName);
    this.modificarClienteForm.controls.identifierTypeId.setValue(cliente.identifierTypeId!.toString());
    this.modificarClienteForm.controls.identifier.setValue(cliente.identifier!.toString());
    this.modificarClienteForm.controls.homeAdress.setValue(cliente.homeAdress!);
    this.modificarClienteForm.controls.email.setValue(cliente.email!);
    this.modificarClienteForm.controls.id.setValue(cliente.id!.toString());
    this.formModificar.show();
  }
  closeModifCliente(){
    this.formModificar.hide();
  }
  buscarClientes(){
    console.log(this.busquedaForm.value)
    this.ResultBusqueda = this.ResultClientes.filter((x:Cliente) => {
      return x.identifier?.includes(this.busquedaForm.controls.identifier.value!) && x.businessName?.toLowerCase().includes(this.busquedaForm.controls.businessName.value!.toLowerCase()) 
      && x.homeAdress?.toLowerCase().includes(this.busquedaForm.controls.homeAdress.value!.toLowerCase()) && x.email?.toLowerCase().includes(this.busquedaForm.controls.email.value!.toLowerCase());
  });
  }
  registrarCliente(){
    if(this.nuevoClienteForm.valid){
      this.cliente = this.nuevoClienteForm.value as Cliente;
      if(this.nuevoClienteForm.controls.identifierTypeId.value){
          this.cliente.identifierTypeId = parseInt(this.nuevoClienteForm.controls.identifierTypeId.value)
      }
      console.log(this.cliente);
      console.log(JSON.stringify(this.cliente));
      this.sub.add(
        this.clientService.create(this.cliente)
        .subscribe({
          next: () => {
            swal.fire("Éxito!", "Cliente Registrado Correctamente!", "success");
            this.cliente={} as Cliente;
            this.nuevoClienteForm.reset();
            this.cargarClientes();
          },
          error: () => {
            swal.fire("Error!", "Error al registrar al Cliente!", "error");
          },
        })
        )
    }
    
    this.closeNuevoCliente();
  }
  cargarClientes() {
    this.sub.add(this.clientService.getClientes().subscribe({
            next: (resp) => {
              console.log(resp);
              this.ResultClientes = resp;
              this.buscarClientes();
            },
            error: (err) => {
              console.log(err);
            }
          })
    );
  }
  modificarCliente() {
    if (this.modificarClienteForm.valid) {
      let form = this.modificarClienteForm.controls;
      this.cliente = {
        businessName: form.businessName.value,
        identifier: form.identifier.value,
        homeAdress: form.homeAdress.value,
        email: form.email.value,
        identifierTypeId: form.identifierTypeId.value ? parseInt(form.identifierTypeId.value) : 1,
        id: parseInt(form.id.value!)
      } as Cliente;
      console.log(this.cliente)
      this.sub.add(
        this.clientService
          .updateCliente(this.cliente)
          .subscribe({
            next: (resp: any) => {
              Swal.fire(
                'Actualizacion exitosa!',
                'El Cliente fue actualizado correctamente.',
                'success'
              ).then(() => {
                this.closeModifCliente();
              });
            },
            error: (err: any) => {
              console.log(err);
              alert('error');
            },
          })
      );
    }
  }
}
