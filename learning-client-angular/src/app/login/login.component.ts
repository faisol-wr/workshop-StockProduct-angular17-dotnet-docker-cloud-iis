import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // FormGroup
  loginForm!: FormGroup;
  // สร้างตัวแปรไว้เช็คว่า submit form หรือยัง
  submitted = false;
  // สร้างตัวแปรไว้ซ่อน/แสดง password
  hide = true;

  // ตัวแปรสำหรับผูกกับฟอร์ม
  userLogin = {
    email: '',
    password: '',
  };

  @ViewChild('emailInput') emailInput!: ElementRef;

  private fb = inject(FormBuilder);
  private meta = inject(Meta);

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.meta.addTags([
      {
        name: 'title',
        content: 'เข้าสู่ระบบ | Stock Management',
      },
      {
        name: 'description',
        content:
          'Login Stock Management is a web applicantion that allows users to manage their stock inventory.',
      },
      {
        name: 'keywords',
        content: 'login, stock, management, inventory, web application',
      },
    ]);
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  submitLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      // alert('Login success');
      Swal.fire({
        title: 'เข้าสู่ระบบสำเร็จ',
        text: 'ยินดีต้อนรับเข้าสู่ระบบ Stock Management',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      this.userLogin.email = this.loginForm.value.email;
      this.userLogin.password = this.loginForm.value.password;
    }
  }

  resetForm() {
    this.submitted = false;
    this.loginForm.reset();
    // ให้ focus ที่ input email
    this.emailInput.nativeElement.focus();
  }
}
