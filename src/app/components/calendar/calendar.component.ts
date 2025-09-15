import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  dias: { nombre: string, actividades: string[] }[] = [
    { nombre: 'Lunes', actividades: [
        'Oración – 9:00 a.m. A 11:00 a.m.',
        'Sembrar para Cosechar – 6:00 p.m.',
        'Servidores– 7:00 p.m.',
    ] },
    { nombre: 'Martes', actividades: [
      'Oración – 9:00 a.m. A 11:00 a.m.',
    ] },
    {
      nombre: 'Miércoles', actividades: [
        'Oración – 9:00 a.m. A 11:00 a.m.',
        'Servicio – 7:00 p.m.',
      ]
    },
    {
      nombre: 'Jueves', actividades: [
        'Ayuno – 8:30 a.m. A 11:00 a.m.',
        'Instituto Bíblico – 6:00 p.m. A 8:00 p.m.',
      ]
    },
    {
      nombre: 'Viernes', actividades: [
        'Oración – 9:00 a.m. A 11:00 a.m.',
      ]
    },
    { nombre: 'Sábado', actividades: [
      'Oración – 6:00 a.m. A 7:00 a.m.',
      'Reunión de jóvenes – 4:30 p.m.',
      'Reunión de Damas – 5:00 p.m.',
    ] },
    {
      nombre: 'Domingo', actividades: [
        'Culto de adoración – 9:00 a.m.',
      ]
    }
  ];
}
