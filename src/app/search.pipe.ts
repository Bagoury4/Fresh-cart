import { Pipe, PipeTransform } from '@angular/core';
import { product } from './interfaces/products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productList:product[], term:string): product[] {
    return productList.filter(p=> p.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
    ;
  }

}
