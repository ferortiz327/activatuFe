import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingSchoolService } from 'app/services/training-school.service';

@Component({
  selector: 'app-training-school-form',
  templateUrl: './training-school-form.component.html',
  styleUrls: ['./training-school-form.component.scss']
})
export class TrainingSchoolFormComponent implements OnInit {
   registrationForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  trainingPrograms: any[] = [];
  spiritualLevels: any[] = [];
  commitmentLevels: any[] = [];
  memberTimes: any[] = [];

  selectedTrainings: any[] = [];

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingSchoolService
  ) {
    this.registrationForm = this.createForm();
  }

  ngOnInit() {
    this.trainingPrograms = this.trainingService.getTrainingPrograms();
    this.spiritualLevels = this.trainingService.getSpiritualLevels();
    this.commitmentLevels = this.trainingService.getCommitmentLevels();
    this.memberTimes = this.trainingService.getMemberTimes();
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Información personal
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{10,}$/)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(80)]],
      occupation: ['', Validators.required],

      // Membresía en la iglesia
      churchMember: [false, Validators.requiredTrue],
      memberTime: [''],

      // Programas seleccionados
      selectedTrainings: this.fb.array([], [Validators.required, Validators.minLength(1)]),

      // Nivel espiritual
      spiritualLevel: ['', Validators.required],

      // Formación previa
      previousTraining: [''],
      trainingGoals: ['', [Validators.required, Validators.minLength(30)]],

      // Disponibilidad - AHORA CON VALORES POR DEFECTO
      availability: this.fb.group({
        weekdays: [false],
        weekends: [false],
        evenings: [false]
      }),

      // Compromiso
      commitment: ['', Validators.required],

      // Expectativas
      expectations: ['', [Validators.required, Validators.minLength(30)]],

      // Recomendación pastoral
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
    this.registrationForm.get('churchMember')?.valueChanges.subscribe(isMember => {
      const memberTimeControl = this.registrationForm.get('memberTime');
      if (isMember) {
        memberTimeControl?.setValidators([Validators.required]);
      } else {
        memberTimeControl?.clearValidators();
      }
      memberTimeControl?.updateValueAndValidity();
    });
  }

  // MÉTODOS PARA DISPONIBILIDAD - NUEVOS
  isAvailabilitySelected(type: 'weekdays' | 'weekends' | 'evenings'): boolean {
    return this.registrationForm.get(`availability.${type}`)?.value || false;
  }

  onAvailabilityChange(type: 'weekdays' | 'weekends' | 'evenings', event: any) {
    const availabilityControl = this.registrationForm.get(`availability.${type}`);
    if (availabilityControl) {
      availabilityControl.setValue(event.target.checked);
      availabilityControl.markAsTouched();
    }
  }

  // Métodos helper para el template
  isTrainingSelected(trainingId: string): boolean {
    return this.selectedTrainings.some(training => training.id === trainingId);
  }

  isSpiritualLevelSelected(levelId: string): boolean {
    return this.registrationForm.get('spiritualLevel')?.value === levelId;
  }

  isCommitmentSelected(commitmentId: string): boolean {
    return this.registrationForm.get('commitment')?.value === commitmentId;
  }

  // Manejo de programas seleccionados
  onTrainingChange(event: any, trainingId: string) {
    const trainingsArray = this.registrationForm.get('selectedTrainings') as FormArray;
    const training = this.trainingPrograms.find(t => t.id === trainingId);

    if (event.target.checked) {
      trainingsArray.push(this.fb.control(trainingId));
      this.selectedTrainings.push(training);
    } else {
      const index = trainingsArray.controls.findIndex(x => x.value === trainingId);
      trainingsArray.removeAt(index);
      this.selectedTrainings = this.selectedTrainings.filter(t => t.id !== trainingId);
    }
  }

  // Validación
  markFormGroupTouched() {
    Object.keys(this.registrationForm.controls).forEach(key => {
      const control = this.registrationForm.get(key);
      control?.markAsTouched();
    });
  }

  // Envío del formulario
  async onSubmit() {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      try {
        const formData = {
          ...this.registrationForm.value,
          registrationDate: new Date().toISOString(),
          status: 'pending',
          selectedTrainings: this.selectedTrainings.map(training => training.name)
        };

        const response = await this.trainingService.submitRegistration(formData);

        this.submitSuccess = true;
        this.registrationForm.reset({
          // Restablecer valores por defecto
          churchMember: false,
          availability: {
            weekdays: false,
            weekends: false,
            evenings: false
          },
          termsAgreed: false,
          privacyAgreed: false
        });
        this.selectedTrainings = [];

        // Resetear arrays
        const trainingsArray = this.registrationForm.get('selectedTrainings') as FormArray;
        while (trainingsArray.length) trainingsArray.removeAt(0);

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

  // Helper para errores
  getErrorMessage(controlName: string): string {
    const control = this.registrationForm.get(controlName);

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

    return '';
  }

  // Verificar si el usuario es miembro
  get isChurchMember(): boolean {
    return this.registrationForm.get('churchMember')?.value || false;
  }

  // Método para verificar si un radio está seleccionado
  isRadioSelected(controlName: string, value: string): boolean {
    return this.registrationForm.get(controlName)?.value === value;
  }
}
