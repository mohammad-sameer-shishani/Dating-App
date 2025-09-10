import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountServices } from '../services/account-services';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountservices = inject(AccountServices);
  const user = accountservices.currentUser();
  if (user) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
  }
  return next(req);
};
