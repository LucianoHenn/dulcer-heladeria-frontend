import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Articulos } from '../../interfaces/articulos';
import { Subscription } from 'rxjs';
import { ArticulosService } from '../../services/articulos.service';
import { ProductosService } from '../../services/productos.service';
import { ProductoRequest } from '../../interfaces/productoRequest';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {

  private sub: Subscription = new Subscription();
  articulos: Articulos[] = []
  articulosSeleccionados: Articulos[] = [];
  producto: ProductoRequest = {} as ProductoRequest;
  nuevoProductoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    urlImagen: new FormControl('', Validators.required),
    maxIArticulos: new FormControl('0', Validators.required),
  });
  constructor(private articuloService: ArticulosService, private productoService: ProductosService,private location: Location) { }

  ngOnInit(): void {
    this.cargarArticulos();
  }

  regresar() {
    this.location.back();
  }

  cargarArticulos(){
    this.sub.add(this.articuloService.getAll().subscribe({
      next: resp => {
        this.articulos = resp;
      },
      error: err => {
        console.log(err);
      }
    }));
  };

  agregarArticulo(articulo: Articulos){
    console.log("articulo seleccionado", articulo);
    this.articulosSeleccionados.push(articulo);
    this.articulos = this.articulos.filter(x => x.id !== articulo.id);
    this.nuevoProductoForm.controls.maxIArticulos.setValue(this.articulosSeleccionados.length.toString());
  }
  quitarArticulo(articulo: Articulos){
    this.articulosSeleccionados = this.articulosSeleccionados.filter(x => x.id !== articulo.id);
    this.articulos.push(articulo);
    this.nuevoProductoForm.controls.maxIArticulos.setValue(this.articulosSeleccionados.length.toString());
  }
  registrarProducto(){

    if (this.nuevoProductoForm.valid){
      let form = this.nuevoProductoForm.controls;
      this.producto ={
        name: form.nombre.value,
        price: form.precio.value ? parseInt(form.precio.value) : 0,
        imageUrl: form.urlImagen.value,
        maxItemAmount: form.maxIArticulos.value ? parseInt(form.maxIArticulos.value) : 0,
        items: this.articulosSeleccionados.map(x => { return {id: x.id, name: x.name }})
      } as ProductoRequest;

      this.sub.add(
        this.productoService.create(this.producto).subscribe({
          next: (resp: any) => {
            console.log(resp);
            alert("guardado exitoso!")
            this.location.back();
          },
          error: (err:any) => {
            console.log(err);
          },
        })
      );     
    }

    
  }

}
