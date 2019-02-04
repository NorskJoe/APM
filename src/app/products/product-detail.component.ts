import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // CTOR
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  // VARIABLES
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;

  // FUNCTIONS
  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');

    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => this.product = product);
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
