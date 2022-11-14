import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticulosService } from '../../services/articulos.service';
import { Articulos } from '../../interfaces/articulos';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consultar-articulo',
  templateUrl: './consultar-articulo.component.html',
  styleUrls: ['./consultar-articulo.component.css'],
})
export class ConsultarArticuloComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  articulos: Articulos[];
  ResultBusqueda: Articulos[];
  constructor(
    private articuloService: ArticulosService,
    public router: Router
  ) {}

  busquedaForm = new FormGroup({
    name: new FormControl(''),
    cantidad: new FormControl(''),
    measuringType: new FormControl(''),
    itemType: new FormControl(''),
  });

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.consultarArticulos();
  }
  consultarArticulos() {
    this.sub.add(
      this.articuloService.getAll().subscribe({
        next: (resp) => {
          this.articulos = resp;
          this.buscarArticulos();
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }
  verUbicaciones(id: number) {
    this.router.navigate([`${this.router.url}/${id}/ubicaciones`]);
  }
  editar(id: number) {
    this.router.navigate([`${this.router.url}/${id}/editar`]);
  }
  buscarArticulos() {
    this.ResultBusqueda = this.articulos.filter((x: Articulos) => {
      return (
        x.name
          ?.toLowerCase()
          .includes(this.busquedaForm.controls.name.value!.toLowerCase()) &&
        x.amount
          ?.toString()
          .includes(this.busquedaForm.controls.cantidad.value!.toString()) &&
        x.measuringType
          ?.toLowerCase()
          .includes(
            this.busquedaForm.controls.measuringType.value!.toLowerCase()
          ) &&
        x.itemType
          ?.toLowerCase()
          .includes(this.busquedaForm.controls.itemType.value!.toLowerCase())
      );
    });
  }
  recargar() {
    this.consultarArticulos();
  }
}
