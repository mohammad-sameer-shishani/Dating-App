import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit,signal } from '@angular/core';
import { Nav } from "../layout/nav/nav";
import { AccountServices } from '../core/services/account-services';
import { lastValueFrom } from 'rxjs';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountServices);
  private http= inject(HttpClient);
  protected readonly title = signal('Dating App');
  protected members = signal<User[]>([]);
  

  async ngOnInit(){
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');  
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
    // this.http.get('https://localhost:5001/api/members').subscribe({
    //   next: (response) => {
    //     this.members.set(response);
    //     console.log(response);
    //   },
    //   error: (error) => {
    //     console.error('Error fetching members:', error);
    //   },
    //   complete: () => {
    //     console.log('completed http request');
    //   }});
  async getMembers() {
    try {
      return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.log('Error fetching members:', error);
      throw error;
    }
  }
}