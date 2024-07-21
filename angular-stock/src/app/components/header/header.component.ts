import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  inject,
} from '@angular/core';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../types/user.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatIconButton,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
  ],
})
export class HeaderComponent implements OnInit {
  // สร้างตัวแปรไว้เก็บข้อมูลผู้ใช้งานที่ Login
  userProfile: UserProfile = {
    username: '',
    email: '',
    role: '',
    token: '',
  };

  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() isOpened?: boolean;

  pageName: string = 'Stock';
  version = '17.3';

  private auth = inject(AuthService);

  ngOnInit(): void {
    // ดึงข้อมูลผู้ใช้งานที่ Login มาแสดง
    this.userProfile = this.auth.getUser();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onClickSignout() {
    this.auth.logout();
    window.location.href = '/login';
  }
}
