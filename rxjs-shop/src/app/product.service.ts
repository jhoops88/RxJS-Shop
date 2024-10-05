import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductApiStub } from './stubs/product-api-stub';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product$: Observable<Product[]> = of(ProductApiStub.dummyProducts);

  constructor() { }
}
