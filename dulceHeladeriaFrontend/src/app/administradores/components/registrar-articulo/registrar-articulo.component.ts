import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { Articulo } from '../../interfaces/articulo';
import { ArticulosService } from '../../services/articulos.service';

declare var window: any;

@Component({
  selector: 'app-registrar-articulo',
  templateUrl: './registrar-articulo.component.html',
  styleUrls: ['./registrar-articulo.component.css'],
})
export class RegistrarArticuloComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  articulo: Articulo;
  formNuevo: any;
  nuevoArticuloForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    itemTypeId: new FormControl('-1', Validators.required),
    measuringType: new FormControl('-1', Validators.required),
  });
  constructor(private articuloService: ArticulosService) {}

  ngOnInit(): void {
    this.formNuevo = new window.bootstrap.Modal(
      document.getElementById('NuevoArticulo')
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openNuevoArticulo() {
    this.formNuevo.show();
  }
  closeNuevoArticulo() {
    this.formNuevo.hide();
  }
  registrarArticulo() {
    if (this.nuevoArticuloForm.valid) {
      this.articulo = this.nuevoArticuloForm.value as Articulo;
      console.log(this.articulo);

      if (this.nuevoArticuloForm.controls.itemTypeId.value) {
        this.articulo.itemTypeId = parseInt(
          this.nuevoArticuloForm.controls.itemTypeId.value
        );
      }
      if (this.nuevoArticuloForm.controls.measuringType.value) {
        this.articulo.measuringType = parseInt(
          this.nuevoArticuloForm.controls.measuringType.value
        );
      }

      this.sub.add(
        this.articuloService.create(this.articulo).subscribe({
          next: (resp: any) => {
            console.log(resp);
            swal.fire("Éxito!", "Artículo cargado correctamente!", "success");
          },
          error: (err:any) => {
            console.log(err);
            swal.fire("Error!", "Error al cargar el artículo!", "error");
          },
        })
      );
    }

    this.closeNuevoArticulo();
  }
}
