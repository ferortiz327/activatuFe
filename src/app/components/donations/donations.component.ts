import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent  {


  focus: any;
  focus1: any;
  tipoDonacion: string = '';
  selectedPaymentMethod: string = 'credit'; // Establece un valor por defecto, puede ser 'credit', 'pse', o 'points'
  activeTab: string = 'credit';

  banks: string[] = ['Bancolombia', 'Davivienda', 'Banco de Bogotá', 'Nequi', 'BBVA'];
  personTypes: string[] = ['Persona Natural', 'Persona Jurídica'];

  cuotas: number[] = [1, 2, 3, 6, 12];
  selectedBank: string = '';
  selectedPersonType: string = '';
  selectedPoint: string = '';
  paymentPoints: string[] = ['Efecty', 'Paga Todo'];



  opcionesDonacion = [
    { valor: 'diezmo', etiqueta: 'Diezmo' },
    { valor: 'ofrenda', etiqueta: 'Ofrenda' },
    { valor: 'donacion', etiqueta: 'Donación Especial' }
    
  ];

  tipoDocumento = [
    { valor: '1', etiqueta: 'Cédula' },
    { valor: '2', etiqueta: 'Tarjeta de Identidad' },
    { valor: '3', etiqueta: 'Cédula de Extranjería' },
    { valor: '3', etiqueta: 'NIT' }
  ]

  // Método para cambiar entre métodos de pago
  selectPaymentMethod(paymentMethod: string) {
    this.selectedPaymentMethod = paymentMethod;
  }


  // Cambiar la pestaña activa según el método de pago seleccionado
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  
}
