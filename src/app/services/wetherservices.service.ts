import { Injectable } from '@angular/core';
import {Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,

} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WetherservicesService {

  constructor(private http: HttpClient, private router: Router,) { }

  getWetherByCity(cityName:any): Observable<any> {
    let url = `${environment.mockApiUrl}q=`+cityName+`&appid=`+`${environment.appid}&units=metric`;
    return this.http.get(url).pipe(catchError(this.errorMgmt));
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
