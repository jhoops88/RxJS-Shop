import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'rxjs-shop';
  products$: Observable<number>|null = null;

  constructor(
    private readonly productService: ProductService){
      
    }
  ngOnInit(): void {
    this.products$ = this.productService.product$;
  }
}
