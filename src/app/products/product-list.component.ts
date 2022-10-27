import { ProductService } from './products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from './product';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  private _listFilter = '';
  errorMEssage: any;
  sub!: Subscription;
  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value) {
    this._listFilter = value;
    this.filtredProducts = this.products.filter(product => product.productName.toLowerCase().includes(value.toLowerCase()));
  }

  products: IProduct[] = [];
  filtredProducts: IProduct[] = [];

  constructor(private productService: ProductService) {

  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit() {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.filtredProducts = this.products = products;
      },
      error: error => this.errorMEssage = error
    })

    this.productService.getSource().subscribe(x => {
      console.log(x);
    });
  }
  showImageToggle() {
    this.showImage = !this.showImage;
  }
  ratingClicked(message: string) {
    this.pageTitle = 'Product List: ' + message;
  }
}

