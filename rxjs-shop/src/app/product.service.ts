import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { captureError } from 'rxjs/internal/util/errorContext';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product$ = of(1,2,3,4);

  constructor() { }
}
