import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BienvenidaComponent } from '../shared/components/bienvenida/bienvenida.component';
import { ConsultarPerfilComponent } from './components/consultar-perfil/consultar-perfil.component';
import { ConsultarVentasComponent } from './components/consultar-ventas/consultar-ventas.component';
import { FacturaComponent } from './components/factura/factura.component';
import { ModificarContrasenaComponent } from './components/modificar-contrasena/modificar-contrasena.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ListadoClientesComponent } from './pages/listado-clientes/listado-clientes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component:BienvenidaComponent},
      {path: 'venta', component:VentasComponent},
      {path: 'clientes', component:ListadoClientesComponent},
      {path: 'factura', component:FacturaComponent},
      {path: 'ventas', component:ConsultarVentasComponent},
      {path: 'perfil', component:ConsultarPerfilComponent},
      {path: 'perfil/cambiarContrasenia', component: ModificarContrasenaComponent},
      {path:'**', redirectTo:''}

    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class VendedorRoutingModule { }