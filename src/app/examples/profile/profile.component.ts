import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {

    dias: { nombre: string, actividades: string[] }[] = [
        { nombre: 'Lunes', actividades: [
            'Se'
        ] },
        { nombre: 'Martes', actividades: [] },
        {
          nombre: 'Miércoles', actividades: [
            'Oración congregacional – 6:30 p.m.',
            'Estudio bíblico – 7:00 p.m.'
          ]
        },
        {
          nombre: 'Jueves', actividades: []
        },
        {
          nombre: 'Viernes', actividades: [
            'Reunión de jóvenes – 6:30 p.m.',
            'Culto de alabanza – 7:30 p.m.'
          ]
        },
        { nombre: 'Sábado', actividades: [] },
        {
          nombre: 'Domingo', actividades: [
            'Culto de adoración – 9:00 a.m.',
            'Escuela dominical – 10:30 a.m.',
            'Culto vespertino – 6:00 p.m.'
          ]
        }
      ];
}
