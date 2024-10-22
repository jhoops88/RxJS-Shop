import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, debounceTime, distinct, filter, from, map, mergeMap, of, startWith, switchMap, toArray } from 'rxjs';
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
  private sortSubject = new BehaviorSubject<string>('name');

  searchSuggestions$: Observable<string[]> = this.searchSubject.pipe(
    debounceTime(300),
    switchMap(term => {
      if (term.length < 2) {
        return of([]);
      }
      return this.getProducts().pipe(
        map(products => 
          products
            .filter(product => 
              product.name.toLowerCase().includes(term.toLowerCase()) ||
              product.description.toLowerCase().includes(term.toLowerCase())
            )
            .map(product => product.name)
        )
      );
    }),
    startWith([])
  );

  product$: Observable<Product[]> = combineLatest([
    this.categorySubject.asObservable(),
    this.searchSubject.asObservable().pipe(debounceTime(300)),
    this.sortSubject.asObservable()
  ]).pipe(
    switchMap(([catName, searchTerm, sortBy]) => 
      this.getProducts().pipe(
        map(products => {
          const filteredProducts = products.filter(product => 
            (catName === null || product.category === catName) &&
            (searchTerm === '' || 
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
              product.description.toLowerCase().includes(searchTerm.toLowerCase()))
          );

          return this.sortProducts(filteredProducts, sortBy);
        })
      )
    )
  );

  selectedCategoryChanged(categoryName: string): void {
    this.categorySubject.next(categoryName);
  }

  searchProducts(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  changeSortOrder(sortBy: string): void {
    this.sortSubject.next(sortBy);
  }

  private getProducts(): Observable<Product[]> {
    return of(ProductApiStub.dummyProducts);
  }

  private sortProducts(products: Product[], sortBy: string): Product[] {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }

}
