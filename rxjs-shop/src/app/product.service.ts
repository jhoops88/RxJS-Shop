import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, debounceTime, distinct, filter, from, map, mergeMap, of, switchMap, toArray } from 'rxjs';
import { ProductApiStub } from './stubs/product-api-stub';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productCategories$: Observable<string[]> = this.getProducts().pipe(
    mergeMap(products => of(...products)),
    distinct(product => product.category),
    map(product => product.category),
    toArray()
  );

  private categorySubject = new BehaviorSubject<string|null>(null);
  private searchSubject = new BehaviorSubject<string>('');

  product$: Observable<Product[]> = combineLatest([
    this.categorySubject.asObservable(),
    this.searchSubject.asObservable().pipe(debounceTime(300))
  ]).pipe(
    switchMap(([catName, searchTerm]) => 
      this.getProducts().pipe(
        map(products => products.filter(product => 
          (catName === null || product.category === catName) &&
          (searchTerm === '' || 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            product.description.toLowerCase().includes(searchTerm.toLowerCase()))
        ))
      )
    )
  );

  constructor() { }

  selectedCategoryChanged(categoryName: string): void {
    this.categorySubject.next(categoryName);
  }

  searchProducts(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  private getProducts(): Observable<Product[]> {
    return of(ProductApiStub.dummyProducts);
  }

}
