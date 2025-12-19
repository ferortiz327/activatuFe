import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { VolunteerService } from '../../services/volunteer.service';

@Component({
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.scss']
})
export class VolunteerFormComponent implements OnInit {
  volunteerForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  works: any[] = [];
  roles: any[] = [];
  availabilityOptions: any[] = [];
  frequencyOptions: any[] = [];

  selectedWorks: any[] = [];

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerService
  ) {
    this.volunteerForm = this.createForm();
  }

  ngOnInit() {
    this.works = this.volunteerService.getWorks();
    this.roles = this.volunteerService.getRoles();
    this.availabilityOptions = this.volunteerService.getAvailabilityOptions();
    this.frequencyOptions = this.volunteerService.getFrequencyOptions();
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Información personal
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{10,}$/)]],
      age: ['', [Validators.min(18), Validators.max(80)]],
      occupation: [''],

      // Obras seleccionadas
      selectedWorks: this.fb.array([], [Validators.required, Validators.minLength(1)]),

      // Rol preferido
      preferredRole: ['', Validators.required],
      otherRole: [''],

      // Disponibilidad
      availability: this.fb.array([], [Validators.required, Validators.minLength(1)]),
      frequency: ['', Validators.required],

      // Experiencia y habilidades
      experience: ['', [Validators.required, Validators.minLength(20)]],
      skills: [''],

      // Motivación
      motivation: ['', [Validators.required, Validators.minLength(30)]],

      // Contacto de emergencia
      emergencyContact: this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        relationship: ['', Validators.required]
      }),

      // Salud
      healthConsiderations: [''],

      // Transporte
      hasTransport: [false],

      // Documentación
      hasID: [true],
      backgroundCheck: [false],

      // Acuerdos
      termsAgreed: [false, Validators.requiredTrue],
      privacyAgreed: [false, Validators.requiredTrue],

      // Comentarios adicionales
      additionalComments: ['']
    });
  }

  // Métodos helper para el template
  isWorkSelected(workId: string): boolean {
    return this.selectedWorks.some(work => work.id === workId);
  }

  isRoleSelected(roleId: string): boolean {
    return this.volunteerForm.get('preferredRole')?.value === roleId;
  }

  isAvailabilitySelected(availabilityId: string): boolean {
    const availabilityArray = this.volunteerForm.get('availability') as FormArray;
    return availabilityArray.value.includes(availabilityId);
  }

  isFrequencySelected(frequencyId: string): boolean {
    return this.volunteerForm.get('frequency')?.value === frequencyId;
  }

  // Manejo de obras seleccionadas
  onWorkChange(event: any, workId: string) {
    const worksArray = this.volunteerForm.get('selectedWorks') as FormArray;
    const work = this.works.find(w => w.id === workId);

    if (event.target.checked) {
      worksArray.push(this.fb.control(workId));
      this.selectedWorks.push(work);
    } else {
      const index = worksArray.controls.findIndex(x => x.value === workId);
      worksArray.removeAt(index);
      this.selectedWorks = this.selectedWorks.filter(w => w.id !== workId);
    }
  }

  // Manejo de disponibilidad
  onAvailabilityChange(event: any, availabilityId: string) {
    const availabilityArray = this.volunteerForm.get('availability') as FormArray;

    if (event.target.checked) {
      availabilityArray.push(this.fb.control(availabilityId));
    } else {
      const index = availabilityArray.controls.findIndex(x => x.value === availabilityId);
      availabilityArray.removeAt(index);
    }
  }

  // Validación
  markFormGroupTouched() {
    Object.keys(this.volunteerForm.controls).forEach(key => {
      const control = this.volunteerForm.get(key);
      control?.markAsTouched();
    });
  }

  // Envío del formulario
  async onSubmit() {
    if (this.volunteerForm.valid) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      try {
        const formData = {
          ...this.volunteerForm.value,
          submissionDate: new Date().toISOString(),
          status: 'pending_review',
          selectedWorks: this.selectedWorks.map(work => work.name)
        };

        const response = await this.volunteerService.submitVolunteerForm(formData);

        this.submitSuccess = true;
        this.volunteerForm.reset();
        this.selectedWorks = [];

        // Resetear arrays
        const worksArray = this.volunteerForm.get('selectedWorks') as FormArray;
        const availabilityArray = this.volunteerForm.get('availability') as FormArray;
        while (worksArray.length) worksArray.removeAt(0);
        while (availabilityArray.length) availabilityArray.removeAt(0);

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

  // Helper para mostrar errores
  getErrorMessage(controlName: string): string {
    const control = this.volunteerForm.get(controlName);

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

  // Obtener obra por ID
  getWorkById(id: string) {
    return this.works.find(work => work.id === id);
  }

  // Verificar si un checkbox está marcado
  isCheckboxChecked(controlName: string): boolean {
    return this.volunteerForm.get(controlName)?.value || false;
  }
}
