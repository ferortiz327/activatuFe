import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeServiceService } from 'app/services/youtube-service.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  videoUrl: SafeResourceUrl | null = null;

  constructor(
    private youtube: YoutubeServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.youtube.getLatestVideoId().subscribe((videoId) => {
      if (videoId) {
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}`
        );
      }
    });
  }

  slides = [
    { img: './assets/img/carrusel/ayuno.png' },
    { img: './assets/img/carrusel/domingo.png' },
    { img: './assets/img/carrusel/ayuno.png' },
    { img: './assets/img/carrusel/hogares.png' },
    { img: './assets/img/carrusel/jovene.png' },
    { img: './assets/img/carrusel/miercoles.png' },
    { img: './assets/img/carrusel/oracion.png' },
    { img: './assets/img/carrusel/sembrar.png' },
    { img: './assets/img/carrusel/semilla.png' },
  ];

  slidesHome = [
    {
      img: '../../../../assets/img/sembrador/home.jpg',
      title: 'Bienvenidos a Nuestra Comunidad',
      text: 'Un lugar donde la fe crece y las vidas se transforman',
      button: 'Ver Horarios',
      link: '/horarios',
    },
    {
      img: '../../../../assets/img/sembrador/home2.jpg',
      title: 'Cultos Dominicales',
      text: 'Únete a nuestras celebraciones cada domingo a las 10:00 AM',
      button: 'Ver Horarios',
      link: '/horarios',
    },
    {
      img: '../../../../assets/img/sembrador/home3.jpg',
      title: 'Transmisión en Vivo',
      text: 'Sigue nuestros servicios desde cualquier lugar',
      button: 'Ver Transmisión',
      link: '/live',
    },
  ];

  ngAfterViewInit(): void {
    this.initializeCarouselEffects();
  }

  private initializeCarouselEffects(): void {
    // Efectos adicionales si es necesario
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
      carousel.addEventListener('slide.bs.carousel', (event: any) => {
        this.handleSlideTransition(event);
      });
    }
  }

  private handleSlideTransition(event: any): void {
    // Lógica para manejar transiciones personalizadas
    console.log('Slide changing to:', event.to);
  }
}
