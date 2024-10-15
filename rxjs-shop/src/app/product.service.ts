import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, debounceTime, distinct, filter, from, map, mergeMap, of, switchMap, toArray } from 'rxjs';
import { ProductApiStub } from './stubs/product-api-stub';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private allProduct$: Observable<Product[]> = of(ProductApiStub.dummyProducts);
  
  private searchSubject = new BehaviorSubject<string>('');
  searchAction$ = this.searchSubject.asObservable();

  productSearch$: Observable<Product[]> = this.searchAction$.pipe(
    debounceTime(300),
    switchMap(searchTerm => 
      this.allProduct$.pipe(
        mergeMap(products => of(...products)),
        filter(product => product.name.includes(searchTerm) || product.description.includes(searchTerm)),
        toArray()
      )
    )
  );

  productCategories$: Observable<string[]> = this.allProduct$.pipe(
    mergeMap(products => of(...products)),
    distinct(product => product.category),
    map(product => product.category),
    toArray()
  );

  private categorySubject = new BehaviorSubject<string|null>(null);
  categorySelectAction$ = this.categorySubject.asObservable();

  product$: Observable<Product[]> = combineLatest([
    this.categorySelectAction$,
    this.searchAction$
  ]).pipe(
    switchMap(([catName, searchTerm]) => 
      this.allProduct$.pipe(
        mergeMap(products => of(...products)),
        filter(product => 
          (catName === null || product.category === catName) &&
          (searchTerm === '' || product.name.includes(searchTerm) || product.description.includes(searchTerm))
        ),
        toArray()
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

}
