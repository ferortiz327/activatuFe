import { Injectable } from '@angular/core';


// src/app/components/volunteer-form/models/volunteer.model.ts
export interface Volunteer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  age?: number;
  areas: string[]; // Áreas de interés/servicio
  skills: string[]; // Habilidades
  availability: {
    weekdays: boolean;
    weekends: boolean;
    evenings: boolean;
  };
  experience?: string;
  motivation: string;
  commitmentLevel: 'low' | 'medium' | 'high';
  previousExperience?: string;
  healthConsiderations?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt?: Date;
  status?: 'pending' | 'reviewed' | 'approved' | 'rejected';
}

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private churchWorks = [
    {
      id: 'hospital-clinic',
      name: 'Obra de Hospital y Clínica',
      icon: 'local_hospital',
      description: 'Visitas a enfermos, apoyo espiritual en centros de salud, acompañamiento en momentos difíciles.',
      needs: [
        'Acompañamiento espiritual',
        'Visitas a enfermos',
        'Oración en sala de espera',
        'Apoyo emocional a familias',
        'Distribución de material cristiano'
      ]
    },
    {
      id: 'canasta-amor',
      name: 'Obra de Canasta de Amor',
      icon: 'shopping_basket',
      description: 'Recolección y distribución de alimentos, ayudas para familias en situación vulnerable.',
      needs: [
        'Recolección de alimentos',
        'Clasificación de donaciones',
        'Entrega a domicilio',
        'Coordinación logística',
        'Visitas de seguimiento'
      ]
    },
    {
      id: 'rema-foundation',
      name: 'Obra de Fundación Rema',
      icon: 'family_restroom',
      description: 'Apoyo integral a niños y jóvenes en riesgo, programas educativos y recreativos cristianos.',
      needs: [
        'Tutorías académicas',
        'Actividades recreativas',
        'Enseñanza bíblica para niños',
        'Apoyo psicológico',
        'Coordinación de eventos'
      ]
    },
    {
      id: 'abuelos',
      name: 'Obra de Abuelos (Sibaté-Silvania)',
      icon: 'elderly',
      description: 'Cuidado y acompañamiento a adultos mayores, actividades recreativas y apoyo espiritual.',
      needs: [
        'Visitas domiciliarias',
        'Actividades recreativas',
        'Acompañamiento espiritual',
        'Ayuda en necesidades básicas',
        'Organización de eventos sociales'
      ]
    }
  ];

  private volunteerRoles = [
    { id: 'regular', name: 'Voluntario Regular', icon: 'person' },
    { id: 'coordinator', name: 'Coordinador de Equipo', icon: 'groups' },
    { id: 'specialist', name: 'Especialista (Médico/Psicólogo)', icon: 'medical_services' },
    { id: 'driver', name: 'Conductor', icon: 'directions_car' },
    { id: 'logistics', name: 'Logística y Transporte', icon: 'local_shipping' },
    { id: 'teacher', name: 'Maestro/Enseñanza', icon: 'school' },
    { id: 'counselor', name: 'Consejero Espiritual', icon: 'psychology' }
  ];

  private availabilityOptions = [
    { id: 'mornings', name: 'Mañanas (8am - 12pm)', icon: 'wb_sunny' },
    { id: 'afternoons', name: 'Tardes (2pm - 6pm)', icon: 'light_mode' },
    { id: 'evenings', name: 'Noches (6pm - 9pm)', icon: 'nights_stay' },
    { id: 'weekends', name: 'Fines de semana', icon: 'weekend' },
    { id: 'flexible', name: 'Horario flexible', icon: 'schedule' }
  ];

  private frequencyOptions = [
    { id: 'weekly', name: 'Semanal', description: 'Una vez por semana' },
    { id: 'biweekly', name: 'Quincenal', description: 'Cada 15 días' },
    { id: 'monthly', name: 'Mensual', description: 'Una vez al mes' },
    { id: 'event', name: 'Por evento', description: 'Según actividades programadas' },
    { id: 'fulltime', name: 'Tiempo completo', description: 'Disponibilidad amplia' }
  ];

  getWorks() {
    return this.churchWorks;
  }

  getRoles() {
    return this.volunteerRoles;
  }

  getAvailabilityOptions() {
    return this.availabilityOptions;
  }

  getFrequencyOptions() {
    return this.frequencyOptions;
  }

  submitVolunteerForm(data: Partial<Volunteer>) {
    console.log('Formulario de obra enviado:', data);
    // Simular llamada API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '¡Gracias por tu interés en servir! Nos contactaremos pronto para coordinar tu participación.'
        });
      }, 1500);
    });
  }
}
