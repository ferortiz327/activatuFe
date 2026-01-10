import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MusicPlayerService, } from 'app/services/music-player.service';


interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover?: string;
  duration: number;
  isLive?: boolean;
  startTime?: string;
}
@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('volumeBar') volumeBar!: ElementRef<HTMLDivElement>;

  // Estado del reproductor - INICIA CERRADO (versión pequeña)
  isPlayerOpen = false;
  isPlaying = false;
  isMuted = false;
  currentTrackIndex = 0;
  currentTrack: Track | null = null;
  volume = 0.7;
  currentTime = 0;
  duration = 0;

  // Estado de la emisora
  listenersCount = Math.floor(Math.random() * 1000) + 500;
  currentPreset = 0;
  signalStrength = 85;
  broadcastStartTime = new Date();

  // Filtros
  filter: 'all' | 'live' | 'upcoming' = 'all';

  // Lista de audios desde el servicio
  tracks: Track[] = [];

  // Presets de frecuencia
  presets = [
    { frequency: 'FM 96.7', name: 'ATF Principal' },
    { frequency: 'FM 88.5', name: 'ATF Clásica' },
    { frequency: 'FM 102.3', name: 'ATF Juvenil' },
    { frequency: 'FM 94.1', name: 'ATF Oración' }
  ];

  // Variables para arrastre de volumen
  private isVolumeDragging = false;

  constructor(private musicPlayerService: MusicPlayerService) {}

  ngOnInit() {
    console.log('🚀 Radio Station iniciando...');

    // Obtener tracks desde el servicio
    this.tracks = this.musicPlayerService.getTracks();
    console.log('🎵 Tracks cargados:', this.tracks.length);

    // Obtener configuración del servicio
    const config = this.musicPlayerService.getPlayerConfig();
    this.volume = config.volume;
    console.log('⚙️ Configuración:', config);

    // Cargar estado del reproductor desde localStorage
    this.loadPlayerState();

    // Inicializar con la primera canción
    if (this.tracks.length > 0) {
      this.currentTrack = this.tracks[this.currentTrackIndex];
      console.log('🎵 Track actual:', this.currentTrack.title);
    }

    // Actualizar número de oyentes periódicamente
    this.startListenersUpdate();
  }

  ngAfterViewInit() {
    console.log('✅ AfterViewInit ejecutado');

    // Configurar eventos de audio
    this.setupAudioEvents();

    // Cargar el primer track pero NO reproducir automáticamente
    if (this.tracks.length > 0 && this.currentTrack) {
      setTimeout(() => {
        this.loadAudio();
      }, 500);
    }
  }

  setupAudioEvents() {
    console.log('🔧 Configurando eventos de audio...');

    const audio = this.audioPlayer.nativeElement;

    audio.addEventListener('timeupdate', () => {
      this.currentTime = audio.currentTime;
      this.duration = audio.duration || 0;
    });

    audio.addEventListener('loadedmetadata', () => {
      console.log('📊 Metadatos cargados, duración:', this.formatTime(audio.duration));
    });

    audio.addEventListener('play', () => {
      console.log('▶️ Audio empezó a reproducirse');
      this.isPlaying = true;
      this.broadcastStartTime = new Date();
    });

    audio.addEventListener('pause', () => {
      console.log('⏸️ Audio pausado');
      this.isPlaying = false;
    });

    audio.addEventListener('ended', () => {
      console.log('🔚 Audio terminado');
      this.playNext();
    });

    audio.addEventListener('error', (e) => {
      console.error('❌ ERROR de audio:', audio.error?.message);
      console.log('📁 Ruta intentada:', audio.src);
    });
  }

  // Botón principal para abrir/cerrar panel
  togglePlayer() {
    console.log('🔄 Toggle player, estado actual:', this.isPlayerOpen);
    this.isPlayerOpen = !this.isPlayerOpen;
  }

  // Solo cerrar el panel (volver a versión pequeña)
  closePlayer() {
    console.log('❌ Cerrando panel, volviendo a versión pequeña');
    this.isPlayerOpen = false;
    // LA MÚSICA SIGUE REPRODUCIÉNDOSE si estaba sonando
  }

  // Toggle Play/Pause - FUNCIONA EN AMBAS VERSIONES
  togglePlay() {
    console.log('🎮 Toggle play, estado actual:', this.isPlaying);

    if (this.tracks.length === 0) {
      console.warn('⚠️ No hay tracks disponibles');
      return;
    }

    const audio = this.audioPlayer.nativeElement;

    if (!this.currentTrack) {
      // Si no hay track actual, cargar el primero
      this.currentTrackIndex = 0;
      this.currentTrack = this.tracks[0];
      this.loadAudio();
    }

    if (this.isPlaying) {
      // Pausar
      audio.pause();
      console.log('⏸️ Audio pausado');
    } else {
      // Reproducir
      if (!audio.src || audio.src === '' || audio.src.includes('undefined')) {
        console.log('📥 Cargando audio antes de reproducir...');
        this.loadAudio();
      }

      console.log('▶️ Intentando reproducir...');
      audio.play().then(() => {
        console.log('✅ Audio reproducido con éxito');
        // El evento 'play' ya cambia isPlaying a true
      }).catch(error => {
        console.error('❌ Error al reproducir:', error);
        // Reintentar cargando de nuevo
        this.loadAudio();
        setTimeout(() => {
          audio.play().then(() => {
            console.log('✅ Audio reproducido en segundo intento');
          }).catch(err => {
            console.error('❌ Error persistente:', err);
            alert('No se pudo reproducir el audio. Verifica la ruta del archivo.');
          });
        }, 500);
      });
    }
  }

  loadAudio() {
    if (!this.currentTrack) return;

    const audio = this.audioPlayer.nativeElement;

    try {
      console.log('📥 Cargando audio:', this.currentTrack.title);
      console.log('📍 Ruta:', this.currentTrack.src);

      // Configurar audio
      audio.src = this.currentTrack.src;
      audio.volume = this.volume;
      audio.muted = this.isMuted;

      // Cargar
      audio.load();
      console.log('✅ Audio cargado correctamente');

    } catch (error) {
      console.error('❌ Error cargando audio:', error);
    }
  }

  playTrack(index: number) {
    console.log('🎯 playTrack llamado con índice:', index);

    if (index < 0 || index >= this.tracks.length) {
      console.error('❌ Índice inválido:', index);
      return;
    }

    this.currentTrackIndex = index;
    this.currentTrack = this.tracks[index];

    console.log('🔄 Cambiando a track:', this.currentTrack.title);

    // Detener reproducción actual si hay
    if (this.isPlaying) {
      this.audioPlayer.nativeElement.pause();
      this.isPlaying = false;
    }

    // Cargar nuevo audio
    this.loadAudio();

    // Reproducir después de cargar
    setTimeout(() => {
      const audio = this.audioPlayer.nativeElement;
      audio.play().then(() => {
        console.log('✅ Nuevo track reproducido');
      }).catch(error => {
        console.error('❌ Error reproduciendo nuevo track:', error);
      });
    }, 300);
  }

  playNext() {
    console.log('⏭️ playNext llamado');
    const nextIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.playTrack(nextIndex);
  }

  playPrevious() {
    console.log('⏮️ playPrevious llamado');
    const prevIndex = this.currentTrackIndex === 0 ? this.tracks.length - 1 : this.currentTrackIndex - 1;
    this.playTrack(prevIndex);
  }

  toggleMute() {
    console.log('🔇 toggleMute llamado');
    this.isMuted = !this.isMuted;
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.muted = this.isMuted;
      console.log('🔊 Mute:', this.isMuted ? 'ON 🔊' : 'OFF 🔈');
    }
  }

  setVolume(event: MouseEvent) {
    if (!this.volumeBar || !this.audioPlayer) return;

    const volumeBar = this.volumeBar.nativeElement;
    const rect = volumeBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;

    let newVolume = clickX / width;
    newVolume = Math.max(0, Math.min(1, newVolume));

    this.volume = newVolume;
    this.isMuted = newVolume === 0;

    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.volume = newVolume;
      this.audioPlayer.nativeElement.muted = this.isMuted;
    }

    // Actualizar configuración en el servicio
    this.musicPlayerService.updateConfig({ volume: newVolume });

    console.log('🔊 Volumen cambiado a:', Math.round(newVolume * 100) + '%');
  }

  startVolumeDragging() {
    console.log('🎚️ Iniciando arrastre de volumen');
    this.isVolumeDragging = true;
  }

  // Sintonizador de frecuencia
  tuneUp() {
    console.log('📻 Subiendo frecuencia');
    this.currentPreset = (this.currentPreset + 1) % this.presets.length;
    this.signalStrength = 70 + Math.random() * 30;
  }

  tuneDown() {
    console.log('📻 Bajando frecuencia');
    this.currentPreset = this.currentPreset === 0 ? this.presets.length - 1 : this.currentPreset - 1;
    this.signalStrength = 70 + Math.random() * 30;
  }

  // Métodos auxiliares
  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  formatBroadcastTime(): string {
    const now = new Date();
    const diff = Math.floor((now.getTime() - this.broadcastStartTime.getTime()) / 1000);
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }

  getCurrentSchedule(): string {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) return 'Mañana';
    if (hour < 18) return 'Tarde';
    return 'Noche';
  }

  getProgramTime(index: number): string {
    const hour = 6 + (index * 2);
    const formattedHour = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${formattedHour}:00 ${ampm}`;
  }

  isLiveProgram(track: Track): boolean {
    return this.currentTrackIndex === this.tracks.indexOf(track) && this.isPlaying;
  }

  getFilteredTracks(): Track[] {
    switch (this.filter) {
      case 'live':
        return this.isPlaying && this.currentTrack ? [this.currentTrack] : [];
      case 'upcoming':
        return this.tracks.filter((track, index) => index !== this.currentTrackIndex);
      default:
        return this.tracks;
    }
  }

  getRadioInfo(): string {
    return `Emisora ATF - ${this.listenersCount} oyentes en línea`;
  }

  shareStation() {
    const text = `¡Escucha la Emisora ATF en línea! ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('🎉 Enlace copiado al portapapeles');
    });
  }

  // Guardar/cargar estado
  savePlayerState() {
    const state = {
      currentTrackIndex: this.currentTrackIndex,
      volume: this.volume,
      isMuted: this.isMuted,
      isPlaying: this.isPlaying
    };
    localStorage.setItem('radioStationState', JSON.stringify(state));
    console.log('💾 Estado guardado');
  }

  loadPlayerState() {
    const saved = localStorage.getItem('radioStationState');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        this.currentTrackIndex = state.currentTrackIndex || 0;
        this.volume = state.volume || 0.7;
        this.isMuted = state.isMuted || false;
        this.isPlaying = state.isPlaying || false;
        console.log('📂 Estado cargado:', state);
      } catch (e) {
        console.error('❌ Error cargando estado:', e);
      }
    }
  }

  startListenersUpdate() {
    setInterval(() => {
      const change = Math.floor(Math.random() * 21) - 10;
      this.listenersCount = Math.max(100, this.listenersCount + change);
    }, 30000);
  }

  // Eventos del mouse para volumen
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isVolumeDragging) {
      this.setVolume(event);
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isVolumeDragging = false;
  }

  // Atajos de teclado - FUNCIONAN EN AMBAS VERSIONES
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Los controles funcionan aunque el panel esté cerrado
    switch (event.key) {
      case ' ':
      case 'Spacebar':
        event.preventDefault();
        this.togglePlay();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.playNext();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.playPrevious();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.volume = Math.min(1, this.volume + 0.1);
        if (this.audioPlayer) {
          this.audioPlayer.nativeElement.volume = this.volume;
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.volume = Math.max(0, this.volume - 0.1);
        if (this.audioPlayer) {
          this.audioPlayer.nativeElement.volume = this.volume;
        }
        break;
      case 'm':
      case 'M':
        event.preventDefault();
        this.toggleMute();
        break;
      case 'Escape':
        if (this.isPlayerOpen) {
          this.closePlayer();
        }
        break;
    }
  }

  // Para depuración: método para ver estado actual
  debugState() {
    console.log('=== ESTADO ACTUAL ===');
    console.log('isPlayerOpen:', this.isPlayerOpen);
    console.log('isPlaying:', this.isPlaying);
    console.log('currentTrack:', this.currentTrack?.title);
    console.log('volume:', this.volume);
    console.log('isMuted:', this.isMuted);
    console.log('=====================');
  }
}
