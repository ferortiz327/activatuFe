import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MisionEsperanzaModalComponent } from 'app/components/mision-esperanza-modal/mision-esperanza-modal.component';
import { ModalPromotionsComponent } from 'app/components/modal-promotions/modal-promotions.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRef: any;

  constructor(private modalService: NgbModal,
    private dialog: MatDialog
  ) {}


  mostrarModalActividades() {
    // Usamos { backdrop: 'static', keyboard: false } para evitar cerrar haciendo clic fuera
    if (this.modalRef) return; // Evitar múltiples modales
    
    this.modalRef = this.modalService.open(ModalPromotionsComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modal-actividades'
    });

    this.modalRef.result.finally(() => {
      this.modalRef = null;
    });
  }

  openMisionEsperanza() {
    const modalRef = this.modalService.open(MisionEsperanzaModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });

    modalRef.result.then(
      (result) => {
        console.log('Modal cerrado con:', result);
        if (result === 'help') {
          // Lógica cuando el usuario quiere ayudar
        }
      },
      (reason) => {
        console.log('Modal descartado', reason);
      }
    );
  }
}
