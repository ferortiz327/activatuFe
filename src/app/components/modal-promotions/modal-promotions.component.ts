import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-promotions',
  templateUrl: './modal-promotions.component.html',
  styleUrls: ['./modal-promotions.component.scss'],
  providers: [DatePipe] // Añadir el pipe como proveedor
})
export class ModalPromotionsComponent implements OnInit {
  actividades = [
    {
      id: 1,
      imagen: '../../../assets/img/carrusel/ayuno.png',
      titulo: 'Culto Dominical Especial',
      descripcion: 'Únete a nuestra celebración dominical con un mensaje especial para toda la familia.',
      fecha: new Date(),
      hora: '10:00 AM',
      lugar: 'Templo Principal',
      nuevo: true
    },
    {
      id: 2,
      imagen: '../../../assets/img/carrusel/jovene.png',
      titulo: 'Encuentro de Jóvenes',
      descripcion: 'Una noche llena de adoración y enseñanza para la nueva generación.',
      fecha: new Date(Date.now() + 86400000),
      hora: '7:00 PM',
      lugar: 'Salón de Jóvenes',
      nuevo: false
    },
    {
      id: 3,
      imagen: '../../../assets/img/carrusel/hogares.png',
      titulo: 'Vigilia de Oración',
      descripcion: 'Noche de intercesión por nuestras familias y comunidad.',
      fecha: new Date(Date.now() + 172800000),
      hora: '8:00 PM',
      lugar: 'Capilla de Oración',
      nuevo: true
    }
  ];

  currentSlide = 0;

  // Inyectar NgbActiveModal correctamente
  constructor(public activeModal: NgbActiveModal) {}

  // Método para cambiar a un slide específico
  goToSlide(index: number, event: Event): void {
    event.stopPropagation();
    this.currentSlide = index;
    this.updateActiveSlide();
  }

  // Navegación con flechas del teclado
  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.prevSlide();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
    } else if (event.key === 'Escape') {
      this.cerrar();
    }
  }

  // Navegación manual
  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0
      ? this.actividades.length - 1
      : this.currentSlide - 1;
    this.updateActiveSlide();
  }

  nextSlide(): void {
    this.currentSlide = this.currentSlide === this.actividades.length - 1
      ? 0
      : this.currentSlide + 1;
    this.updateActiveSlide();
  }

  // Actualizar visualmente el slide activo
  private updateActiveSlide(): void {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators button');

    items.forEach((item, index) => {
      if (index === this.currentSlide) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    indicators.forEach((indicator, index) => {
      if (index === this.currentSlide) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  verDetalles(evento: any, event: Event): void {
    event.stopPropagation();
    console.log('Ver detalles del evento:', evento);
    // Tu lógica aquí
  }

  // Cerrar modal CORRECTAMENTE usando NgbActiveModal
  cerrar(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    // Esto es lo importante - usar el método close de NgbActiveModal
    this.activeModal.close();

    // También remover la clase del body
    document.body.classList.remove('modal-open');
  }

  // Inicializar cuando se abre el modal
  ngOnInit(): void {
    document.body.classList.add('modal-open');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('modal-open');
  }
}
