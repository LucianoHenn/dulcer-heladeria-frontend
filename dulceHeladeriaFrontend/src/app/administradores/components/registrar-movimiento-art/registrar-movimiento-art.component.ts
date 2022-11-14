import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mixinDisableRipple } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { Deposito } from '../../interfaces/deposito';
import { ArticulosService } from '../../services/articulos.service';
import { DepositosService } from '../../services/depositos.service';

declare var window: any;

@Component({
  selector: 'app-registrar-movimiento-art',
  templateUrl: './registrar-movimiento-art.component.html',
  styleUrls: ['./registrar-movimiento-art.component.css'],
})
export class RegistrarMovimientoArtComponent implements OnInit, OnDestroy {
  @ViewChild('cancelar') btnCerrarModal: ElementRef<HTMLElement>;
  @Input() ubicArticulo: {
    itemStockId: number;
    locationName: string;
    locationId: number;
  };
  @Output() recargar = new EventEmitter();
  modalId: string;
  modalTarget: string;
  private sub: Subscription = new Subscription();
  depositos: Deposito[];
  ubicaciones: { id: number; name: string }[];
  movimiento?: {
    amount: number;
    itemStockId: number;
    destinationLocationId: number;
    motive: string;
  };
  itemId: number;
  formNuevo: any;
  nuevoMovimientoForm = new FormGroup({
    depositId: new FormControl('-1', Validators.required),
    locationId: new FormControl('-1', Validators.required),
    amount: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(100),
    ]),
    motive: new FormControl('', Validators.required),
  });
  constructor(
    private depositoService: DepositosService,
    private articuloService: ArticulosService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.modalId = 'NuevoMovimiento' + this.ubicArticulo.itemStockId;
    this.modalTarget = '#' + this.modalId;

    this.obtenerIdArticulo();
    this.cargarDepositos();

    this.nuevoMovimientoForm.get('depositId')!.valueChanges.subscribe((x) => {
      let depositId: number = parseInt(x!);
      if (depositId) {
        this.cargarUbicaciones(depositId);
      }
    });
  }

  ngAfterViewInit() {
    const myModal = document.getElementById(this.modalId);
    myModal?.addEventListener('hide.bs.modal', (event) => {
      this.nuevoMovimientoForm.reset();
    });
  }

  obtenerIdArticulo() {
    this.sub.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          this.itemId = params['id'];
        },
        error: (err) => {},
      })
    );
  }
  cerrarModal(){
    this.btnCerrarModal.nativeElement.click();
  }
  registrarMovimiento() {
    if (this.nuevoMovimientoForm.valid) {
      this.movimiento = {
        amount: parseInt(this.nuevoMovimientoForm.controls.amount.value!),
        destinationLocationId: parseInt(
          this.nuevoMovimientoForm.controls.locationId.value!
        ),
        motive: this.nuevoMovimientoForm.controls.motive.value!,
        itemStockId: this.ubicArticulo.itemStockId,
      };

      this.sub.add(
        this.articuloService.createMovimientoStock(this.movimiento).subscribe({
          next: (resp) => {
            swal.fire("Éxito!", "Movimiento cargado correctamente!", "success");
            this.movimiento = undefined;
            this.cerrarModal();
            this.recargar.emit();
          },
          error: (err) => {
            swal.fire("Error!", "Error al cargar el movimiento!", "error");
          },
          complete: () => {

          }
        })
      );
    }
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
    this.sub.add(
      this.articuloService
        .buscarUbicacionesDisponibles(depositId, this.itemId)
        .subscribe({
          next: (resp) => {
            this.ubicaciones = resp.destinationLocations;

            this.ubicaciones = this.ubicaciones.filter(
              (x) => x.id !== this.ubicArticulo.locationId
            );
          },
          error: (err) => {
            console.log(err);
          },
        })
    );
  }
}
