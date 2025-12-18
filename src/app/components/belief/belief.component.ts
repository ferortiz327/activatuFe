import { Component } from '@angular/core';

@Component({
  selector: 'app-belief',
  templateUrl: './belief.component.html',
  styleUrls: ['./belief.component.scss']
})
export class BeliefComponent {
  activeCard: number = 1; // Por defecto abierto el primero

  toggleCard(cardNumber: number): void {
    this.activeCard = this.activeCard === cardNumber ? 0 : cardNumber;
  }
}
