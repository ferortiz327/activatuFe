import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MinistriesService } from 'app/services/ministries.service';



@Component({
  selector: 'app-ministries-form',
  templateUrl: './ministries-form.component.html',
  styleUrls: ['./ministries-form.component.scss']
})
export class MinistriesFormComponent implements OnInit {
  ministryForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  ministries: any[] = [];
  spiritualGifts: string[] = [];
  musicalInstruments: string[] = [];
  technicalSkills: string[] = [];
  danceExperienceLevels: string[] = [];
  commitmentLevels: any[] = [];

  selectedMinistries: any[] = [];
  selectedGifts: string[] = [];
  selectedInstruments: string[] = [];
  selectedSkills: string[] = [];

  showMusicalSection = false;
  showDanceSection = false;
  showTechnicalSection = false;

  constructor(
    private fb: FormBuilder,
    private ministriesService: MinistriesService
  ) {
    this.ministryForm = this.createForm();
  }

  ngOnInit() {
    this.ministries = this.ministriesService.getMinistries();
    this.spiritualGifts = this.ministriesService.getSpiritualGifts();
    this.musicalInstruments = this.ministriesService.getMusicalInstruments();
    this.technicalSkills = this.ministriesService.getTechnicalSkills();
    this.danceExperienceLevels = this.ministriesService.getDanceExperienceLevels();
    this.commitmentLevels = this.ministriesService.getCommitmentLevels();
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Información personal
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{10,}$/)]],
      age: ['', [Validators.required, Validators.min(15), Validators.max(80)]],

      // Membresía
      churchMember: [false, Validators.requiredTrue],
      memberTime: ['', Validators.required],

      // Ministerios seleccionados
      selectedMinistries: this.fb.array([], [Validators.required, Validators.minLength(1)]),

      // Dones espirituales
      spiritualGifts: this.fb.array([]),

      // Música (si aplica)
      musicalInstruments: this.fb.array([]),
      musicalExperience: [''],

      // Danza (si aplica)
      danceExperience: [''],

      // Técnico (si aplica)
      technicalSkills: this.fb.array([]),
      otherTechnicalSkills: [''],

      // Disponibilidad
      availability: this.fb.group({
        rehearsals: [false],
        services: [false],
        events: [false],
        specialEvents: [false]
      }),

      // Compromiso
      commitmentLevel: ['', Validators.required],

      // Experiencia y testimonio
      experience: ['', [Validators.required, Validators.minLength(30)]],
      testimony: ['', [Validators.required, Validators.minLength(50)]],

      // Recomendación
      pastorRecommendation: [''],

      // Contacto de emergencia
      emergencyContact: this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        relationship: ['', Validators.required]
      }),

      // Acuerdos
      termsAgreed: [false, Validators.requiredTrue],
      privacyAgreed: [false, Validators.requiredTrue]
    });

    // Actualizar validaciones según si es miembro
    this.ministryForm.get('churchMember')?.valueChanges.subscribe(isMember => {
      const memberTimeControl = this.ministryForm.get('memberTime');
      if (isMember) {
        memberTimeControl?.setValidators([Validators.required]);
      } else {
        memberTimeControl?.clearValidators();
      }
      memberTimeControl?.updateValueAndValidity();
    });
  }

  // Métodos helper
  isMinistrySelected(ministryId: string): boolean {
    return this.selectedMinistries.some(ministry => ministry.id === ministryId);
  }

  isGiftSelected(gift: string): boolean {
    return this.selectedGifts.includes(gift);
  }

  isInstrumentSelected(instrument: string): boolean {
    return this.selectedInstruments.includes(instrument);
  }

  isSkillSelected(skill: string): boolean {
    return this.selectedSkills.includes(skill);
  }

  isCommitmentSelected(levelId: string): boolean {
    return this.ministryForm.get('commitmentLevel')?.value === levelId;
  }

  isAvailabilitySelected(type: string): boolean {
    return this.ministryForm.get(`availability.${type}`)?.value || false;
  }

  // Manejo de ministerios
  onMinistryChange(event: any, ministryId: string) {
    const ministriesArray = this.ministryForm.get('selectedMinistries') as FormArray;
    const ministry = this.ministries.find(m => m.id === ministryId);

    if (event.target.checked) {
      ministriesArray.push(this.fb.control(ministryId));
      this.selectedMinistries.push(ministry);

      // Mostrar/ocultar secciones según ministerio
      this.updateSectionVisibility();
    } else {
      const index = ministriesArray.controls.findIndex(x => x.value === ministryId);
      ministriesArray.removeAt(index);
      this.selectedMinistries = this.selectedMinistries.filter(m => m.id !== ministryId);

      this.updateSectionVisibility();
    }
  }

  // Actualizar visibilidad de secciones
  updateSectionVisibility() {
    this.showMusicalSection = this.selectedMinistries.some(m =>
      m.id === 'alabanza' || m.id === 'danzas'
    );

    this.showDanceSection = this.selectedMinistries.some(m => m.id === 'danzas');

    this.showTechnicalSection = this.selectedMinistries.some(m =>
      m.id === 'audiovisuales'
    );
  }

  // Manejo de dones espirituales
  onGiftChange(event: any, gift: string) {
    const giftsArray = this.ministryForm.get('spiritualGifts') as FormArray;

    if (event.target.checked) {
      giftsArray.push(this.fb.control(gift));
      this.selectedGifts.push(gift);
    } else {
      const index = giftsArray.controls.findIndex(x => x.value === gift);
      giftsArray.removeAt(index);
      this.selectedGifts = this.selectedGifts.filter(g => g !== gift);
    }
  }

  // Manejo de instrumentos musicales
  onInstrumentChange(event: any, instrument: string) {
    const instrumentsArray = this.ministryForm.get('musicalInstruments') as FormArray;

    if (event.target.checked) {
      instrumentsArray.push(this.fb.control(instrument));
      this.selectedInstruments.push(instrument);
    } else {
      const index = instrumentsArray.controls.findIndex(x => x.value === instrument);
      instrumentsArray.removeAt(index);
      this.selectedInstruments = this.selectedInstruments.filter(i => i !== instrument);
    }
  }

  // Manejo de habilidades técnicas
  onSkillChange(event: any, skill: string) {
    const skillsArray = this.ministryForm.get('technicalSkills') as FormArray;

    if (event.target.checked) {
      skillsArray.push(this.fb.control(skill));
      this.selectedSkills.push(skill);
    } else {
      const index = skillsArray.controls.findIndex(x => x.value === skill);
      skillsArray.removeAt(index);
      this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    }
  }

  // Manejo de disponibilidad
  onAvailabilityChange(type: string, event: any) {
    const control = this.ministryForm.get(`availability.${type}`);
    if (control) {
      control.setValue(event.target.checked);
    }
  }

  // Validación
  markFormGroupTouched() {
    Object.keys(this.ministryForm.controls).forEach(key => {
      const control = this.ministryForm.get(key);
      control?.markAsTouched();
    });
  }

  // Envío del formulario
  async onSubmit() {
    if (this.ministryForm.valid) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      try {
        const formData = {
          ...this.ministryForm.value,
          registrationDate: new Date().toISOString(),
          status: 'pending',
          selectedMinistries: this.selectedMinistries.map(ministry => ministry.name)
        };

        const response = await this.ministriesService.submitRegistration(formData);

        this.submitSuccess = true;
        this.resetForm();

        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);

      } catch (error) {
        console.error('Error al enviar:', error);
        this.submitError = true;
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  // Resetear formulario
  resetForm() {
    this.ministryForm.reset({
      churchMember: false,
      availability: {
        rehearsals: false,
        services: false,
        events: false,
        specialEvents: false
      },
      termsAgreed: false,
      privacyAgreed: false
    });

    this.selectedMinistries = [];
    this.selectedGifts = [];
    this.selectedInstruments = [];
    this.selectedSkills = [];
    this.showMusicalSection = false;
    this.showDanceSection = false;
    this.showTechnicalSection = false;

    // Resetear arrays
    const arrays = [
      'selectedMinistries',
      'spiritualGifts',
      'musicalInstruments',
      'technicalSkills'
    ];

    arrays.forEach(arrayName => {
      const array = this.ministryForm.get(arrayName) as FormArray;
      while (array.length) array.removeAt(0);
    });
  }

  // Helper para errores
  getErrorMessage(controlName: string): string {
    const control = this.ministryForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }

    if (control?.hasError('email')) {
      return 'Correo electrónico inválido';
    }

    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }

    if (control?.hasError('pattern')) {
      return 'Formato inválido';
    }

    if (control?.hasError('min')) {
      return `La edad mínima es ${control.errors?.['min'].min} años`;
    }

    if (control?.hasError('max')) {
      return `La edad máxima es ${control.errors?.['max'].max} años`;
    }

    return '';
  }

  // Verificar si es miembro
  get isChurchMember(): boolean {
    return this.ministryForm.get('churchMember')?.value || false;
  }

  // Obtener ministerio por ID
  getMinistryById(id: string) {
    return this.ministries.find(ministry => ministry.id === id);
  }
}
