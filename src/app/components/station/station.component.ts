import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';



interface Program {
  id: number;
  title: string;
  description: string;
  host: string;
  artist: string;
  category: string;
  duration: string;
  date: string;
  plays: number;
  image: string;
  audioUrl: string;
}


interface Playlist {
  id: number;
  name: string;
  description: string;
  image: string;
  trackCount: number;
  duration: string;
}

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {


  activeTrendingIndex = 0;
  @ViewChild('trendingTrack') trendingTrack!: ElementRef;

  searchTerm = '';
  // Estado del reproductor
  isPlaying = false;
  playerMinimized = false;
  currentTrack: Program | null = null;
  progress = 0;
  currentTime = '0:00';
  duration = '0:00';
  volume = 80;

  // Datos de ejemplo
  featuredPrograms: Program[] = [
    {
      id: 1,
      title: 'Alabanza Matutina',
      description: 'Comienza tu día con las mejores alabanzas...',
      host: 'Pastor Juan Martínez',
      artist: 'Pastor Juan Martínez', // ← Agrega esta línea
      category: 'alabanza',
      duration: '2:00:00',
      date: '2024-01-15',
      plays: 1245,
      image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
      audioUrl: 'assets/audio/alabanza-matutina.mp3'
    },
    {
      id: 2,
      title: 'Estudio Bíblico Profundo',
      description: 'Análisis detallado de los libros de la Biblia con aplicaciones prácticas para la vida diaria.',
      host: 'Hermana María González',
      artist: 'Pastor Juan Martínez',
      category: 'enseñanza',
      duration: '1:30:00',
      date: '2024-01-14',
      plays: 892,
      image: 'https://images.unsplash.com/photo-1497621122273-f5cfb6065c56?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1548',
      audioUrl: 'assets/audio/estudio-biblico.mp3'
    },
    {
      id: 3,
      title: 'Testimonios de Fe',
      description: 'Historias reales de transformación y milagros en la vida de nuestros hermanos de la comunidad.',
      host: 'Hno. Carlos Rodríguez',
      artist: 'Pastor Juan Martínez',
      category: 'testimonio',
      duration: '45:00',
      date: '2024-01-13',
      plays: 567,
      image: 'https://images.unsplash.com/photo-1489568685157-ec3bcd451894?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=770',
      audioUrl: 'assets/audio/testimonios.mp3'
    }
  ];

  // En station.component.ts - actualiza las categorías
  categories = [
    { id: 'all', name: 'Todos', icon: 'apps' },
    { id: 'alabanza', name: 'Alabanza', icon: 'music_note' },
    { id: 'enseñanza', name: 'Enseñanza', icon: 'menu_book' },
    { id: 'testimonio', name: 'Testimonio', icon: 'mic' },
    { id: 'oracion', name: 'Oración', icon: 'favorite' }
  ];

  activeCategory = 'all';
  filteredPrograms: Program[] = [];

  playlists: Playlist[] = [
    {
      id: 1,
      name: 'Alabanzas de Restauración',
      description: 'Canciones que sanan el alma y renuevan la fe',
      image: 'https://images.unsplash.com/photo-1570786032462-2efc3ca8fccd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
      trackCount: 12,
      duration: '1:15:00'
    },
    {
      id: 2,
      name: 'Enseñanzas para la Vida',
      description: 'Mensajes prácticos para el diario vivir',
      image: 'https://images.unsplash.com/photo-1505816014357-96b5ff457e9a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2066',
      trackCount: 8,
      duration: '2:30:00'
    },
    {
      id: 3,
      name: 'Oración y Meditación',
      description: 'Momento de quietud y conexión espiritual',
      image: 'https://images.unsplash.com/photo-1437603568260-1950d3ca6eab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
      trackCount: 6,
      duration: '45:00'
    },
    {
      id: 4,
      name: 'Testimonios de Milagros',
      description: 'Historias que fortalecen la fe',
      image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
      trackCount: 10,
      duration: '1:20:00'
    }
  ];

  ngOnInit() {
    this.filteredPrograms = [...this.featuredPrograms];
    // Simular más programas
    this.generateSamplePrograms();
  }

  generateSamplePrograms() {
    const samplePrograms: Program[] = [
      {
        id: 4,
        title: 'Oración Vespertina',
        description: 'Momento de oración comunitaria al final del día',
        host: 'Pastor Juan Martínez',
        artist: 'Pastor Juan Martínez',
        category: 'oracion',
        duration: '30:00',
        date: '2024-01-12',
        plays: 432,
        image: 'https://plus.unsplash.com/premium_photo-1668198444521-46fe6417ff1e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774',
        audioUrl: 'assets/audio/oracion-vespertina.mp3'
      },
      {
        id: 5,
        title: 'Juventud en Acción',
        description: 'Programa especial para los jóvenes de la comunidad',
        host: 'Hno. David López',
        artist: 'Pastor Juan Martínez',
        category: 'enseñanza',
        duration: '1:15:00',
        date: '2024-01-11',
        plays: 321,
        image: 'http://images.unsplash.com/photo-1593896385987-16bcbf9451e5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1994',
        audioUrl: 'assets/audio/juventud.mp3'
      }
    ];

    this.featuredPrograms.push(...samplePrograms);
    this.filteredPrograms = [...this.featuredPrograms];
  }

  // Control del reproductor
  togglePlay() {
    this.isPlaying = !this.isPlaying;
    // Aquí iría la lógica real de reproducción de audio
  }

  playProgram(program: Program) {
    this.currentTrack = program;
    this.isPlaying = true;
    // Simular reproducción
    this.progress = 0;
    this.currentTime = '0:00';
    this.duration = program.duration;
  }

  togglePlayer() {
    this.playerMinimized = !this.playerMinimized;
  }

  previousTrack() {
    // Lógica para track anterior
  }

  nextTrack() {
    // Lógica para siguiente track
  }

  seekAudio(event: any) {
    // Lógica para buscar en el audio
  }

  toggleMute() {
    // Lógica para silenciar
  }

  changeVolume() {
    // Lógica para cambiar volumen
  }


  // Acciones de usuario
  addToFavorites(program: Program) {
    // Lógica para agregar a favoritos
    console.log('Agregado a favoritos:', program.title);
  }

  shareProgram(program: Program) {
    // Lógica para compartir
    console.log('Compartir programa:', program.title);
  }

  downloadProgram(program: Program) {
    // Lógica para descargar
    console.log('Descargar programa:', program.title);
  }


  // Métodos para el carousel de tendencias
  nextTrending(): void {
    if (this.featuredPrograms.length > 0) {
      this.activeTrendingIndex = (this.activeTrendingIndex + 1) % this.featuredPrograms.length;
      this.scrollToTrending();
    }
  }

  prevTrending(): void {
    if (this.featuredPrograms.length > 0) {
      this.activeTrendingIndex = (this.activeTrendingIndex - 1 + this.featuredPrograms.length) % this.featuredPrograms.length;
      this.scrollToTrending();
    }
  }

  private scrollToTrending(): void {
    if (this.trendingTrack) {
      const track = this.trendingTrack.nativeElement;
      const cardWidth = 400; // Ancho aproximado de cada card
      track.scrollTo({
        left: this.activeTrendingIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }

  // Método para búsqueda
  onSearch(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.applyFilters();
  }

  // Método para contar programas por categoría
  getCategoryCount(categoryId: string): number {
    if (categoryId === 'all') {
      return this.featuredPrograms.length;
    }
    return this.featuredPrograms.filter(program => program.category === categoryId).length;
  }

  // Método unificado para aplicar filtros
  private applyFilters(): void {
    let filtered = [...this.featuredPrograms];

    // Filtro por categoría
    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(program => program.category === this.activeCategory);
    }

    // Filtro por búsqueda
    if (this.searchTerm) {
      filtered = filtered.filter(program =>
        program.title.toLowerCase().includes(this.searchTerm) ||
        program.description.toLowerCase().includes(this.searchTerm) ||
        program.host.toLowerCase().includes(this.searchTerm)
      );
    }

    this.filteredPrograms = filtered;
  }

  // Actualizar el método filterByCategory para usar applyFilters
  filterByCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.applyFilters();
  }

  // Actualizar el método sortPrograms
  sortPrograms(event: any): void {
    const sortBy = event.target.value;

    switch (sortBy) {
      case 'newest':
        this.filteredPrograms.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'popular':
        this.filteredPrograms.sort((a, b) => b.plays - a.plays);
        break;
      case 'duration':
        this.filteredPrograms.sort((a, b) => this.durationToSeconds(a.duration) - this.durationToSeconds(b.duration));
        break;
    }
  }

  // ... el resto de tus métodos existentes (togglePlay, playProgram, etc.)

  // Método auxiliar para convertir duración a segundos
  private durationToSeconds(duration: string): number {
    const parts = duration.split(':');
    if (parts.length === 2) {
      return +parts[0] * 60 + +parts[1];
    } else if (parts.length === 3) {
      return +parts[0] * 3600 + +parts[1] * 60 + +parts[2];
    }
    return 0;
  }

  // Métodos adicionales para las nuevas funcionalidades
  playPlaylist(playlist: any): void {
    console.log('Reproduciendo playlist:', playlist.name);
    // Aquí iría la lógica para reproducir la playlist
  }
}