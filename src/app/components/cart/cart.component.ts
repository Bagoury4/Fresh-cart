import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  isLoading:boolean=true;
constructor(private _CartService:CartService){}

numberOfCartItems:number =0;
totalPrice:number= 0;
productList:any[]= [];



ngOnInit(): void {
this.getLoggedUserData();

}

getLoggedUserData(){

  this._CartService.getLoggedUserCart().subscribe({
    next: response =>{
      this.isLoading=false;

       this.numberOfCartItems=response.numOfCartItems; 
      this.totalPrice=response.data.totalCartPrice; 
      this.productList=response.data.products;
      


    
      console.log(response);
      
    },
    error: err =>
    {
      this.isLoading=false;

      console.log(err);
      
    }
  })


}

removeProductFromCart(productId:string){
  this._CartService.removeProductById(productId).subscribe({
    next: response =>{
      this.numberOfCartItems=response.numOfCartItems;
      this.totalPrice=response.data.totalCartPrice;
      this.productList=response.data.products;

      console.log(response);
      
    },
    error:err =>{
      console.log(err);
      
    }

  })

  

}


updateCartProductQuantity(productId:string,count:number){
  this._CartService.updateCartProductCount(productId,count).subscribe({
    next: response =>{
      this.numberOfCartItems=response.numOfCartItems;
      this.totalPrice=response.data.totalCartPrice;
      this.productList=response.data.products;
      
      console.log(response);
      
    },
    error:err =>{
      console.log(err);
      
    }

  })

  

}


clearCart(){
  this._CartService.clearCart().subscribe({
    next: response =>{
      this.numberOfCartItems=0;
      this.totalPrice=0;
      this.productList=[];
      
      console.log(response);
      
    },
    error:err =>{
      console.log(err);
      
    }

  })

  

}

}
