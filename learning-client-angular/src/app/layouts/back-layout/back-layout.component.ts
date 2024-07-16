import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarBackendComponent } from '../../navbar-backend/navbar-backend.component';
import { SidebarBackendComponent } from '../../sidebar-backend/sidebar-backend.component';
import { FooterBackendComponent } from '../../footer-backend/footer-backend.component';
@Component({
  selector: 'app-back-layout',
  standalone: true,
  imports: [
    NavbarBackendComponent,
    SidebarBackendComponent,
    FooterBackendComponent,
    RouterOutlet,
  ],
  templateUrl: './back-layout.component.html',
  styleUrl: './back-layout.component.scss',
})
export class BackLayoutComponent {}
