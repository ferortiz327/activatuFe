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
  latestVideoId: string | null = null;
  isVideoLoading = true;



  constructor(
    private youtube: YoutubeServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
        // Cargar el video
    this.loadLatestVideo();
    this.youtube.getLatestVideoId().subscribe((videoId) => {
      if (videoId) {
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}`
        );
      }
    });
  }

  slides = [
    { img: './assets/img/Activa/calendario.jpeg' },
    { img: './assets/img/Activa/kids.jpg' },
    { img: './assets/img/Activa/jovenes.jpg' },
    { img: './assets/img/Activa/obramisionera.jpg' },
    { img: './assets/img/Activa/horario.jpg' },
  ];

  slidesHome = [
    {
      img: '../../../../assets/img/Activa/home5.jpeg',
      title: 'Bienvenidos a Nuestra Iglesia',
      text: 'misión, visión, historia, familia pastoral y más',
      button: 'Ver Más',
      link: '#/quienes-somos',
    },
    {
      img: '../../../../assets/img/Activa/home6.jpeg',
      title: 'Nuestras Sedes',
      text: 'Únete a nuestras celebraciones cada domingo a las 10:00 AM',
      button: 'Nuestras Sedes',
      link: '#/sedes',
    },
    {
      img: '../../../../assets/img/Activa/home7.jpeg',
      title: 'Transmisión en Vivo',
      text: 'Sigue nuestros servicios desde cualquier lugar',
      button: 'Nuestros Horarios',
      link: '#/calendario',
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



    loadLatestVideo() {
    this.youtube.getLatestVideoId().subscribe({
      next: (videoId) => {
        if (videoId) {
          this.latestVideoId = videoId;
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${videoId}`
          );
        }
        this.isVideoLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar video:', error);
        this.isVideoLoading = false;
      }
    });
  }
}
