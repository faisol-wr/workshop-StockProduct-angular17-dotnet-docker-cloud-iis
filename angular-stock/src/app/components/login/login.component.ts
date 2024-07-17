import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import {
  MatCard,
  MatCardImage,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { Meta } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    MatCard,
    MatCardImage,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatSuffix,
    MatIconButton,
    MatCardActions,
    MatButton,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {
  // Form Validation
  loginForm!: FormGroup;
  submitted: boolean = false;

  // Variables สำหรับรับค่าจากฟอร์ม
  userData = {
    username: '',
    password: '',
  };

  // สร้างตัวแปรเก็บข้อมูลการ Login
  userLogin = {
    username: '',
    email: '',
    role: '',
    token: '',
  };

  // สำหรับซ่อนแสดง password
  hide = true;

  private userService = inject(UserService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private meta = inject(Meta);

  ngOnInit() {
    // กำหนด Meta Tag description
    this.meta.addTag({
      name: 'description',
      content: 'Login page for Stock Management',
    });

    // กำหนดค่าให้กับ Form
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // ฟังก์ชัน Submit สำหรับ Login
  submitLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.userData.username = this.loginForm.value.username;
      this.userData.password = this.loginForm.value.password;

      console.log(this.userData);

      // เรียกใช้งาน Service สำหรับ Login
      this.userService.login(this.userData).subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  // สำหรับลิงก์ไปหน้า Register
  onClickRegister() {
    this.router.navigate(['/register']);
  }
}
