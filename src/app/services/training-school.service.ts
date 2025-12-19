import { Injectable } from '@angular/core';



export interface TrainingRegistration {
  id?: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  occupation: string;
  churchMember: boolean;
  memberTime?: string;
  selectedTrainings: string[];
  trainingGoals: string;
  spiritualLevel: 'beginner' | 'intermediate' | 'advanced';
  previousTraining?: string;
  availability: {
    weekdays: boolean;
    weekends: boolean;
    evenings: boolean;
  };
  commitment: 'full' | 'partial' | 'basic';
  expectations: string;
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
export class TrainingSchoolService {
  private trainingPrograms = [
    {
      id: 'baptism',
      name: 'Formación de Bautismo',
      icon: 'water_drop', // ✓ Funciona
      duration: '8 semanas',
      schedule: 'Sábados 9:00 AM - 11:00 AM',
      requirements: [
        'Ser miembro activo de la iglesia',
        'Asistencia mínima 75%',
        'Estudio bíblico personal',
        'Participación en actividades'
      ],
      description: 'Preparación espiritual y doctrinal para el sacramento del bautismo. Entendimiento profundo del compromiso con Cristo.',
      target: 'Nuevos creyentes y conversos'
    },
    {
      id: 'discipleship',
      name: 'Formación Discipulado',
      icon: 'auto_stories', // ✓ Funciona (mejor que school)
      duration: '12 semanas',
      schedule: 'Martes y Jueves 7:00 PM - 9:00 PM',
      requirements: [
        'Haber sido bautizado',
        'Compromiso de asistencia',
        'Disposición para servir',
        'Participación en grupos pequeños'
      ],
      description: 'Desarrollo de una vida cristiana madura, crecimiento espiritual y servicio en el cuerpo de Cristo.',
      target: 'Creyentes bautizados'
    },
    {
      id: 'deaconate',
      name: 'Formación Diaconado',
      icon: 'handshake', // ✓ Funciona
      duration: '16 semanas',
      schedule: 'Lunes 6:00 PM - 9:00 PM',
      requirements: [
        'Mínimo 2 años en la iglesia',
        'Recomendación pastoral',
        'Servicio comprobado',
        'Liderazgo reconocido'
      ],
      description: 'Formación para el servicio diaconal, administración de la iglesia y cuidado de la congregación.',
      target: 'Miembros comprometidos con llamado al servicio'
    },
    {
      id: 'timothy',
      name: 'Formación Timoteo',
      icon: 'military_tech', // ✓ Funciona (para liderazgo)
      duration: '20 semanas',
      schedule: 'Sábados 2:00 PM - 5:00 PM',
      requirements: [
        'Mínimo 3 años en la iglesia',
        'Liderazgo comprobado',
        'Recomendación pastoral',
        'Compromiso ministerial'
      ],
      description: 'Formación avanzada para líderes y futuros pastores, enseñanza bíblica profunda y desarrollo ministerial.',
      target: 'Líderes con llamado pastoral'
    }
  ];

  private spiritualLevels = [
    { id: 'beginner', name: 'Principiante', description: 'Poco tiempo como cristiano' },
    { id: 'intermediate', name: 'Intermedio', description: 'Algún conocimiento y experiencia' },
    { id: 'advanced', name: 'Avanzado', description: 'Experiencia y servicio significativo' }
  ];

  private commitmentLevels = [
    { id: 'basic', name: 'Básico', description: 'Asistencia a clases' },
    { id: 'partial', name: 'Parcial', description: 'Clases + actividades prácticas' },
    { id: 'full', name: 'Completo', description: 'Clases + prácticas + servicio' }
  ];

  private memberTimes = [
    { id: 'less6', name: 'Menos de 6 meses' },
    { id: '6to12', name: '6 meses a 1 año' },
    { id: '1to3', name: '1 a 3 años' },
    { id: 'more3', name: 'Más de 3 años' }
  ];

  // También corregir el icono de commitment (no existe 'commitment')
  getCommitmentLevels() {
    return [
      { id: 'basic', name: 'Básico', description: 'Asistencia a clases', icon: 'check_circle' },
      { id: 'partial', name: 'Parcial', description: 'Clases + actividades prácticas', icon: 'assignment_turned_in' },
      { id: 'full', name: 'Completo', description: 'Clases + prácticas + servicio', icon: 'workspace_premium' }
    ];
  }

  getTrainingPrograms() {
    return this.trainingPrograms;
  }

  getSpiritualLevels() {
    return this.spiritualLevels;
  }

  getMemberTimes() {
    return this.memberTimes;
  }

  submitRegistration(data: any) {
    console.log('Inscripción enviada:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '¡Inscripción exitosa! Te contactaremos para confirmar tu cupo.'
        });
      }, 1500);
    });
  }
}
