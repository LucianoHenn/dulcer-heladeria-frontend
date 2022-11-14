import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common'
import { UbicacionArticulo } from '../../interfaces/ubicacion-articulo';
import { ArticulosService } from '../../services/articulos.service';

@Component({
  selector: 'app-consultar-ubicaciones-articulo',
  templateUrl: './consultar-ubicaciones-articulo.component.html',
  styleUrls: ['./consultar-ubicaciones-articulo.component.css'],
})
export class ConsultarUbicacionesArticuloComponent
  implements OnInit, OnDestroy
{
  nombreArticulo: string;
  ubicacionesArticulo: UbicacionArticulo[];
  private sub: Subscription = new Subscription();
  constructor(
    private articuloService: ArticulosService,
    public activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.consultarUbicaciones();
  }

  consultarUbicaciones() {
    this.sub.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.articuloService.getUbicacionesArticulo(id).subscribe({
            next: (resp) => {
              this.ubicacionesArticulo = resp;
              this.nombreArticulo = this.ubicacionesArticulo[0].item;
            },
            error: (err) => {
              console.log(err);
            },
          });
        },
        error: (err) => {},
      })
    );
  }
  regresar() {
    this.location.back();
  }
  onRecargar() {
    this.consultarUbicaciones();
  }
}
