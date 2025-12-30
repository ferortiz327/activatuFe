import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';


interface MiembroFamilia {
  id: number;
  nombre: string;
  rol: string;
  descripcion: string;
  imagen: string;
  detalles: string[];
  redes?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

interface MisionCategoria {
  id: string;
  titulo: string;
  subtitulo: string;
  icono: string;
  color: string;
  descripcion: string;
  caracteristicas: string[];
}
@Component({
  selector: 'app-familia-pastoral',
  templateUrl: './familia-pastoral.component.html',
  styleUrls: ['./familia-pastoral.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerFade', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('cardHover', [
      transition(':enter', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class FamiliaPastoralComponent implements OnInit {


  // Categorías principales
  misiones: MisionCategoria[] = [
    {
      id: 'mision-espiritual',
      titulo: 'Misión Espiritual',
      subtitulo: 'Guía Pastoral',
      icono: 'bi-compass-fill',
      color: '#2563eb',
      descripcion: 'Liderazgo espiritual basado en principios bíblicos para guiar a la congregación hacia el crecimiento en la fe y la comunión con Dios.',
      caracteristicas: [
        'Predicación y enseñanza bíblica',
        'Dirección espiritual de la congregación',
        'Desarrollo de líderes cristianos',
        'Celebración de ordenanzas sagradas'
      ]
    },
    {
      id: 'inspiracion',
      titulo: 'Inspiración',
      subtitulo: 'Vida Ejemplar',
      icono: 'bi-lightning-fill',
      color: '#dc2626',
      descripcion: 'Testimonio vivo de fe y compromiso que inspira a la comunidad a seguir el camino de Cristo en amor y servicio.',
      caracteristicas: [
        'Testimonio personal transformador',
        'Modelo de vida familiar cristiana',
        'Inspiración para nuevas generaciones',
        'Ejemplo de servicio desinteresado'
      ]
    },
    {
      id: 'familias',
      titulo: 'Familias',
      subtitulo: 'Matrimonio Ejemplar',
      icono: 'bi-heart-fill',
      color: '#059669',
      descripcion: 'Ministerio familiar que refleja el amor de Cristo a través de un matrimonio sólido y la crianza de hijas en la fe.',
      caracteristicas: [
        'Modelo de matrimonio cristiano',
        'Crianza con valores bíblicos',
        'Consejería familiar',
        'Unidad familiar como testimonio'
      ]
    },
    {
      id: 'trinitaria',
      titulo: 'Trinitaria',
      subtitulo: 'Fundamento Doctrinal',
      icono: 'bi-triangle-fill',
      color: '#7c3aed',
      descripcion: 'Enseñanza y práctica fundamentada en la doctrina trinitaria del Padre, Hijo y Espíritu Santo.',
      caracteristicas: [
        'Doctrina bíblica sólida',
        'Enseñanza trinitaria completa',
        'Equilibrio teológico',
        'Práctica doctrinal viva'
      ]
    }
  ];

  // Miembros de la familia pastoral
familia: MiembroFamilia[] = [
  {
    id: 1,
    nombre: 'Pastor Oscar Pérez',
    rol: 'Pastor Principal',
    descripcion: 'Líder espiritual con más de 25 años de ministerio pastoral. Su visión ha guiado el crecimiento espiritual de nuestra congregación.',
    imagen: '../../../assets/img/Activa/home2.jpg', // Ruta actualizada
    detalles: [
      '25 años de ministerio pastoral',
      'Maestría en Teología',
      'Especialista en consejería familiar',
      'Conferencista y autor cristiano',
      'Líder de múltiples plantaciones de iglesias'
    ],
    redes: {
      facebook: '#',
      instagram: '#',
      twitter: '#'
    }
  },
  {
    id: 2,
    nombre: 'Lorena Vargas',
    rol: 'Pastora y Esposa',
    descripcion: 'Pilar fundamental del ministerio, dedicada al crecimiento espiritual de las mujeres y fortalecimiento de las familias.',
    imagen: '../../../assets/img/Activa/jovenes.jpg', // Ruta actualizada
    detalles: [
      'Ministerio de mujeres activo',
      'Líder de grupos de intercesión',
      'Coordinadora de eventos familiares',
      'Consejera matrimonial certificada',
      'Maestra de escuela dominical'
    ],
    redes: {
      facebook: '#',
      instagram: '#'
    }
  },
  {
    id: 3,
    nombre: 'Valeria Pérez',
    rol: 'Hija Mayor',
    descripcion: 'Joven comprometida con el ministerio juvenil y la alabanza, estudiante universitaria con corazón para servir.',
    imagen: 'assets/images/pastores/valeria-perez.jpg', // Ruta actualizada
    detalles: [
      'Estudiante de Psicología',
      'Miembro del equipo de alabanza',
      'Líder juvenil activa',
      'Voluntaria en misiones locales',
      'Coordinadora de actividades juveniles'
    ],
    redes: {
      instagram: '#'
    }
  },
  {
    id: 4,
    nombre: 'Camila Pérez',
    rol: 'Hija Menor',
    descripcion: 'Adolescente con gran corazón para los niños y la comunidad, participa activamente en el ministerio infantil.',
    imagen: 'assets/images/pastores/camila-perez.jpg', // Ruta actualizada
    detalles: [
      'Estudiante de secundaria',
      'Ayudante en ministerio infantil',
      'Participante en el coro de niños',
      'Voluntaria en obras comunitarias',
      'Asistente en clases para niños'
    ]
  }
];

  // Datos de la familia como unidad - CORREGIDO: sin caracteres especiales
  datosFamilia = {
    anosMatrimonio: 28,  // Cambiado de añosMatrimonio
    anosMinisterio: 25,  // Cambiado de añosMinisterio
    hijas: 2,
    bautizados: 1500,
    eventosFamiliares: 'Encuentros Matrimoniales, Retiros Familiares, Cenas de Comunión'
  };

  // Variables de estado
  misionActiva: string = 'mision-espiritual';
  miembroSeleccionado: MiembroFamilia | null = null;
  verMasInfo: boolean = false;
  familiaCompleta: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Seleccionar al pastor por defecto
    this.miembroSeleccionado = this.familia[0];
  }

  setMisionActiva(misionId: string): void {
    this.misionActiva = misionId;
  }

  seleccionarMiembro(miembro: MiembroFamilia): void {
    this.miembroSeleccionado = miembro;
  }

  getMisionActiva(): MisionCategoria {
    return this.misiones.find(m => m.id === this.misionActiva) || this.misiones[0];
  }

  toggleVerMas(): void {
    this.verMasInfo = !this.verMasInfo;
  }

  toggleFamiliaCompleta(): void {
    this.familiaCompleta = !this.familiaCompleta;
  }

  getMiembrosVisibles(): MiembroFamilia[] {
    if (this.familiaCompleta) {
      return this.familia;
    }
    // Mostrar solo los padres por defecto
    return this.familia.slice(0, 2);
  }

  // Método para compartir
  compartirRedSocial(red: string): void {
    const mensaje = `Conoce a la familia pastoral: Pastor Oscar Pérez y su esposa Lorena Vargas`;
    const url = window.location.href;

    switch(red) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(mensaje)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(mensaje + ' ' + url)}`, '_blank');
        break;
    }
  }
}
