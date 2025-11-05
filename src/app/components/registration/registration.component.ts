import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
registrationForm: FormGroup;
  showQR = true;
  isSubmitting = true ;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      callPreference: ['', Validators.required],
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
        this.showQR = true;
        
        // Aquí iría la lógica real de envío al backend
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

  generateNewQR(): void {
    this.showQR = false;
    this.registrationForm.reset();
  }

  get qrData(): string {
    const formData = this.registrationForm.value;
    return `REGISTRO IGLESIA|Nombre:${formData.name}|Tel:${formData.phone}|Email:${formData.email}|Oración:${formData.prayerRequest.substring(0, 50)}`;
  }
}
