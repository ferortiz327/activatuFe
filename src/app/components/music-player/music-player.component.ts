import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MusicPlayerService, Track } from 'app/services/music-player.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;
  @ViewChild('volumeBar') volumeBar!: ElementRef<HTMLDivElement>;

  tracks: Track[] = [];
  currentTrack: Track | null = null;
  currentTrackIndex = 0;
  isPlaying = false;
  isPlayerOpen = false;
  volume = 0.7;
  currentTime = 0;
  duration = 0;
  progress = 0;
  isDragging = false;
  isVolumeDragging = false;
  autoplay = true;

  constructor(private musicPlayerService: MusicPlayerService) {}

  ngOnInit() {
    this.tracks = this.musicPlayerService.getTracks();
    const config = this.musicPlayerService.getPlayerConfig();
    this.volume = config.volume;
    this.autoplay = config.autoplay;

    // Cargar estado guardado
    this.loadPlayerState();

    if (this.autoplay && this.tracks.length > 0) {
      setTimeout(() => {
        this.playTrack(0);
      }, 3000);
    }
  }

  ngAfterViewInit() {
    this.setupAudioEvents();
  }

  ngOnDestroy() {
    this.savePlayerState();
  }

  setupAudioEvents() {
    const audio = this.audioPlayer.nativeElement;

    audio.addEventListener('timeupdate', () => {
      this.currentTime = audio.currentTime;
      this.duration = audio.duration || 0;
      this.progress = (this.currentTime / this.duration) * 100 || 0;
    });

    audio.addEventListener('ended', () => {
      this.playNext();
    });

    audio.addEventListener('loadedmetadata', () => {
      this.duration = audio.duration;
    });
  }

  togglePlayer() {
    this.isPlayerOpen = !this.isPlayerOpen;
  }

  playTrack(index: number) {
    this.currentTrackIndex = index;
    this.currentTrack = this.tracks[index];

    const audio = this.audioPlayer.nativeElement;
    audio.src = this.currentTrack.src;
    audio.volume = this.volume;

    audio.load();
    audio.play().then(() => {
      this.isPlaying = true;
    }).catch(error => {
      console.error('Error al reproducir:', error);
      // En algunos navegadores necesitas interacción del usuario
      this.isPlaying = false;
    });
  }

  togglePlay() {
    const audio = this.audioPlayer.nativeElement;

    if (this.isPlaying) {
      audio.pause();
    } else {
      if (!this.currentTrack) {
        this.playTrack(0);
      } else {
        audio.play();
      }
    }

    this.isPlaying = !this.isPlaying;
  }

  playNext() {
    let nextIndex = this.currentTrackIndex + 1;
    if (nextIndex >= this.tracks.length) {
      nextIndex = 0;
    }
    this.playTrack(nextIndex);
  }

  playPrevious() {
    let prevIndex = this.currentTrackIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.tracks.length - 1;
    }
    this.playTrack(prevIndex);
  }

  setVolume(event: MouseEvent) {
    if (!this.isVolumeDragging) return;

    const volumeBar = this.volumeBar.nativeElement;
    const rect = volumeBar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    let newVolume = x / width;

    newVolume = Math.max(0, Math.min(1, newVolume));
    this.volume = newVolume;

    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.volume = newVolume;
    }
  }

  seek(event: MouseEvent) {
    if (!this.isDragging) return;

    const progressBar = this.progressBar.nativeElement;
    const rect = progressBar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;

    if (this.audioPlayer && this.duration) {
      this.audioPlayer.nativeElement.currentTime = percentage * this.duration;
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  savePlayerState() {
    const state = {
      currentTrackIndex: this.currentTrackIndex,
      volume: this.volume,
      currentTime: this.currentTime,
      isPlaying: this.isPlaying
    };
    localStorage.setItem('musicPlayerState', JSON.stringify(state));
  }

  loadPlayerState() {
    const saved = localStorage.getItem('musicPlayerState');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        this.currentTrackIndex = state.currentTrackIndex || 0;
        this.volume = state.volume || 0.7;
        this.currentTime = state.currentTime || 0;

        if (state.isPlaying && this.autoplay) {
          this.isPlaying = true;
        }
      } catch (e) {
        console.error('Error cargando estado:', e);
      }
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.seek(event);
    }
    if (this.isVolumeDragging) {
      this.setVolume(event);
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
    this.isVolumeDragging = false;
  }

  startDragging() {
    this.isDragging = true;
  }

  startVolumeDragging() {
    this.isVolumeDragging = true;
  }

}
