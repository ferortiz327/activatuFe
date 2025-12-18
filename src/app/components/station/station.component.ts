import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

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
  styleUrls: ['./station.component.scss'],
})

 export class StationComponent implements OnInit, AfterViewInit, OnDestroy {
  // ==================== PROPIEDADES DEL COMPONENTE ====================

  // Propiedad featuredPrograms - AQUÍ ESTÁ LA QUE FALTABA
  featuredPrograms: Program[] = [
    {
      id: 1,
      title: 'Alabanza Matutina',
      description: 'Comienza tu día con las mejores alabanzas...',
      host: 'Pastor Juan Martínez',
      artist: 'Pastor Juan Martínez',
      category: 'alabanza',
      duration: '2:00:00',
      date: '2024-01-15',
      plays: 1245,
      image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
      audioUrl: 'assets/audio/alabanza-matutina.mp3',
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
      audioUrl: 'assets/audio/estudio-biblico.mp3',
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
      audioUrl: 'assets/audio/testimonios.mp3',
    },
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
      audioUrl: 'assets/audio/oracion-vespertina.mp3',
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
      audioUrl: 'assets/audio/juventud.mp3',
    }
  ];

  // Otras propiedades del componente
  activeTrendingIndex = 0;
  @ViewChild('trendingTrack') trendingTrack!: ElementRef;

  searchTerm = '';
  isPlaying = false;
  playerMinimized = false;
  currentTrack: Program | null = null;
  progress = 0;
  currentTime = '0:00';
  duration = '0:00';
  volume = 80;

  // Control del modal
  isModalActive = false;
  private modalCheckInterval: any;

  // Categorías
  categories = [
    { id: 'all', name: 'Todos', icon: 'apps' },
    { id: 'alabanza', name: 'Alabanza', icon: 'music_note' },
    { id: 'enseñanza', name: 'Enseñanza', icon: 'menu_book' },
    { id: 'testimonio', name: 'Testimonio', icon: 'mic' },
    { id: 'oracion', name: 'Oración', icon: 'favorite' }
  ];

  activeCategory = 'all';
  filteredPrograms: Program[] = [];

  // Playlists
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

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  // ==================== CICLO DE VIDA ====================

  ngOnInit() {
    console.log('🎵 Station Component Initializing...');

    // Inicializar datos
    this.filteredPrograms = [...this.featuredPrograms];

    // Configurar convivencia con el modal
    this.setupModalCoexistence();

    // Asegurar visibilidad del componente
    this.ensureComponentVisibility();
  }

  ngAfterViewInit() {
    // Verificar estado del modal después de renderizar
    setTimeout(() => {
      this.checkModalState();
      this.setupModalListeners();
    }, 500);
  }

  ngOnDestroy() {
    // Limpiar recursos
    if (this.modalCheckInterval) {
      clearInterval(this.modalCheckInterval);
    }
    console.log('🎵 Station Component Destroyed');
  }

  // ==================== CONVIVENCIA CON MODAL ====================

  private setupModalCoexistence(): void {
    console.log('🤝 Setting up modal coexistence...');

    // Ajustar el modal para convivencia
    this.adjustModalForCoexistence();

    // Configurar monitoreo periódico
    this.modalCheckInterval = setInterval(() => {
      this.monitorModalState();
    }, 2000);
  }

  private adjustModalForCoexistence(): void {
    const actividadModal = document.querySelector('.modal-actividades');

    if (actividadModal) {
      console.log('🎯 Modal de actividades encontrado, ajustando...');

      // Ajustar z-index para convivencia
      this.renderer.setStyle(actividadModal, 'z-index', '100');

      // Nuestro componente debe estar por encima
      const wrapper = this.elementRef.nativeElement.querySelector('.wrapper');
      if (wrapper) {
        this.renderer.setStyle(wrapper, 'z-index', '101');
      }

      // Ajustar backdrop
      const modalBackdrop = document.querySelector('.modal-backdrop, .backdrop');
      if (modalBackdrop) {
        this.renderer.setStyle(modalBackdrop, 'background-color', 'rgba(0, 0, 0, 0.5)');
        this.renderer.setStyle(modalBackdrop, 'z-index', '99');
      }

      this.isModalActive = true;
    }
  }

  private ensureComponentVisibility(): void {
    const wrapper = this.elementRef.nativeElement.querySelector('.wrapper');
    if (wrapper) {
      this.renderer.setStyle(wrapper, 'opacity', '1');
      this.renderer.setStyle(wrapper, 'visibility', 'visible');
      this.renderer.setStyle(wrapper, 'z-index', '1000');
    }
  }

  private checkModalState(): void {
    const actividadModal = document.querySelector('.modal-actividades');

    if (actividadModal && actividadModal.classList.contains('show')) {
      console.log('✅ Modal de actividades está activo');
      this.isModalActive = true;
      this.adjustActiveModalStyles();
    } else {
      this.isModalActive = false;
    }
  }

  private adjustActiveModalStyles(): void {
    const actividadModal = document.querySelector('.modal-actividades');
    if (actividadModal) {
      // Hacer el modal más pequeño y moverlo a una esquina
      this.renderer.setStyle(actividadModal, 'max-width', '400px');
      this.renderer.setStyle(actividadModal, 'max-height', '300px');
      this.renderer.setStyle(actividadModal, 'top', '20px');
      this.renderer.setStyle(actividadModal, 'right', '20px');
      this.renderer.setStyle(actividadModal, 'left', 'auto');
      this.renderer.setStyle(actividadModal, 'transform', 'none');
      this.renderer.setStyle(actividadModal, 'margin', '0');
    }
  }

  private setupModalListeners(): void {
    const closeButtons = document.querySelectorAll(
      '.modal-actividades .btn-close, .modal-actividades [data-bs-dismiss="modal"]'
    );

    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        console.log('🚪 Modal de actividades cerrado');
        this.isModalActive = false;
      });
    });
  }

  private monitorModalState(): void {
    const actividadModal = document.querySelector('.modal-actividades');
    const isCurrentlyActive = actividadModal &&
                              actividadModal.classList.contains('show');

    if (isCurrentlyActive !== this.isModalActive) {
      this.isModalActive = isCurrentlyActive;
      if (isCurrentlyActive) {
        this.adjustActiveModalStyles();
      }
    }
  }

  // Método público para cerrar el modal
  closeActivitiesModal(): void {
    const actividadModal = document.querySelector('.modal-actividades');
    if (actividadModal) {
      actividadModal.classList.remove('show');
      this.renderer.setStyle(actividadModal, 'display', 'none');

      const backdrops = document.querySelectorAll('.modal-backdrop, .backdrop');
      backdrops.forEach(backdrop => backdrop.remove());

      this.renderer.removeClass(document.body, 'modal-open');

      console.log('✅ Modal cerrado manualmente');
      this.isModalActive = false;
    }
  }

  // ==================== MÉTODOS DEL REPRODUCTOR ====================

  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }

  playProgram(program: Program) {
    this.currentTrack = program;
    this.isPlaying = true;
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

  // ==================== MÉTODOS DE INTERACCIÓN ====================

  addToFavorites(program: Program) {
    console.log('Agregado a favoritos:', program.title);
  }

  shareProgram(program: Program) {
    console.log('Compartir programa:', program.title);
  }

  downloadProgram(program: Program) {
    console.log('Descargar programa:', program.title);
  }

  // ==================== MÉTODOS DE CAROUSEL ====================

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
      const cardWidth = 400;
      track.scrollTo({
        left: this.activeTrendingIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  }

  // ==================== MÉTODOS DE BÚSQUEDA Y FILTROS ====================

  onSearch(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.applyFilters();
  }

  getCategoryCount(categoryId: string): number {
    if (categoryId === 'all') {
      return this.featuredPrograms.length;
    }
    return this.featuredPrograms.filter(
      (program) => program.category === categoryId
    ).length;
  }

  private applyFilters(): void {
    let filtered = [...this.featuredPrograms];

    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(
        (program) => program.category === this.activeCategory
      );
    }

    if (this.searchTerm) {
      filtered = filtered.filter(
        (program) =>
          program.title.toLowerCase().includes(this.searchTerm) ||
          program.description.toLowerCase().includes(this.searchTerm) ||
          program.host.toLowerCase().includes(this.searchTerm)
      );
    }

    this.filteredPrograms = filtered;
  }

  filterByCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.applyFilters();
  }

  sortPrograms(event: any): void {
    const sortBy = event.target.value;

    switch (sortBy) {
      case 'newest':
        this.filteredPrograms.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case 'popular':
        this.filteredPrograms.sort((a, b) => b.plays - a.plays);
        break;
      case 'duration':
        this.filteredPrograms.sort(
          (a, b) => this.durationToSeconds(a.duration) - this.durationToSeconds(b.duration)
        );
        break;
    }
  }

  // ==================== MÉTODOS AUXILIARES ====================

  private durationToSeconds(duration: string): number {
    const parts = duration.split(':');
    if (parts.length === 2) {
      return +parts[0] * 60 + +parts[1];
    } else if (parts.length === 3) {
      return +parts[0] * 3600 + +parts[1] * 60 + +parts[2];
    }
    return 0;
  }

  playPlaylist(playlist: Playlist): void {
    console.log('Reproduciendo playlist:', playlist.name);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isModalActive) {
      this.adjustActiveModalStyles();
    }
  }
}
