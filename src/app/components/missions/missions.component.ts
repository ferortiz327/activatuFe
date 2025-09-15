import { Component } from '@angular/core';
import { ModalService } from 'app/services/modal.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent {
  modalVisible = false;
  constructor(private modalService: ModalService) { }


  openMisionEsperanza() {
    console.log('Intentando abrir modal'); // Verifica en consola
    this.modalService.openMisionEsperanza();
  }
}
