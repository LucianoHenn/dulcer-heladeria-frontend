import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticulosService } from '../../services/articulos.service';
import { DepositosService } from '../../services/depositos.service';
import swal from 'sweetalert2';
import { ArticuloStock } from '../../interfaces/articuloStock';

@Component({
  selector: 'app-registrar-stock-articulo',
  templateUrl: './registrar-stock-articulo.component.html',
  styleUrls: ['./registrar-stock-articulo.component.css'],
})
export class RegistrarStockArticuloComponent implements OnInit{
  @ViewChild('cancelar') btnCerrarModal: ElementRef<HTMLElement>;
  @Output() recargar = new EventEmitter();
  ubicaciones: { id: number; name: string }[];
  articulos: { id: number; name: string }[];
  depositos: { id: number; name: string }[];
  stock: ArticuloStock;
  nuevoStockArticuloForm = new FormGroup({
    itemId: new FormControl('', Validators.required),
    depositId: new FormControl('', Validators.required),
    locationId: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
  });
  private sub: Subscription = new Subscription();
  constructor(
    private depositoService: DepositosService,
    private articuloService: ArticulosService
  ) {}

  ngOnInit(): void {
    this.nuevoStockArticuloForm.controls.depositId.disable();
    this.nuevoStockArticuloForm.controls.locationId.disable();
    const myModalEl = document.getElementById('ingresoStock');
    myModalEl?.addEventListener('show.bs.modal', (event) => {
      this.cargarArticulos();
    });
  }
  ngAfterViewInit() {
    this.sub.add(
      this.nuevoStockArticuloForm.get('itemId')!.valueChanges.subscribe((x) => {
        this.cargarDepositos();
        this.nuevoStockArticuloForm.controls.depositId.enable();
      })
    );
    this.sub.add(
      this.nuevoStockArticuloForm
        .get('depositId')!
        .valueChanges.subscribe((x) => {
          let depositId: number = parseInt(x!);
          if (depositId) {
            this.cargarUbicaciones(depositId);
            this.nuevoStockArticuloForm.controls.locationId.enable();
          }
        })
    );
  }
  registrarStockArticulo() {
    const form = this.nuevoStockArticuloForm.controls;
    if (this.nuevoStockArticuloForm.valid) {
      this.stock = {
        itemId: parseInt(form.itemId.value!),
        locationId: parseInt(form.locationId.value!),
        amount: parseInt(form.amount.value!),
      };

      this.sub.add(
        this.articuloService.createIngresoStock(this.stock).subscribe({
          next: (resp) => {
            swal
              .fire(
                'Éxito!',
                'Nuevo ingreso de stock cargado correctamente!',
                'success'
              )
              .then(() => {
                this.stock = { itemId: 0, locationId: 0, amount: 0 };
                this.cerrarModal();
                this.recargar.emit();
              });
          },
          error: (err) => {
            swal.fire(
              'Error!',
              'Error al cargar nuevo ingreso de stock!',
              'error'
            );
          },
          complete: () => {},
        })
      );
    }
  }
  cerrarModal() {
    this.btnCerrarModal.nativeElement.click();
  }
  cargarArticulos() {
    this.sub.add(
      this.articuloService.getAll().subscribe({
        next: (resp) => {
          this.articulos = resp;
          console.log(this.articulos);
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }
  cargarDepositos() {
    this.sub.add(
      this.depositoService.getAll().subscribe({
        next: (resp) => {
          this.depositos = resp;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }
  cargarUbicaciones(depositId: number) {
    let itemId = parseInt(this.nuevoStockArticuloForm.controls.itemId.value!);
    this.sub.add(
      this.articuloService.buscarUbicaciones(depositId, itemId).subscribe({
        next: (resp) => {
          this.ubicaciones = resp;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }
}
