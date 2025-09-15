import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-promotions',
  templateUrl: './modal-promotions.component.html',
  styleUrls: ['./modal-promotions.component.scss'],
  providers: [DatePipe] // Añadir el pipe como proveedor
})
export class ModalPromotionsComponent implements OnInit {
  actividades: any[] = [];
  constructor(public activeModal: NgbActiveModal,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  cerrar() {
    this.activeModal.close();
  }

  cargarActividades() {
    // Reemplaza con tu lógica de carga real
    this.actividades = [

      {
        titulo: 'Congreso de Mujeres',
        descripcion: 'Descripción de la actividad más reciente 1',
        fecha: 'Jueves 6:00 PM',
        imagen: './assets/img/promotions/oracionMiercoles.jpeg'
      },
      {
        titulo: 'Estudio Bíblico',
        descripcion: 'Descripción de la actividad más reciente 1',
        fecha: 'Jueves 6:00 PM',
        imagen: './assets/img/promotions/estudio.png'
      },
      {
        titulo: 'Estudio Bíblico',
        descripcion: 'Descripción de la actividad más reciente 1',
        fecha: 'Jueves 6:00 PM',
        imagen: './assets/img/promotions/vastago.jpeg'
      },
      {
        titulo: 'Congreso de Mujeres',
        descripcion: 'Descripción de la actividad más reciente 1',
        fecha: 'Jueves 6:00 PM',
        imagen: './assets/img/promotions/congreso.jpeg'
      }
    ];
  }

  formatearFecha(fecha: Date): string {
    return this.datePipe.transform(fecha, 'mediumDate') || '';
  }

}
