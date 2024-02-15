import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filterProducts(products: IProduct[], filters: any): IProduct[] {
    let filteredProducts = [...products];

    if (filters.category) {
      filteredProducts = filteredProducts.filter(product => product.category.toLowerCase().includes(filters.category.toLowerCase()));
    }

    if (filters.priceFrom) {
      filteredProducts = filteredProducts.filter(product => product.price >= filters.priceFrom);
    }

    if (filters.priceTo) {
      filteredProducts = filteredProducts.filter(product => product.price <= filters.priceTo);
    }

    return filteredProducts;
  }
}
