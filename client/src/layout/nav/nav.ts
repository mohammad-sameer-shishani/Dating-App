import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountServices } from '../../core/services/account-services';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { themes } from '../theme';
import { BusyService } from '../../core/services/busy-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {
  protected accountService = inject(AccountServices);
  private router= inject(Router);
  private toast= inject(ToastService);
  protected busyService = inject(BusyService);
  protected creds: any = {}
  protected selecetedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes;
  
  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selecetedTheme());
  }

  handleSelectTheme(theme: string) {
    this.selecetedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  }

  login(){
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in successfully!');
        this.creds = {}; // Clear credentials after successful login
      },
      error: error => {
        this.toast.error(error.error);
      }
    });
  }
  logout() {
    this.accountService.logout();
    this.creds = {}; // Clear credentials on logout
    this.router.navigateByUrl('/'); // Redirect to home or login page after logout
    this.toast.info('Logged out successfully.');
  }
}
