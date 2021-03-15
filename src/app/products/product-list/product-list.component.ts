import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  title = 'Products';
  products: Product[];
  products$: Observable<Product[]>;
  selectedProduct: Product;
  subscription: Subscription = new Subscription();

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
  }

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.products$ = this.productService.products$;

    // this.subscription.add(
    //   this
    //   .productService
    //   .products$
    //   .subscribe(
    //     results => this.products = results
    //   )
    // );
  }

  ngOnDestroy() {
   // this.subscription.unsubscribe();
  }

}
