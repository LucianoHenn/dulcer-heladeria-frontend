import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './administradores/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';  
import { VentasComponent } from './vendedores/components/ventas/ventas.component';
import { VendedorModule } from './vendedores/vendedor.module';
import { RegistrarUsuarioComponent } from './administradores/components/registrar-usuario/registrar-usuario.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { PaymentMethodPipePipe } from './payment-method-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VendedorModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AdminModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
