import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiUrl;
   
  constructor(private http:HttpClient) { }

  getTransactions(): Observable<any> { 
    return this.http.get(`${this.apiUrl}/transactions`)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getTransactionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions/${id}`)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  addTransaction(transaction: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions`, transaction)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/transactions/${id}`)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  
  getTransactionsByAccount(accountNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions/account/${accountNumber}`)
    .pipe(
      map(response => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
