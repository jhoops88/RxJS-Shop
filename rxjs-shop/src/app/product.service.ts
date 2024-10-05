import { Injectable } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { ProductApiStub } from './stubs/product-api-stub';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product$: Observable<Product[]> = of(ProductApiStub.dummyProducts);
  productCategories$ = this.product$.pipe(map(products => [...new Set(products.map(product => product.category))]));

  constructor() { }
}
