import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticulosService } from '../../services/articulos.service';
import { Location } from '@angular/common';
import { Articulo } from '../../interfaces/articulo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-articulo',
  templateUrl: './modificar-articulo.component.html',
  styleUrls: ['./modificar-articulo.component.css'],
})
export class ModificarArticuloComponent implements OnInit {
  articuloId: number;
  articulo: Articulo;
  private sub: Subscription = new Subscription();
  formModificarArticulo = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    itemTypeId: new FormControl('', Validators.required),
    measuringType: new FormControl('', Validators.required),
  });
  constructor(
    private articuloService: ArticulosService,
    public activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.cargarArticulo();
  }
  cargarArticulo() {
    this.sub.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          this.articuloId = params['id'];
          this.articuloService.getArticuloById(this.articuloId).subscribe({
            next: (resp) => {
              this.formModificarArticulo.setValue({
                name: resp.name!,
                description: resp.description!,
                itemTypeId: resp.itemTypeId!.toString(),
                measuringType: resp.measuringType!.toString(),
              });
            },
            error: (err) => {
              console.log(err);
            },
          });
        },
      })
    );
  }
  modificarArticulo() {
    if (this.formModificarArticulo.valid) {
      let form = this.formModificarArticulo.controls;
      this.articulo = {
        name: form.name.value,
        description: form.description.value,
        itemTypeId: form.itemTypeId.value ? parseInt(form.itemTypeId.value) : 0,
        measuringType: form.measuringType.value
          ? parseInt(form.measuringType.value)
          : 0,
      } as Articulo;

      this.sub.add(
        this.articuloService
          .updateArticulo(this.articuloId, this.articulo)
          .subscribe({
            next: (resp: any) => {
              Swal.fire(
                'Actualizacion exitosa!',
                'El articulo fue actualizado correctamente.',
                'success'
              ).then(() => {
                this.regresar();
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
  regresar() {
    this.location.back();
  }
}
