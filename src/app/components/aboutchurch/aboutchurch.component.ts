import { Component, OnInit } from '@angular/core';
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
  selector: 'app-aboutchurch',
  templateUrl: './aboutchurch.component.html',
  styleUrls: ['./aboutchurch.component.scss'],
})
export class AboutchurchComponent{

  // Historia, Misión y Visión
  sections = [
    {
      id: 'historia',
      title: 'Nuestra Historia',
      icon: 'bi-clock-history',
      content: 'Desde nuestros humildes comienzos, hemos sido guiados por la fe y el compromiso de servir a nuestra comunidad. Fundada en el año 1990, nuestra iglesia ha crecido gracias al amor y dedicación de cada miembro.',
      year: '1990',
      image: 'assets/historia.jpg',
      color: '#1e3a8a'
    },
    {
      id: 'mision',
      title: 'Nuestra Misión',
      icon: 'bi-bullseye',
      content: 'Llevar el mensaje transformador del Evangelio a cada persona, discipulando a creyentes para que sean agentes de cambio en sus familias, comunidades y naciones.',
      points: [
        'Predicar el Evangelio con fidelidad',
        'Discipular a los creyentes',
        'Servir a la comunidad',
        'Glorificar a Dios en todo'
      ],
      color: '#3b82f6'
    },
    {
      id: 'vision',
      title: 'Nuestra Visión',
      icon: 'bi-eye',
      content: 'Ser una iglesia relevante y transformadora que impacta cada esfera de la sociedad, equipando a cada generación para vivir su propósito divino.',
      goals: [
        'Crecer en unidad y amor',
        'Expandir nuestro alcance',
        'Formar discípulos comprometidos',
        'Impactar nuestra ciudad'
      ],
      color: '#7c3aed'
    }
  ];

  // Familia Pastoral
  pastoralFamily = [
    {
      name: 'Pastor Principal',
      role: 'Pastor Principal y Fundador',
      image: 'assets/pastor-principal.jpg',
      description: 'Con más de 30 años de ministerio, dedicado a la enseñanza de la Palabra y al discipulado.',
      social: {
        facebook: '#',
        instagram: '#'
      }
    },
    {
      name: 'Co-Pastora',
      role: 'Co-Pastora y Ministerio de Mujeres',
      image: 'assets/copastora.jpg',
      description: 'Enfocada en el ministerio de mujeres, familias y desarrollo del liderazgo femenino.',
      social: {
        instagram: '#'
      }
    },
    {
      name: 'Pastor de Jóvenes',
      role: 'Pastor de Jóvenes y Alabanza',
      image: 'assets/pastor-jovenes.jpg',
      description: 'Apasionado por alcanzar a la nueva generación y desarrollar la adoración creativa.',
      social: {
        instagram: '#',
        youtube: '#'
      }
    },
    {
      name: 'Pastor de Niños',
      role: 'Pastor de Niños y Familias',
      image: 'assets/pastor-ninos.jpg',
      description: 'Especializado en ministerio infantil y desarrollo de programas familiares.',
      social: {
        facebook: '#'
      }
    }
  ];

  activeSection = 'historia';

  setActiveSection(sectionId: string): void {
    this.activeSection = sectionId;
  }




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
