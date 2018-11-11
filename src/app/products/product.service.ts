import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'

import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    // CTOR
    constructor(private http: HttpClient) { }

    //VARIABLES
    private productUrl = 'api/products/products.json';

    // FUNCTIONS
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        // In real-world, send server to some remote logging infrastructure
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // Client side or network error
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // Backend returned unsuccessful response code
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}