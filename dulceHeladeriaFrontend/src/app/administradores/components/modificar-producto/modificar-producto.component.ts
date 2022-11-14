import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Articulos } from '../../interfaces/articulos';
import { Subscription } from 'rxjs';
import { ArticulosService } from '../../services/articulos.service';
import { ProductosService } from '../../services/productos.service';
import { ProductoRequest } from '../../interfaces/productoRequest';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css'],
})
export class ModificarProductoComponent implements OnInit {
  private sub: Subscription = new Subscription();
  productoId: number;
  articulos: Articulos[] = [];
  articulosSeleccionados: Articulos[] = [];
  producto: ProductoRequest = {} as ProductoRequest;
  nuevoProductoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    urlImagen: new FormControl('', Validators.required),
    maxIArticulos: new FormControl('0', Validators.required),
  });
  constructor(
    private articuloService: ArticulosService,
    private productoService: ProductosService,
    private location: Location,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarArticulos();
  }

  regresar() {
    this.location.back();
  }
  cargarProducto() {
    this.sub.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          this.productoId = params['id'];
          this.productoService.getProductoById(this.productoId).subscribe({
            next: (resp) => {
              this.nuevoProductoForm.setValue({
                nombre: resp.name,
                precio: resp.price.toString(),
                urlImagen: resp.imageUrl,
                maxIArticulos: resp.maxItemAmount.toString(),
              });
              resp.items.forEach((art) => {
                const articuloACargar = this.articulos
                  .filter((x) => x.id === art.id)
                  .pop();
                if (articuloACargar) {
                  this.agregarArticulo(articuloACargar);
                }
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

  cargarArticulos() {
    this.sub.add(
      this.articuloService.getAll().subscribe({
        next: (resp) => {
          this.articulos = resp;
          this.cargarProducto();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      })
    );
  }

  agregarArticulo(articulo: Articulos) {
    console.log('articulo seleccionado', articulo);
    this.articulosSeleccionados.push(articulo);
    this.articulos = this.articulos.filter((x) => x.id !== articulo.id);
    this.nuevoProductoForm.controls.maxIArticulos.setValue(
      this.articulosSeleccionados.length.toString()
    );
  }
  quitarArticulo(articulo: Articulos) {
    this.articulosSeleccionados = this.articulosSeleccionados.filter(
      (x) => x.id !== articulo.id
    );
    this.articulos.push(articulo);
    this.nuevoProductoForm.controls.maxIArticulos.setValue(
      this.articulosSeleccionados.length.toString()
    );
  }
  editarProducto() {
    if (this.nuevoProductoForm.valid) {
      let form = this.nuevoProductoForm.controls;
      this.producto = {
        name: form.nombre.value,
        price: form.precio.value ? parseInt(form.precio.value) : 0,
        imageUrl: form.urlImagen.value,
        maxItemAmount: form.maxIArticulos.value
          ? parseInt(form.maxIArticulos.value)
          : 0,
        items: this.articulosSeleccionados.map((x) => {
          return { id: x.id, name: x.name };
        }),
      } as ProductoRequest;

      this.sub.add(
        this.productoService
          .updateProducto(this.productoId, this.producto)
          .subscribe({
            next: (resp: any) => {
              Swal.fire(
                'Actualizacion exitosa!',
                'El producto fue actualizado correctamente.',
                'success'
              ).then(() => {
                this.location.back();
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
