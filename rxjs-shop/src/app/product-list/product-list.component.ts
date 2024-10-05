import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  
  products$: Observable<Product[]>|null = null;

  constructor(
    private readonly productService: ProductService){
      
    }
  ngOnInit(): void {
    this.products$ = this.productService.product$;
  }
}
