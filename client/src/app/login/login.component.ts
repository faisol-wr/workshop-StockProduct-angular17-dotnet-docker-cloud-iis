import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // FormGroup
  loginForm!: FormGroup;
  // สร้างตัวแปรไว้เช็คว่า submit form หรือยัง
  submitted = false;

  // ตัวแปรสำหรับผูกกับฟอร์ม
  userLogin = {
    email: '',
    password: '',
  };

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      alert('Login success')
      this.userLogin.email = this.loginForm.value.email;
      this.userLogin.password = this.loginForm.value.password;
    }
  }

  resetForm() {
    this.submitted = false;
    this.loginForm.reset();
  }
}
