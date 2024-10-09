import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, distinct, filter, from, map, mergeMap, of, switchMap, toArray } from 'rxjs';
import { ProductApiStub } from './stubs/product-api-stub';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private allProduct$: Observable<Product[]> = of(ProductApiStub.dummyProducts);
  
  productCategories$: Observable<string[]> = this.allProduct$.pipe(
    mergeMap(products => of(...products)),
    distinct(product => product.category),
    map(product => product.category),
    toArray()
  );

  private categorySubject = new BehaviorSubject<string|null>(null);
  categorySelectAction$ = this.categorySubject.asObservable();

  product$: Observable<Product[]> = this.categorySelectAction$.pipe(
    switchMap(catName => 
      this.allProduct$.pipe(
        mergeMap(products => of(...products)),
        filter(product => catName === null || product.category === catName),
        toArray()
      )
    )
  );

  constructor() { }

  selectedCategoryChanged(categoryName: string): void {
    this.categorySubject.next(categoryName);
  }


  // cats$ = this.categorySelectAction$.pipe(map(catName => this.product$.pipe(from(ProductApiStub.getForCategory(catName)))))
}
