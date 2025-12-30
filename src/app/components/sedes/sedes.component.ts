import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  stagger,
  query,
} from '@angular/animations';

interface Sede {
  id: number;
  nombre: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  email: string;
  pastor: string;
  horarios: string[];
  servicios: string[];
  imagen: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
  caracteristicas: string[];
  capacidad: number;
  anoFundacion: number; // Cambiado de añoFundacion
}

interface CiudadInfo {
  nombre: string;
  poblacion: string;
  distancia: string;
  clima: string;
  icono: string;
  color: string;
}

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.scss'],
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
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
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
    trigger('cardHover', [
      transition(':enter', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class SedesComponent implements OnInit {
  sedes: Sede[] = [
    {
      id: 1,
      nombre: 'Sede Central',
      ciudad: 'Pereira',
      direccion: 'Carrera 8 #23-45, Centro',
      telefono: '+57 6 324 5678',
      email: 'pereira@activaturafe.com',
      pastor: 'Pastor Andrés Ramírez',
      horarios: [
        'Domingos: 8:00 AM, 10:00 AM, 6:00 PM',
        'Martes: Oración 7:00 PM',
        'Viernes: Estudio Bíblico 7:00 PM',
        'Sábado: Jóvenes 5:00 PM',
      ],
      servicios: [
        'Cultos Dominicales',
        'Escuela Dominical',
        'Ministerio de Alabanza',
        'Grupos de Hogar',
        'Consejería Pastoral',
      ],
      imagen: 'assets/images/sedes/pereira.jpg',
      coordenadas: {
        lat: 4.81333,
        lng: -75.69611,
      },
      caracteristicas: [
        'Capacidad: 500 personas',
        'Estacionamiento gratuito',
        'Acceso para discapacitados',
        'Sistema de sonido profesional',
        'Salones para niños',
      ],
      capacidad: 500,
      anoFundacion: 1995, // Cambiado aquí
    },
    {
      id: 2,
      nombre: 'Sede Norte',
      ciudad: 'Girardot',
      direccion: 'Avenida Colombia #45-67',
      telefono: '+57 1 876 5432',
      email: 'girardot@activaturafe.com',
      pastor: 'Pastora María Gómez',
      horarios: [
        'Domingos: 9:00 AM, 11:00 AM',
        'Miércoles: Oración 7:30 PM',
        'Jueves: Damas 4:00 PM',
        'Sábado: Varones 8:00 AM',
      ],
      servicios: [
        'Cultos Dominicales',
        'Ministerio Infantil',
        'Grupo de Matrimonios',
        'Escuela de Liderazgo',
        'Ayuda Social',
      ],
      imagen: 'assets/images/sedes/girardot.jpg',
      coordenadas: {
        lat: 4.30306,
        lng: -74.80028,
      },
      caracteristicas: [
        'Capacidad: 300 personas',
        'Aire acondicionado',
        'Zona infantil amplia',
        'Biblioteca cristiana',
        'Cafetería',
      ],
      capacidad: 300,
      anoFundacion: 2005, // Cambiado aquí
    },
    {
      id: 3,
      nombre: 'Sede Occidente',
      ciudad: 'Melgar',
      direccion: 'Calle 15 #12-34, Centro',
      telefono: '+57 8 765 4321',
      email: 'melgar@activaturafe.com',
      pastor: 'Pastor Carlos Mendoza',
      horarios: [
        'Domingos: 10:00 AM, 5:00 PM',
        'Martes: Sanidad 7:00 PM',
        'Viernes: Jóvenes 7:00 PM',
        'Sábado: Intercesión 6:00 AM',
      ],
      servicios: [
        'Cultos Dominicales',
        'Ministerio Juvenil',
        'Grupos de Oración',
        'Evangelismo',
        'Misiones',
      ],
      imagen: 'assets/images/sedes/melgar.jpg',
      coordenadas: {
        lat: 4.20333,
        lng: -74.64083,
      },
      caracteristicas: [
        'Capacidad: 250 personas',
        'Parqueadero vigilado',
        'Estudio de grabación',
        'Salón multiusos',
        'Área verde',
      ],
      capacidad: 250,
      anoFundacion: 2010, // Cambiado aquí
    },
    {
      id: 4,
      nombre: 'Sede Sur',
      ciudad: 'Fusagasugá',
      direccion: 'Diagonal 20 #34-56',
      telefono: '+57 1 234 5678',
      email: 'fusagasuga@activaturafe.com',
      pastor: 'Pastor José Rodríguez',
      horarios: [
        'Domingos: 8:30 AM, 11:30 AM, 6:30 PM',
        'Miércoles: Estudio Bíblico 7:00 PM',
        'Jueves: Mujeres 3:00 PM',
        'Sábado: Deportes 4:00 PM',
      ],
      servicios: [
        'Cultos Dominicales',
        'Ministerio de Niños',
        'Escuela de Música',
        'Consejería Familiar',
        'Programas Sociales',
      ],
      imagen: 'assets/images/sedes/fusagasuga.jpg',
      coordenadas: {
        lat: 4.34389,
        lng: -74.36778,
      },
      caracteristicas: [
        'Capacidad: 400 personas',
        'Amplio auditorio',
        'Sala de lactancia',
        'Centro de capacitación',
        'Huerta comunitaria',
      ],
      capacidad: 400,
      anoFundacion: 2008, // Cambiado aquí
    },
    {
      id: 5,
      nombre: 'Sede Oriental',
      ciudad: 'Ibagué',
      direccion: 'Carrera 5 #67-89',
      telefono: '+57 8 123 4567',
      email: 'ibague@activaturafe.com',
      pastor: 'Pastor Roberto Silva',
      horarios: [
        'Domingos: 9:30 AM, 4:00 PM',
        'Lunes: Oración 7:00 PM',
        'Jueves: Varones 7:00 PM',
        'Viernes: Alabanza 7:00 PM',
      ],
      servicios: [
        'Cultos Dominicales',
        'Grupos Celulares',
        'Ministerio de Teatro',
        'Capacitación Ministerial',
        'Proyección Social',
      ],
      imagen: 'assets/images/sedes/ibague.jpg',
      coordenadas: {
        lat: 4.43889,
        lng: -75.23222,
      },
      caracteristicas: [
        'Capacidad: 350 personas',
        'Sistema de video',
        'Sala de conferencias',
        'Cocina industrial',
        'Jardín de oración',
      ],
      capacidad: 350,
      anoFundacion: 2012, // Cambiado aquí
    },
  ];

  ciudadesInfo: CiudadInfo[] = [
    {
      nombre: 'Pereira',
      poblacion: '500,000 hab.',
      distancia: '250 km de Bogotá',
      clima: 'Templado (20°C)',
      icono: 'bi-tree',
      color: '#1e40af',
    },
    {
      nombre: 'Girardot',
      poblacion: '120,000 hab.',
      distancia: '130 km de Bogotá',
      clima: 'Cálido (28°C)',
      icono: 'bi-sun',
      color: '#dc2626',
    },
    {
      nombre: 'Melgar',
      poblacion: '40,000 hab.',
      distancia: '100 km de Bogotá',
      clima: 'Cálido (30°C)',
      icono: 'bi-water',
      color: '#059669',
    },
    {
      nombre: 'Fusagasugá',
      poblacion: '140,000 hab.',
      distancia: '60 km de Bogotá',
      clima: 'Templado (18°C)',
      icono: 'bi-flower',
      color: '#7c3aed',
    },
    {
      nombre: 'Ibagué',
      poblacion: '600,000 hab.',
      distancia: '200 km de Bogotá',
      clima: 'Cálido (24°C)',
      icono: 'bi-music-note',
      color: '#d97706',
    },
  ];

  sedeSeleccionada: Sede | null = null;
  filtroCiudad: string = 'todas';
  vistaMapa: boolean = false;
  estadisticas = {
    totalSedes: 5,
    totalCapacidad: 1800,
    anoMasAntiguo: 1995, // Cambiado de añoMasAntiguo
    pastores: 5,
  };

  constructor() {}

  ngOnInit(): void {
    this.sedeSeleccionada = this.sedes[0];
  }

  seleccionarSede(sede: Sede): void {
    this.sedeSeleccionada = sede;
  }

  filtrarPorCiudad(ciudad: string): void {
    this.filtroCiudad = ciudad;
  }

  getSedesFiltradas(): Sede[] {
    if (this.filtroCiudad === 'todas') {
      return this.sedes;
    }
    return this.sedes.filter(
      (sede) => sede.ciudad.toLowerCase() === this.filtroCiudad.toLowerCase()
    );
  }

  getCiudadInfo(ciudad: string): CiudadInfo {
    return (
      this.ciudadesInfo.find(
        (c) => c.nombre.toLowerCase() === ciudad.toLowerCase()
      ) || this.ciudadesInfo[0]
    );
  }

  toggleVistaMapa(): void {
    this.vistaMapa = !this.vistaMapa;
  }

  abrirGoogleMaps(sede: Sede): void {
    const url = `https://www.google.com/maps/search/?api=1&query=${sede.coordenadas.lat},${sede.coordenadas.lng}`;
    window.open(url, '_blank');
  }

  obtenerDireccionWaze(sede: Sede): void {
    const url = `https://www.waze.com/ul?ll=${sede.coordenadas.lat},${sede.coordenadas.lng}&navigate=yes`;
    window.open(url, '_blank');
  }

  copiarTelefono(telefono: string): void {
    navigator.clipboard.writeText(telefono).then(() => {
      console.log('Teléfono copiado:', telefono);
    });
  }

  getMarkerPosition(ciudad: string): { x: string; y: string } {
    const positions: { [key: string]: { x: string; y: string } } = {
      pereira: { x: '30%', y: '30%' },
      girardot: { x: '50%', y: '60%' },
      melgar: { x: '40%', y: '70%' },
      fusagasugá: { x: '60%', y: '50%' },
      ibagué: { x: '70%', y: '40%' },
    };
    return positions[ciudad.toLowerCase()] || { x: '50%', y: '50%' };
  }

  /* FUNCIÓN PARA COORDENADAS - Añadir al TypeScript */
  getCiudadCoords(ciudad: string): { x: number; y: number } {
    const coords: { [key: string]: { x: number; y: number } } = {
      pereira: { x: 350, y: 250 }, // Eje cafetero
      girardot: { x: 420, y: 300 }, // Cercano a Bogotá
      melgar: { x: 380, y: 350 }, // Tolima
      fusagasugá: { x: 320, y: 400 }, // Cundinamarca
      ibagué: { x: 370, y: 450 }, // Tolima central
    };
    return coords[ciudad.toLowerCase()] || { x: 400, y: 300 };
  }

  // También añade esta función
  getSedeByCiudad(ciudad: string): Sede {
    return (
      this.sedes.find(
        (sede) => sede.ciudad.toLowerCase() === ciudad.toLowerCase()
      ) || this.sedes[0]
    );
  }

  sedeExpandida: number | null = null; // Nueva variable

  // ... resto del código existente ...

  // Método para expandir/contraer
  toggleAcordeon(sedeId: number): void {
    if (this.sedeExpandida === sedeId) {
      this.sedeExpandida = null;
    } else {
      this.sedeExpandida = sedeId;
    }
  }

  // Verifica si una sede está expandida
  isSedeExpandida(sedeId: number): boolean {
    return this.sedeExpandida === sedeId;
  }
}
