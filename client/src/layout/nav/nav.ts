import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountServices } from '../../core/services/account-services';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountService = inject(AccountServices);
  protected creds: any = {}
  login(){
    this.accountService.login(this.creds).subscribe({
      next: response => {
        console.log('Login successful', response);
        this.creds = {}; // Clear credentials after successful login
      },
      error: error => {
        alert('Login failed: ' + error.message);
      }
    });
  }
  logout() {
    this.accountService.logout();
    this.creds = {}; // Clear credentials on logout
    console.log('Logged out');
  }
}
