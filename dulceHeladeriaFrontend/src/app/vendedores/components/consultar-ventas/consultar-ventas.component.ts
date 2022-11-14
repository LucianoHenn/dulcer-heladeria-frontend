import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GetVentaDto } from '../../interfaces/GetVentaDto';
import { NuevaVentaService } from '../../services/nueva-venta.service';

@Component({
  selector: 'app-consultar-ventas',
  templateUrl: './consultar-ventas.component.html',
  styleUrls: ['./consultar-ventas.component.css'],
})
export class ConsultarVentasComponent implements OnInit, OnDestroy {
  ventas: GetVentaDto[] = [];
  ResultBusqueda: GetVentaDto[] = [];
  fechahoy: string = new Date().toString()
  fechames: string = new Date().setMonth(new Date().getMonth()-1).toString()
  private sub: Subscription = new Subscription();
  busquedaForm = new FormGroup({
    fechades: new FormControl(this.fechames),
    fechahas: new FormControl(this.fechahoy),
    cliente: new FormControl(''),
    metodoPago: new FormControl(''),
  });
  constructor(private ventaService: NuevaVentaService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarVentas();
  }
  cargarVentas() {
    this.sub.add(
      this.ventaService.getVentas().subscribe({
        next: (resp) => {
          this.ventas = resp;
          this.buscarVentas();
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }
  verDetalleVenta(id: number) {}
  buscarVentas() {
    this.ResultBusqueda = this.ventas.filter((x: GetVentaDto) => {
      return (
        x.clientName
          ?.toLowerCase()
          .includes(this.busquedaForm.controls.cliente.value!.toLowerCase()) &&
        x.date.toString()>=this.busquedaForm.controls.fechades.value!
           &&
        x.date.toString()<=this.busquedaForm.controls.fechahas.value!
           &&
        x.paymentMethod
          ?.toString()
          .toLowerCase()
          .includes(
            this.busquedaForm.controls.metodoPago
              .value!.toString()
              .toLowerCase()
          )
      );
    });
  }
  // buscarVentas() {
  //   this.ResultBusqueda = this.ventas.filter((x: GetVentaDto) => {
  //     return (
  //       x.clientName
  //         ?.toLowerCase()
  //         .includes(this.busquedaForm.controls.cliente.value!.toLowerCase()) &&
  //       x.date
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(
  //           this.busquedaForm.controls.fecha.value!.toString().toLowerCase()
  //         ) &&
  //       x.paymentMethod
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(
  //           this.busquedaForm.controls.metodoPago
  //             .value!.toString()
  //             .toLowerCase()
  //         )
  //     );
  //   });
  // }
}
