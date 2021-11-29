import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { APIurls } from '../constants/endpointConstants';

const baseUrl = APIurls.baseURL;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
  
  getAll(): Observable<any>{
    return this.http.get(`${baseUrl}`);
  }

  getStockHistory(isin: string): Observable<any>{
    let url = baseUrl+ APIurls.getStockHistory;
    return this.http.post(`${url}`, {"ISIN": isin});
  }


}
