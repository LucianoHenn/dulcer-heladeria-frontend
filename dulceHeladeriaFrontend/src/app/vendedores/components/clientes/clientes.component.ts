import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cliente } from '../../interfaces/cliente-interface';
import { ClientesService } from '../../services/clientes.service';
import swal from'sweetalert2';
import Swal from 'sweetalert2';


declare var window:any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit , OnDestroy {
  @Output() cambio = new EventEmitter<Cliente>();

  private sub: Subscription = new Subscription();
  formNuevo:any;
  formElegir:any;
  formModificar:any;
  ResultClientes: Cliente[]=[];
  ResultBusqueda: Cliente[]=[];
  TiposIdentifiers: string[]=['','DNI','CUIT','CUIL']
  nuevoClienteForm = new FormGroup({
    businessName: new FormControl('', Validators.required),
    identifierTypeId: new FormControl('1', Validators.required),
    identifier: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
    homeAdress: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required])
  });
  busquedaForm = new FormGroup({
    businessName: new FormControl(''),
    identifier: new FormControl('')
  });
  modificarClienteForm = new FormGroup({
    businessName: new FormControl('', Validators.required),
    identifierTypeId: new FormControl('1', Validators.required),
    identifier: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
    homeAdress: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    id: new FormControl('', Validators.required)
  });
  constructor(private clienteService:ClientesService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  cliente: Cliente;
  clienteSelected: Cliente;

  ngOnInit(): void {
    this.formNuevo = new window.bootstrap.Modal(
      document.getElementById("NuevoCliente")
    );
    this.formElegir = new window.bootstrap.Modal(
      document.getElementById("ElegirCliente")
    );
    this.formModificar = new window.bootstrap.Modal(
      document.getElementById("ModifCliente")
    );
    
  }
  cambioCliente(){
    this.cambio.emit(this.cliente);
  }
  openNuevoCliente(){
    this.formNuevo.show();
  }
  closeNuevoCliente(){
    this.formNuevo.hide();
  }
  openElegirCliente(){
    this.cargarClientes();
    
    this.formElegir.show();
  }
  closeElegirCliente(){
    this.formElegir.hide();
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
  registrarCliente(){
    if(this.nuevoClienteForm.valid){
      this.cliente = this.nuevoClienteForm.value as Cliente;
      if(this.nuevoClienteForm.controls.identifierTypeId.value){
          this.cliente.identifierTypeId = parseInt(this.nuevoClienteForm.controls.identifierTypeId.value)
      }
      console.log(this.cliente);
      console.log(JSON.stringify(this.cliente));
      this.cambioCliente();
      this.sub.add(
        this.clienteService.create(this.cliente)
        .subscribe({next:() => {
          this.clienteService.getClienteByNombre(this.cliente.businessName).subscribe({
            next: resp => {
              this.cliente = {id: resp.id, businessName: resp.businessName, identifier: resp.identifier, identifierTypeId: resp.identifierTypeId,homeAdress:resp.homeAdress,email:resp.email};
              this.cambioCliente();
              console.log(this.cliente);
            }})
        },
          error : () => {swal.fire("Error!", "Error al registrar al Cliente!", "error");}
        }
      ))
    }
    
    this.closeNuevoCliente();
  }
  cargarConsumidorF(){
    this.sub.add(this.clienteService.getClienteByNombre("Consumidor Final").subscribe({
      next: resp => {
        this.cliente = {id: resp.id, businessName: resp.businessName};
        this.cambioCliente();
      },
      error: err => {
        
      }
    }))

    
  }
  buscarClientes(){
    this.ResultBusqueda = this.ResultClientes.filter((x:Cliente) => {
      return x.identifier?.includes(this.busquedaForm.controls.identifier.value!) && x.businessName?.toLowerCase().includes(this.busquedaForm.controls.businessName.value!.toLowerCase())
  });
  }
  cargarClientes() {
    this.sub.add(this.clienteService.getClientes().subscribe({
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
  cargarElegido(){

    this.cliente=this.clienteSelected;
    console.log(this.cliente)
    this.cambioCliente();
    this.closeElegirCliente();
  }
  selectCliente(cliente:Cliente){
    this.clienteSelected=cliente;
    this.cambioCliente();
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
        this.clienteService
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
