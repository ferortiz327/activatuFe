import { Injectable } from '@angular/core';

export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover: string;
  duration: number;
  album?: string;
  year?: number;
}


@Injectable({
  providedIn: 'root'
})

export class MusicPlayerService {
 private tracks: Track[] = [
    {
      id: 1,
      title: 'Dios está aquí',
      artist: 'Ministerio de Alabanza',
      src: 'assets/audio/dios-esta-aqui.mp3',
      cover: 'assets/img/music/covers/dios-esta-aqui.jpg',
      duration: 245,
      album: 'Adoración Viva',
      year: 2023
    },
    {
      id: 2,
      title: 'Grande es tu fidelidad',
      artist: 'Coro El Sembrador',
      src: 'assets/audio/grande-es-tu-fidelidad.mp3',
      cover: 'assets/img/music/covers/fidelidad.jpg',
      duration: 312,
      album: 'Himnos Eternos',
      year: 2024
    },
    {
      id: 3,
      title: 'Ríos de Agua Viva',
      artist: 'Ministerio de Jóvenes',
      src: 'assets/audio/rios-agua-viva.mp3',
      cover: 'assets/img/music/covers/rios.jpg',
      duration: 278,
      album: 'Fluye en Mí',
      year: 2023
    },
    {
      id: 4,
      title: 'En lo Secreto',
      artist: 'Grupo de Adoración',
      src: 'assets/audio/en-lo-secreto.mp3',
      cover: 'assets/img/music/covers/secreto.jpg',
      duration: 325,
      album: 'Intimidad',
      year: 2024
    }
  ];

  private playerConfig = {
    autoplay: true,
    volume: 0.7,
    loop: false,
    shuffle: false,
    saveProgress: true
  };

  getTracks(): Track[] {
    return this.tracks;
  }

  getPlayerConfig() {
    return this.playerConfig;
  }

  updateConfig(config: Partial<typeof this.playerConfig>) {
    this.playerConfig = { ...this.playerConfig, ...config };
  }

  addTrack(track: Track) {
    this.tracks.push(track);
  }

  removeTrack(id: number) {
    this.tracks = this.tracks.filter(track => track.id !== id);
  }
}
