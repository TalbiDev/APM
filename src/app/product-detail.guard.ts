import { ProductService } from './products/products.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from './products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {

  constructor(private router: Router, private productsService: ProductService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.productsService.getProducts().subscribe(products => {
      const ids: number[] = [];
      const id = Number(route.paramMap.get('id'));
      products.forEach((product: IProduct) => {
        ids.push(product.productId);
      });
      if (isNaN(id) || id < 1 || !ids.includes(id)) {
        alert(`the ${route.paramMap.get('id')} isn't exist or not a Number!`);
        this.router.navigate(['/products']);

      }
      return false;
    })



    return true;
  }

}
