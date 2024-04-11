import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const { apiUrl } = environment;

@Injectable({ providedIn: 'root' })
class AppInterceptor implements HttpInterceptor {
  API = '/api';

  constructor(private router: Router ) {}

  toastr = inject(ToastrService)

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(this.API)) {
      req = req.clone({
        url: req.url.replace(this.API, apiUrl),
        withCredentials: true,
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        
        if (error.error instanceof ErrorEvent) {
          console.log('error instanceof errorevent');
          
          errorMessage = `Error: ${error.error.message}`;
        } else if(error.status === 404){
          console.log('error status 404');

          errorMessage = `${error.error.message}`;
          this.router.navigate(['/404'])
        }else{
          errorMessage = `${error.error.message}`
        }

        this.toastr.error(errorMessage, 'Error', {   timeOut: 3000 });
        return  throwError(() => error);
      })
    );
  }
}

export const appInterceptorProvider: Provider = {
  useClass: AppInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS,
  deps:[Router]
};