import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, ProductDetailComponent, MatSelectModule, MatInputModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  
  products$: Observable<Product[]>|null = null;
  categories$: Observable<string[]>|null = null;
  searchSuggestions$: Observable<string[]>|null = null;

  constructor(
    private readonly productService: ProductService){
      
    }
  
    ngOnInit(): void {
    this.products$ = this.productService.product$;
    this.categories$ = this.productService.productCategories$;
    this.searchSuggestions$ = this.productService.searchSuggestions$;
  }

  onCategorySelect(selectedCategory: string) {
    this.productService.selectedCategoryChanged(selectedCategory);
  }

  onSelectSuggestion(suggestion: string) {
    this.productService.searchProducts(suggestion);
  }

  onSearchChange(searchTerm: string): void {
    this.productService.searchProducts(searchTerm);
  }

  changeSortOrder(sortByName: string): void {
    this.productService.changeSortOrder(sortByName);
  }
}
