import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, filter, map, Observable, range, tap, throwError } from "rxjs";
import { IProduct } from "./product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) { }

  getSource(): Observable<number> {
    const source$: Observable<number> = range(0, 10);
    return source$.pipe(
      map(x => x * 3),
      filter(x => x % 2 == 0)

    );
  }
  getProducts(): Observable<IProduct[] | any> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.errorHandler)
    );
  }





  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error.message)
  }
}
