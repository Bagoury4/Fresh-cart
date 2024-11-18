import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  isLoading: boolean = true;


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },

    },
    nav: true
  }

  productItem: any
  productId: string = '';
  constructor(private _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private toastr: ToastrService
  ) { }



  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      this.productId = params['id'];
      console.log(this.productId);
    })

    this._ProductService.getProductById(this.productId).subscribe({
      next: response => {
        this.isLoading = false;
        this.productItem = response.data
        console.log(this.productItem);

      },
      error: err => {
        this.isLoading = false;
        console.log(err);

      }


    })

  }

  addProductToCart(productId: string) {

    this._CartService.addProductToCart(productId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.toastr.success(response.message, '', {
          progressBar: true,
          timeOut: 3000,
          closeButton: true

        });

      },
      error: err => {
        console.log(err);

      }
    })

  }

}
