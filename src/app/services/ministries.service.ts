import { Injectable } from '@angular/core';



// src/app/components/ministries-form/models/ministry.model.ts
export interface MinistryRegistration {
  id?: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  churchMember: boolean;
  memberTime: string;
  selectedMinistries: string[];
  spiritualGifts: string[];
  musicalInstruments?: string[];
  danceExperience?: string;
  technicalSkills?: string[];
  availability: {
    rehearsals: boolean;
    services: boolean;
    events: boolean;
    specialEvents: boolean;
  };
  commitmentLevel: 'regular' | 'committed' | 'leadership';
  experience: string;
  testimony: string;
  pastorRecommendation?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  termsAgreed: boolean;
  privacyAgreed: boolean;
  status?: 'pending' | 'approved' | 'rejected';
  registrationDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class MinistriesService {
  // ministries.service.ts - CORREGIDO
private ministriesList = [
  {
    id: 'carelarios',
    name: 'Ministerio de Obras Carcelarios',
    icon: 'favorite', // ❤️ Cambiado de 'heart_broken'
    description: 'Cuidado y apoyo a personas en situación de enfermedad, duelo o crisis emocional.',
    activities: [
      'Visitas a enfermos',
      'Acompañamiento en duelo',
      'Consejería cristiana',
      'Grupos de apoyo'
    ],
    requirements: [
      'Don de misericordia',
      'Madurez espiritual',
      'Discreción y confidencialidad',
      'Capacidad de escucha'
    ]
  },
  {
    id: 'evangelismo',
    name: 'Ministerio de Evangelismo',
    icon: 'campaign', // 📢 Cambiado de 'megaphone'
    description: 'Proclamación del evangelio en las calles, hogares y diferentes entornos.',
    activities: [
      'Campañas evangelísticas',
      'Visitas domiciliarias',
      'Distribución de literatura',
      'Testimonio personal'
    ],
    requirements: [
      'Conocimiento bíblico',
      'Valentía para testificar',
      'Amor por las almas',
      'Disponibilidad para salidas'
    ]
  },
  {
    id: 'danzas',
    name: 'Ministerio de Danzas',
    icon: 'emoji_people', // 💃 Este sí existe ✓
    description: 'Alabanza a Dios a través de la danza y expresiones corporales de adoración.',
    activities: [
      'Coreografías de alabanza',
      'Presentaciones especiales',
      'Ensayos semanales',
      'Talleres de expresión corporal'
    ],
    requirements: [
      'Disposición para bailar',
      'Compromiso con ensayos',
      'Actitud de adoración',
      'Trabajo en equipo'
    ]
  },
  {
    id: 'vanguardia',
    name: 'Ministerio de Generación de Vanguardia',
    icon: 'groups', // 👥 Este sí existe ✓
    description: 'Liderazgo juvenil y formación de nuevos líderes para la iglesia.',
    activities: [
      'Discipulado de jóvenes',
      'Capacitación de líderes',
      'Eventos juveniles',
      'Proyectos misioneros'
    ],
    requirements: [
      'Liderazgo comprobado',
      'Mínimo 1 año en la iglesia',
      'Disposición para enseñar',
      'Visión de multiplicación'
    ]
  },
  {
    id: 'intercesion',
    name: 'Ministerio de Intercesión',
    icon: 'psychology', // 🙏 Cambiado de 'prayer'
    description: 'Oración intensiva por las necesidades de la iglesia y la comunidad.',
    activities: [
      'Vigilias de oración',
      'Cadenas de intercesión',
      'Oración por enfermos',
      'Ayunos programados'
    ],
    requirements: [
      'Vida de oración constante',
      'Sensibilidad espiritual',
      'Compromiso con horarios',
      'Confidencialidad'
    ]
  },
  {
    id: 'alabanza',
    name: 'Ministerio de Alabanza',
    icon: 'music_note', // 🎵 Este sí existe ✓
    description: 'Dirigir la adoración musical en los servicios y actividades de la iglesia.',
    activities: [
      'Prácticas musicales',
      'Dirección de alabanza',
      'Preparación de repertorio',
      'Mantenimiento de instrumentos'
    ],
    requirements: [
      'Habilidad musical comprobada',
      'Audición aprobada',
      'Disponibilidad para ensayos',
      'Corazón de adorador'
    ]
  },
  {
    id: 'audiovisuales',
    name: 'Ministerio de Audiovisuales',
    icon: 'videocam', // 🎥 Este sí existe ✓
    description: 'Producción y transmisión de contenido audiovisual para los servicios.',
    activities: [
      'Operación de cámaras',
      'Transmisiones en vivo',
      'Edición de video',
      'Control de sonido'
    ],
    requirements: [
      'Conocimiento técnico básico',
      'Disponibilidad para capacitación',
      'Atención a detalles',
      'Trabajo bajo presión'
    ]
  },
  {
    id: 'ujieres',
    name: 'Ministerio de Ujieres',
    icon: 'handshake', // 🤝 Cambiado de 'diversity' (sí existe pero es diferente)
    // O usar 'handshake' si prefieres
    description: 'Servicio de recepción, orientación y atención durante los servicios.',
    activities: [
      'Recepción de asistentes',
      'Distribución de materiales',
      'Control de aforo',
      'Atención a visitantes'
    ],
    requirements: [
      'Don de servicio',
      'Buen trato personal',
      'Puntualidad',
      'Presentación personal adecuada'
    ]
  },
  {
    id: 'kids',
    name: 'Ministerio Kids',
    icon: 'child_care', // 👶 Este sí existe ✓
    description: 'Enseñanza y cuidado de niños durante los servicios y actividades especiales.',
    activities: [
      'Enseñanza bíblica infantil',
      'Actividades recreativas',
      'Cuidado durante servicios',
      'Preparación de materiales'
    ],
    requirements: [
      'Amor por los niños',
      'Certificado de antecedentes',
      'Capacidad de enseñanza',
      'Creatividad'
    ]
  },
  {
    id: 'jovenes',
    name: 'Ministerio de Jóvenes',
    icon: 'emoji_events', // 🎯 Este sí existe ✓
    description: 'Discipulado y acompañamiento de adolescentes y jóvenes.',
    activities: [
      'Estudios bíblicos juveniles',
      'Actividades recreativas',
      'Retiros espirituales',
      'Proyectos de servicio'
    ],
    requirements: [
      'Relación con jóvenes',
      'Testimonio de vida',
      'Creatividad en enseñanza',
      'Disponibilidad extracurricular'
    ]
  }
];

  private spiritualGifts = [
    'Enseñanza',
    'Servicio',
    'Exhortación',
    'Dar',
    'Liderazgo',
    'Misericordia',
    'Sabiduría',
    'Conocimiento',
    'Fe',
    'Sanidades',
    'Milagros',
    'Profecía',
    'Discernimiento',
    'Lenguas',
    'Interpretación'
  ];

  private musicalInstruments = [
    'Guitarra',
    'Bajo',
    'Batería',
    'Teclado/Piano',
    'Violín',
    'Flauta',
    'Saxofón',
    'Trompeta',
    'Voz (Solista)',
    'Voz (Coros)',
    'Percusión',
    'Acordeón'
  ];

  private technicalSkills = [
    'Operación de cámara',
    'Edición de video',
    'Sonido en vivo',
    'Iluminación',
    'Transmisiones en vivo',
    'Diseño gráfico',
    'Fotografía',
    'Producción audiovisual'
  ];

  private danceExperienceLevels = [
    'Principiante',
    'Intermedio',
    'Avanzado',
    'Profesional'
  ];

  private commitmentLevels = [
    { id: 'regular', name: 'Regular', description: 'Participación en actividades regulares' },
    { id: 'committed', name: 'Comprometido', description: 'Participación activa y responsabilidades' },
    { id: 'leadership', name: 'Liderazgo', description: 'Liderazgo y coordinación del ministerio' }
  ];

  getMinistries() {
    return this.ministriesList;
  }

  getSpiritualGifts() {
    return this.spiritualGifts;
  }

  getMusicalInstruments() {
    return this.musicalInstruments;
  }

  getTechnicalSkills() {
    return this.technicalSkills;
  }

  getDanceExperienceLevels() {
    return this.danceExperienceLevels;
  }

  getCommitmentLevels() {
    return this.commitmentLevels;
  }

  submitRegistration(data: any) {
    console.log('Inscripción a ministerios enviada:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '¡Inscripción exitosa! El líder del ministerio se pondrá en contacto contigo.'
        });
      }, 1500);
    });
  }
}
