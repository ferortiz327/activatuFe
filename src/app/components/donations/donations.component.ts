import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent  {

 selectedMethod: string | null = null;

  // Métodos de pago disponibles
  paymentMethods = [
    {
      id: 'daviplata',
      name: 'DaviPlata',
      number: '312 345 6789',
      holder: 'Iglesia Activa tu Fe',
      copyText: '3123456789'
    },
    {
      id: 'nequi',
      name: 'Nequi',
      number: '310 987 6543',
      holder: 'Iglesia Activa tu Fe',
      copyText: '3109876543'
    },
    {
      id: 'bancolombia',
      name: 'Bancolombia',
      number: '123-456789-00',
      holder: 'Iglesia Activa tu Fe',
      copyText: '12345678900'
    }
  ];

  // Seleccionar método de pago
  selectMethod(methodId: string): void {
    this.selectedMethod = methodId;

    // Encontrar el método seleccionado
    const method = this.paymentMethods.find(m => m.id === methodId);
    if (method) {
      // Mostrar notificación
      this.showNotification(`Seleccionaste ${method.name}`);
    }
  }

  // Copiar al portapapeles
  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.showNotification('¡Copiado al portapapeles!');
    }).catch(err => {
      console.error('Error al copiar:', err);
      this.showNotification('Error al copiar. Intenta nuevamente.');
    });
  }

  // Mostrar notificación
  showNotification(message: string): void {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Agregar al DOM
    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
          if (notification.parentNode) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 3000);
  }

  // Abrir pasarela Bold (simulada)
  openBoldPayment(): void {
    // En producción, esto redirigiría a la pasarela real
    // const boldUrl = 'https://bold.co/checkout?church=activatufe';
    // window.open(boldUrl, '_blank');

    // Por ahora, mostrar mensaje de simulación
    this.showNotification('Redirigiendo a la pasarela de pago Bold...');

    // Simular redirección después de 1 segundo
    setTimeout(() => {
      alert('En producción, esto abriría la pasarela de pago Bold\n\nAquí el usuario completaría:\n1. Monto de la donación\n2. Datos personales\n3. Información de pago\n4. Recibiría recibo inmediato');
    }, 1000);
  }

  // Enviar a WhatsApp
  sendToWhatsApp(): void {
    if (!this.selectedMethod) {
      this.showNotification('Por favor selecciona un método de pago primero');
      return;
    }

    const method = this.paymentMethods.find(m => m.id === this.selectedMethod);
    if (!method) return;

    const phone = '573001234567';
    const message = `¡Hola! Quiero enviar el comprobante de mi donación:\n\n` +
                   `Método: ${method.name}\n` +
                   `Número/Cuenta: ${method.number}\n` +
                   `Titular: ${method.holder}\n\n` +
                   `Enviaré el comprobante en seguida.`;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}
