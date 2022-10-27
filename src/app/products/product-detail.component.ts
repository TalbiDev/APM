import { filter } from 'rxjs';
import { ProductService } from './products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct | undefined;
  pageTitle: string = 'Product detail ';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProducts().subscribe(products => {
      this.product = products.filter((p: IProduct) => p.productId == id)[0];
      console.log(this.product);
      this.pageTitle += this.product?.productName;
    });

  }

  onBack(): void {
    this.router.navigate(['/products'])
  }

}
