import { Component, OnInit } from '@angular/core';

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
}
