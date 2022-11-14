import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultarArticuloComponent } from './components/consultar-articulo/consultar-articulo.component';
import { ConsultarDepositoComponent } from './components/consultar-deposito/consultar-deposito.component';
import { ConsultarUbicacionesArticuloComponent } from './components/consultar-ubicaciones-articulo/consultar-ubicaciones-articulo.component';
import { ListadoClientesComponent } from 'src/app/vendedores/pages/listado-clientes/listado-clientes.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { RegistrarUbicacionDepositoComponent } from './components/registrar-ubicacion-deposito/registrar-ubicacion-deposito.component';
import { ConsultarProductosComponent } from './components/consultar-productos/consultar-productos.component';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
import { BienvenidaComponent } from '../shared/components/bienvenida/bienvenida.component';
import { ConsultarUsuariosComponent } from './components/consultar-usuarios/consultar-usuarios.component';
import { ConsultarPerfilComponent } from './components/consultar-perfil/consultar-perfil.component';
import { ModificarContrasenaComponent } from './components/modificar-contrasena/modificar-contrasena.component';
import { ModificarProductoComponent } from './components/modificar-producto/modificar-producto.component';
import { ModificarArticuloComponent } from './components/modificar-articulo/modificar-articulo.component';
import { ConsultarUbicacionDepositoComponent } from './components/consultar-ubicacion-deposito/consultar-ubicacion-deposito.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component:BienvenidaComponent},
      {path: 'usuarios', component:ConsultarUsuariosComponent},
      {path: 'usuarios/nuevo', component:RegistrarUsuarioComponent},
      {path: 'reportes', component:ReportesComponent},
      {path: 'articulos', component:ConsultarArticuloComponent},
      {path: 'articulos/:id/ubicaciones', component:ConsultarUbicacionesArticuloComponent},
      {path: 'articulos/:id/editar', component:ModificarArticuloComponent},
      {path: 'depositos', component:ConsultarDepositoComponent},
      {path: 'clientes', component:ListadoClientesComponent},
      {path: 'ubicacion', component:ConsultarUbicacionDepositoComponent},
      {path: 'productos', component:ConsultarProductosComponent},
      {path: 'productos/nuevo', component:RegistrarProductoComponent},
      {path: 'productos/:id/editar', component:ModificarProductoComponent},
      {path: 'perfil', component:ConsultarPerfilComponent},
      {path: 'perfil/cambiarContrasenia', component:ModificarContrasenaComponent},
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
export class AdminRoutingModule { }