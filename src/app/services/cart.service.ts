import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string = "https://ecommerce.routemisr.com";

  Headers = {
    Token: localStorage.getItem('userToken') || ''
  }

    addProductToCart(productId:string){
      return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,
      {productId:productId},
      {headers: this.Headers}
      )
    }
  

    getLoggedUserCart():Observable<any>
    {
      return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`,
      {headers: this.Headers}
      )
    }


    removeProductById(productId:string):Observable<any>
    {
      return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${productId}`,
      {headers: this.Headers}
      )
    }


    updateCartProductCount(productId:string , count:number):Observable<any>
    {
      return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${productId}`,
        {count:count},
      {headers: this.Headers}
      )
    }


    clearCart():Observable<any>
    {
      return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/`,
        
      {headers: this.Headers}
      )
    }
}
