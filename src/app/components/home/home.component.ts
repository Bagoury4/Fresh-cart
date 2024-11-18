import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  term: string = '';



  isLoading: boolean = true;
  productList: product[] = [];

  constructor
    (private _productService: ProductService,
      private _CartService: CartService,
      private toastr: ToastrService
    ) {

  }

  ngOnInit(): void {
    this.getAllProducts();


  }

  getAllProducts() {
    this._productService.getAllProducts().subscribe(
      {
        next: response => {
          this.isLoading = false;
          this.productList = response.data
          console.log(this.productList);

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
