import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
registrationForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      callPreference: ['si', Validators.required], // Valor por defecto 'si'
      prayerRequest: ['', [Validators.required, Validators.minLength(10)]],
      privacyPolicy: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;

      // Simular envío del formulario
      setTimeout(() => {
        console.log('Formulario enviado:', this.registrationForm.value);
        this.isSubmitting = false;

        // Aquí iría la lógica real de envío al backend
        // Después de enviar, puedes mostrar un mensaje de éxito o resetear el formulario

        // Opción 1: Mostrar mensaje de éxito y resetear
        alert('¡Registro exitoso! Te contactaremos pronto.');
        this.registrationForm.reset();

        // Opción 2: Mantener los datos y mostrar mensaje
        // this.showSuccessMessage = true;

      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registrationForm.controls).forEach(key => {
      this.registrationForm.get(key)?.markAsTouched();
    });
  }
}
