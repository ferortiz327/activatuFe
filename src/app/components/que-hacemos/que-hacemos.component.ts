import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-que-hacemos',
  templateUrl: './que-hacemos.component.html',
  styleUrls: ['./que-hacemos.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('staggerFade', [
      transition(':enter', [
        query(
          '.card-item',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger('100ms', [
              animate(
                '500ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class QueHacemosComponent implements OnInit {
  activeCategory = 'obras';

  selectedItem: any = null;
  activeSlideIndex: number = 0;

  // Categorías principales
  categories = [
    { id: 'obras', name: 'Obras', icon: 'bi-heart-fill', color: '#dc2626' },
    {
      id: 'escuelas',
      name: 'Escuelas',
      icon: 'bi-book-fill',
      color: '#1e3a8a',
    },
    {
      id: 'ministerios',
      name: 'Ministerios',
      icon: 'bi-people-fill',
      color: '#059669',
    },
  ];

  // Obras Sociales
  obras = [
    {
      id: 1,
      title: 'Obra de Hospital y Clínica',
      description:
        'Brindamos atención médica integral y servicios de salud accesibles a la comunidad, combinando excelencia profesional con amor cristiano.',
      image: '../../../assets/img/Activa/home3.jpg',
      images: [
        '../../../assets/img/Activa/jovenes.jpg',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      achievements: [
        'Atención médica gratuita a familias necesitadas',
        'Programas de salud preventiva',
        'Consultas especializadas',
      ],
      impact: 'Más de 5,000 personas atendidas anualmente',
    },
    {
      id: 2,
      title: 'Obra de Canasta de Amor',
      description:
        'Programa de apoyo alimentario que brinda asistencia nutricional a familias en situación de vulnerabilidad de nuestra comunidad.',
      image: '../../../assets/img/Activa/home3.jpg',
      images: [
        '../../../assets/img/Activa/jovenes.jpg',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      achievements: [
        'Distribución mensual de alimentos',
        'Talleres de nutrición',
        'Apoyo a familias migrantes',
      ],
      impact: '200 familias beneficiadas mensualmente',
    },
    {
      id: 3,
      title: 'Obra de Fundación Rema',
      description:
        'Fundación dedicada a la rehabilitación y apoyo integral para personas en situación de adicción, ofreciendo un camino de restauración.',
      image: '../../../assets/img/Activa/home3.jpg',
      images: [
        '../../../assets/img/Activa/jovenes.jpg',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      achievements: [
        'Programas de desintoxicación',
        'Terapia psicológica y espiritual',
        'Reinserción laboral',
      ],
      impact: '85% de tasa de recuperación exitosa',
    },
    {
      id: 4,
      title: 'Obra de Abuelos Sibaté-Silvania',
      description:
        'Centro de atención y acompañamiento para adultos mayores, promoviendo su bienestar físico, emocional y espiritual.',
      image: '../../../assets/img/Activa/home3.jpg',
      images: [
        '../../../assets/img/Activa/jovenes.jpg',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      achievements: [
        'Actividades recreativas y terapia ocupacional',
        'Atención médica geriátrica',
        'Comunidad de apoyo mutuo',
      ],
      impact: '150 adultos mayores atendidos',
    },
  ];

  // Escuelas de Formación
  escuelas = [
    {
      id: 1,
      title: 'Formación de Bautismo',
      description:
        'Programa de preparación para el sacramento del bautismo, donde los creyentes comprenden el significado de su nueva vida en Cristo.',
      image: '../../../assets/img/Activa/home3.jpg',
      images: [
        '../../../assets/img/Activa/jovenes.jpg',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      duration: '4 semanas',
      requirements: [
        'Ser miembro activo de la iglesia',
        'Asistir a todas las sesiones',
        'Compromiso de fe',
      ],
      nextDate: 'Próximo curso: Marzo 2024',
    },
    {
      id: 2,
      title: 'Formación Discipulado',
      description:
        'Escuela intensiva de discipulado para aquellos que desean profundizar en su relación con Dios y crecer en madurez espiritual.',
      image: '../../../assets/img/Activa/home3.jpg',
      images: [
        '../../../assets/img/Activa/jovenes.jpg',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      duration: '12 semanas',
      requirements: [
        'Haber completado Formación de Bautismo',
        'Compromiso de lectura bíblica diaria',
        'Participación en grupos pequeños',
      ],
      nextDate: 'Inscripciones abiertas',
    },
    {
      id: 3,
      title: 'Formación Diaconado',
      description:
        'Formación especializada para aquellos llamados al servicio diaconal, preparando líderes para el ministerio de ayuda y servicio.',
      image: '../../../assets/img/Activa/home3.jpg',
      images: [
        '../../../assets/img/Activa/jovenes.jpg',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      duration: '6 meses',
      requirements: [
        'Mínimo 2 años como miembro',
        'Recomendación pastoral',
        'Evaluación de carácter',
      ],
      nextDate: 'Inicio: Agosto 2024',
    },
    {
      id: 4,
      title: 'Formación Timoteo',
      description:
        'Programa de liderazgo juvenil basado en el modelo bíblico de Timoteo, formando a la próxima generación de líderes.',
      image: '../../../assets/img/Activa/home3.jpg',
      images: [
        '../../../assets/img/Activa/jovenes.jpg',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      duration: '9 meses',
      requirements: [
        'Edad: 18-30 años',
        'Liderazgo en ministerio juvenil',
        'Compromiso ministerial',
      ],
      nextDate: 'Cohorte 2024 en curso',
    },
  ];

  // Ministerios
  ministerios = [
    {
      id: 1,
      title: 'Ministerio de Obras Caritarias',
      description:
        'Dedicado a servir a los más necesitados a través de programas sociales, ayuda humanitaria y proyectos comunitarios.',
      image: '../../../assets/img/Activa/Ministerios/adultos.png',
      images: [
        '../../../assets/img/Activa/Ministerios/adultos.png',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      leader: 'Pastor Juan Pérez',
      meeting: 'Sábados 9:00 AM',
      activities: [
        'Visitas a hogares',
        'Reparto de víveres',
        'Apoyo a damnificados',
      ],
    },
    {
      id: 2,
      title: 'Ministerio de Evangelismo',
      description:
        'Equipo comprometido con llevar el mensaje del Evangelio a cada rincón de nuestra ciudad a través de diversas estrategias.',
      image: '../../../assets/img/Activa/Ministerios/evangelismos.png',
      images: [
        '../../../assets/img/Activa/Ministerios/evangelismos.png',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      leader: 'Hermana María Gómez',
      meeting: 'Jueves 7:00 PM',
      activities: [
        'Campañas evangelísticas',
        'Evangelismo personal',
        'Eventos públicos',
      ],
    },
    {
      id: 3,
      title: 'Ministerio de Danzas',
      description:
        'Utilizando la danza como expresión de adoración, este ministerio glorifica a Dios a través del movimiento y la creatividad.',
      image: '../../../assets/img/Activa/home3.jpg',
      images: [
        '../../../assets/img/Activa/jovenes.jpg',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      leader: 'Profesora Laura Rodríguez',
      meeting: 'Martes y Viernes 5:00 PM',
      activities: [
        'Coreografías de alabanza',
        'Presentaciones especiales',
        'Talleres',
      ],
    },
    {
      id: 4,
      title: 'Ministerio Generación de Vanguardia',
      description:
        'Ministerio juvenil innovador que conecta con las nuevas generaciones mediante métodos creativos y relevantes.',
      image: '../../../assets/img/Activa/home3.jpg',
      images: [
        '../../../assets/img/Activa/jovenes.jpg',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      leader: 'Pastor Carlos López',
      meeting: 'Viernes 7:00 PM',
      activities: ['Conciertos', 'Charlas motivacionales', 'Retiros juveniles'],
    },
    {
      id: 5,
      title: 'Ministerio de Intercesión',
      description:
        'Grupo dedicado a la oración constante e intercesión por las necesidades de la iglesia, la comunidad y el mundo.',
      image: '../../../assets/img/Activa/home3.jpg',
      images: [
        '../../../assets/img/Activa/jovenes.jpg',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      leader: 'Hermana Ana Martínez',
      meeting: 'Lunes a Viernes 6:00 AM',
      activities: ['Vigilias de oración', 'Cadena de intercesión', 'Ayunos'],
    },
    {
      id: 6,
      title: 'Ministerio de Alabanza',
      description:
        'Equipo musical que lidera la adoración congregacional, creando atmósferas donde la presencia de Dios se manifiesta.',
      image: '../../../assets/img/Activa/Ministerios/alabanza.png',
      images: [
        '../../../assets/img/Activa/Ministerios/alabanza.png',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      leader: 'Director David Fernández',
      meeting: 'Miércoles 7:00 PM',
      activities: [
        'Ensambles musicales',
        'Grabaciones',
        'Ensayos de adoración',
      ],
    },
    {
      id: 7,
      title: 'Ministerio de Audiovisuales',
      description:
        'Especialistas en producción multimedia que amplifican el mensaje del Evangelio a través de tecnología y creatividad.',
      image: '../../../assets/img/Activa/home3.jpg',
      images: [
        '../../../assets/img/Activa/jovenes.jpg',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      leader: 'Ing. Roberto Sánchez',
      meeting: 'Sábados 10:00 AM',
      activities: [
        'Grabación de servicios',
        'Producción de contenido',
        'Transmisiones en vivo',
      ],
    },
    {
      id: 8,
      title: 'Ministerio de Ujieres',
      description:
        'Equipo de servicio que garantiza que cada persona sea recibida con calidez y que todo funcione en orden durante los servicios.',
      image: '../../../assets/img/Activa/Ministerios/ujieres.png',
      images: [
        '../../../assets/img/Activa/Ministerios/ujieres.png',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      leader: 'Diácono Miguel Torres',
      meeting: 'Domingos 8:00 AM',
      activities: [
        'Recepción',
        'Asistencia a visitantes',
        'Logística de eventos',
      ],
    },
    {
      id: 9,
      title: 'Ministerio Kids',
      description:
        'Ministerio especializado en niños donde aprenden de Dios de manera divertida, creativa y apropiada para su edad.',
      image: '../../../assets/img/Activa/Ministerios/kids.png',
      images: [
        '../../../assets/img/Activa/Ministerios/kids.png',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      leader: 'Maestra Sandra Ramírez',
      meeting: 'Domingos 10:00 AM',
      activities: [
        'Escuela bíblica',
        'Actividades recreativas',
        'Eventos familiares',
      ],
    },
    {
      id: 10,
      title: 'Ministerio de Jóvenes',
      description:
        'Espacio donde los jóvenes encuentran comunidad, crecen en su fe y descubren su propósito en Dios.',
      image: '../../../assets/img/Activa/Ministerios/jovenes.png',
      images: [
        '../../../assets/img/Activa/Ministerios/jovenes.png',
        '../../../assets/img/Activa/home2.jpg',
        '../../../assets/img/Activa/kids.jpg',
        '../../../assets/img/Activa/mujeres.jpg',
      ],
      leader: 'Pastor Andrés Castro',
      meeting: 'Viernes 7:30 PM',
      activities: ['Estudios bíblicos', 'Actividades sociales', 'Misiones'],
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // Seleccionar el primer item por defecto
    this.selectItem(this.getCurrentItems()[0]);
  }

  setActiveCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    const items = this.getCurrentItems();
    if (items.length > 0) {
      this.selectItem(items[0]);
    }
  }

  getCurrentItems(): any[] {
    switch (this.activeCategory) {
      case 'obras':
        return this.obras;
      case 'escuelas':
        return this.escuelas;
      case 'ministerios':
        return this.ministerios;
      default:
        return [];
    }
  }
  getCategoryTitle(): string {
    const category = this.categories.find((c) => c.id === this.activeCategory);
    return category ? category.name : '';
  }

  getCategoryDescription(): string {
    switch (this.activeCategory) {
      case 'obras':
        return 'Nuestras obras sociales son la expresión práctica del amor de Dios hacia nuestra comunidad.';
      case 'escuelas':
        return 'Programas de formación diseñados para el crecimiento integral y desarrollo del carácter cristiano.';
      case 'ministerios':
        return 'Diversos equipos de servicio donde cada persona puede desarrollar sus dones y talentos para Dios.';
      default:
        return '';
    }
  }

  // Método para cambiar la imagen en el carrusel
  nextSlide(): void {
    if (this.selectedItem?.images) {
      this.activeSlideIndex =
        (this.activeSlideIndex + 1) % this.selectedItem.images.length;
    }
  }

  prevSlide(): void {
    if (this.selectedItem?.images) {
      this.activeSlideIndex =
        (this.activeSlideIndex - 1 + this.selectedItem.images.length) %
        this.selectedItem.images.length;
    }
  }

  // Método para seleccionar una imagen específica
  selectSlide(index: number): void {
    this.activeSlideIndex = index;
  }

  selectItem(item: any): void {
  this.selectedItem = item;
  this.activeSlideIndex = 0; // Resetear el carrusel al cambiar de ítem

  // Si el ítem no tiene el arreglo 'images', crea uno con su imagen principal
  if (!this.selectedItem.images) {
    this.selectedItem.images = [this.selectedItem.image];
  }
}
}
