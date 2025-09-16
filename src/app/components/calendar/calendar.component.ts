import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  horarios = [

    {
      dia: 'Martes',
      actividades: [
        { hora: '9:00 AM - 11:00 AM', nombre: 'Servicio de Ayuno y Oración' }
      ]
    },
    {
      dia: 'Miércoles',
      actividades: [
        { hora: '9:00 AM - 11:00 AM', nombre: 'Servicio de Ayuno y Oración' },
        { hora: '7:00 PM', nombre: 'Estudio Biblico y Capacitación Ministerial' }
      ]
    },
    {
      dia: 'Jueves',
      actividades: [
        { hora: '9:00 AM - 11:00 AM', nombre: 'Servicio de Ayuno y Guerra Espiritual' },
        { hora: '7:00 PM', nombre: 'Guerra Espiritual' },
      ]
    },
    {
      dia: 'Viernes',
      actividades: [
        { hora: '9:00 AM - 11:00 AM', nombre: 'Servicio de Ayuno y Oración Por las familias' },
        { hora: '7:00 PM', nombre: 'Servicio de Por las Familias' },
        { hora: 'Mensual', nombre: 'Reunion de Barones' },
        { hora: 'Cada 2 Meses', nombre: 'Reunion de Mujeres' },
      ]
    },
    {
      dia: 'Sabado',
      actividades: [
        { hora: '4:00 PM', nombre: 'Serivicio Juvenil' },
      ]
    },
    {
      dia: 'Domingo',
      actividades: [
        { hora: '8:00 AM', nombre: 'Servicio Dominical' },
        { hora: '10:00 AM', nombre: 'Servicio Dominical' },
        { hora: '12:00 AM', nombre: 'Servicio Dominical' },
      ]
    }
  ];

}
