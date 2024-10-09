import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Product } from '../models/product.model';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  
  products$: Observable<Product[]>|null = null;
  categories$: Observable<string[]>|null = null;

  constructor(
    private readonly productService: ProductService){
      
    }
  
    ngOnInit(): void {
    this.products$ = this.productService.product$;
    this.categories$ = this.productService.productCategories$;
  }

  onCategorySelect(target: EventTarget | null) {
    if (target instanceof HTMLSelectElement) {
      const selectedCategory = target.value;
      console.log('Selected category:', selectedCategory);
      this.productService.selectedCategoryChanged(selectedCategory);
      // You can now use the selected category as needed
    }
  }
}
