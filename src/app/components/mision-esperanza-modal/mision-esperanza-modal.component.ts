import { Component, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-mision-esperanza-modal',
  templateUrl: './mision-esperanza-modal.component.html',
  styleUrls: ['./mision-esperanza-modal.component.scss']
})
export class MisionEsperanzaModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close('closed');
  }

  quieroAyudar() {
    this.activeModal.close('help');
  }
}