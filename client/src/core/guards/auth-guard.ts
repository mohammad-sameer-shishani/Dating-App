import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountServices } from '../services/account-services';
import { ToastService } from '../services/toast-service';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountServices);
  const toast = inject(ToastService);
  if (accountService.currentUser()) {
    return true;
  }else{
    toast.error('You must be logged in to access this page.');
    return false;
  }
};
