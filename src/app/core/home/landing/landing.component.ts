import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeServiceService } from 'app/services/youtube-service.service';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  videoUrl: SafeResourceUrl | null = null;

  constructor(private youtube: YoutubeServiceService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.youtube.getLatestVideoId().subscribe(videoId => {
      if (videoId) {
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}`
        );
      }
    });
  }



  slides = [
    { img: './assets/img/carrusel/ayuno.png'},
    { img: './assets/img/carrusel/domingo.png' },
    { img: './assets/img/carrusel/ayuno.png' },
    { img: './assets/img/carrusel/hogares.png' },
    { img: './assets/img/carrusel/jovene.png'},
    { img: './assets/img/carrusel/miercoles.png'},
    { img: './assets/img/carrusel/oracion.png'},
    { img: './assets/img/carrusel/sembrar.png'},
    { img: './assets/img/carrusel/semilla.png'}
  ];


  ngAfterViewInit() {
    const state = window.history.state;
    if (state && state.scrollToFormulario) {
      // Espera un momento para asegurar que la vista esté renderizada
      setTimeout(() => {
        const formulario = document.getElementById('formulario');
        if (formulario) {
          formulario.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

  slidesHome = [
    {
      img: '../../../../assets/img/sembrador/home.jpg',
      title: 'Bienvenido a Nuestra Iglesia',
      text: 'Un lugar para crecer en fe y esperanza',
      button: 'Conócenos más',
      link: '#formulario'
    },
    {
      img: '../../../../assets/img/sembrador/home2.jpg',
      title: 'Dios tiene un propósito contigo',
      text: 'Queremos caminar juntos en tu fe',
      button: 'Únete',
      link: '#formulario'
    },
    {
      img: '../../../../assets/img/sembrador/home3.jpg',
      title: 'Somos una familia en Cristo',
      text: 'Te esperamos con los brazos abiertos',
      button: 'Participa',
      link: '#formulario'
    }
  ];
}
