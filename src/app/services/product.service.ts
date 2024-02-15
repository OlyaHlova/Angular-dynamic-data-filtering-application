import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '../models/product';
import { products } from '../data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() { }

  getProducts(): Observable<IProduct[]> {
    return of(products);
  }
}
