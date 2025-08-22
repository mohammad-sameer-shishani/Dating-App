import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountServices } from '../../../core/services/account-services';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register { 
  private accountServices = inject(AccountServices);
  cancelRegister=output<boolean>();
  protected creds = {} as RegisterCreds;

  register() {
    this.accountServices.register(this.creds).subscribe({
      next: user => {
        console.log('Registration successful:', user);
        this.cancel();
      },
      error: err => {
        console.error('Registration failed:', err);
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
