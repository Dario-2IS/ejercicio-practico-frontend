import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getAccounts(): Observable<any> { 
    return this.http.get(`${this.apiUrl}/accounts`)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getAccountById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/${id}`)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  addAccount(account: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts`, account)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  updateAccount(account: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/accounts`, account)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  
  deleteAccount(identificationNumber: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/accounts/${identificationNumber}`)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

}
