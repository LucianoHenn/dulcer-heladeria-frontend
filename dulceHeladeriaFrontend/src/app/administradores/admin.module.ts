import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegistrarArticuloComponent } from './components/registrar-articulo/registrar-articulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticulosService } from './services/articulos.service';
import { ReportesComponent } from './components/reportes/reportes.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReporteVentaComponent } from './components/reporte-venta/reporte-venta.component';
import { NgChartsModule } from 'ng2-charts';
import { ReporteGraficoLineaComponent } from './components/reporte-venta/reporte-grafico-linea/reporte-grafico-linea.component';
import { ConsultarArticuloComponent } from './components/consultar-articulo/consultar-articulo.component';
import { ConsultarUbicacionesArticuloComponent } from './components/consultar-ubicaciones-articulo/consultar-ubicaciones-articulo.component';
import { ConsultarDepositoComponent } from './components/consultar-deposito/consultar-deposito.component';
import { RegistrarDepositoComponent } from './components/registrar-deposito/registrar-deposito.component';
import {MatDialogModule} from '@angular/material/dialog';
import { VentaFinalDiaComponent } from './components/reporte-venta/venta-final-dia/venta-final-dia.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RankingItemsComponent } from './components/reporte-venta/ranking-items/ranking-items.component';
import { RegistrarUbicacionDepositoComponent } from './components/registrar-ubicacion-deposito/registrar-ubicacion-deposito.component';
import { RegistrarMovimientoArtComponent } from './components/registrar-movimiento-art/registrar-movimiento-art.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { PaymentMethodPipePipe } from '../payment-method-pipe.pipe';
import { ReporteStockComponent } from './components/reporte-stock/reporte-stock.component';
import { ListaMovimientosComponent } from './components/reporte-stock/lista-movimientos/lista-movimientos.component';
import { GraficoDonaComponent } from './components/reporte-stock/grafico-dona/grafico-dona.component';
import { ConsultarProductosComponent } from './components/consultar-productos/consultar-productos.component';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
import { ConsultarUsuariosComponent } from './components/consultar-usuarios/consultar-usuarios.component';
import { ConsultarPerfilComponent } from './components/consultar-perfil/consultar-perfil.component';
import { ModificarContrasenaComponent } from './components/modificar-contrasena/modificar-contrasena.component';
import { ModificarProductoComponent } from './components/modificar-producto/modificar-producto.component';
import { ModificarArticuloComponent } from './components/modificar-articulo/modificar-articulo.component';
import { ConsultarUbicacionDepositoComponent } from './components/consultar-ubicacion-deposito/consultar-ubicacion-deposito.component';
import { RegistrarStockArticuloComponent } from './components/registrar-stock-articulo/registrar-stock-articulo.component';

@NgModule({
  declarations: [
    RegistrarArticuloComponent,
    ReportesComponent,
    ReporteVentaComponent,
    ReporteGraficoLineaComponent,
    ConsultarArticuloComponent,
    ConsultarUbicacionesArticuloComponent,
    ConsultarDepositoComponent,
    RegistrarDepositoComponent,
    VentaFinalDiaComponent,
    RankingItemsComponent,
    RegistrarUbicacionDepositoComponent,
    RegistrarMovimientoArtComponent,
    ConsultarProductosComponent,
    RegistrarProductoComponent,
    ConsultarUsuariosComponent,
    ConsultarPerfilComponent,
    ModificarContrasenaComponent,
    ModificarProductoComponent,
    GraficoDonaComponent,
    ListaMovimientosComponent,
    ReporteStockComponent,
    ModificarArticuloComponent,
    ConsultarUbicacionDepositoComponent,
    RegistrarStockArticuloComponent
  ],
  entryComponents : [VentaFinalDiaComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgChartsModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    FormsModule
  ],
  exports: [
    RegistrarArticuloComponent,
    ReportesComponent,
    MatDatepickerModule,
    ConsultarArticuloComponent,
    MatDialogModule,
    MatButtonModule,
    //BrowserAnimationsModule,
    GraficoDonaComponent,
    ListaMovimientosComponent
  ],
  providers: [
    ArticulosService,
    DatePipe,
    PaymentMethodPipePipe
  ]
})
export class AdminModule { }
