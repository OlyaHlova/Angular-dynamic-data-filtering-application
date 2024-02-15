import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';
import { IProduct } from '../../models/product';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let filterServiceSpy: jasmine.SpyObj<FilterService>;

  beforeEach(async () => {
    const productServiceSpyObj = jasmine.createSpyObj('ProductService', ['getProducts']);
    const filterServiceSpyObj = jasmine.createSpyObj('FilterService', ['filterProducts']);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpyObj },
        { provide: FilterService, useValue: filterServiceSpyObj }
      ]
    })
    .compileComponents();

    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    filterServiceSpy = TestBed.inject(FilterService) as jasmine.SpyObj<FilterService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create ProductListComponent', () => {
    expect(component).toBeTruthy();
  });
  
  it('should load products on initialization', () => {
    
    const products: IProduct[] = [{ id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1' }];
    productServiceSpy.getProducts.and.returnValue(of(products));
    
    component.ngOnInit();

    expect(component.products).toEqual(products);
    expect(component.filteredProducts).toEqual(products);
    expect(component.uniqueCategories).toEqual(['Category 1']);
  });

  it('should apply filter correctly', () => {
    const products: IProduct[] = [{ id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1' }];
    productServiceSpy.getProducts.and.returnValue(of(products));
    filterServiceSpy.filterProducts.and.returnValue(products);

    component.ngOnInit();
    const filters = { category: 'Category 1', priceFrom: 0, priceTo: 100 };
    component.applyFilter(filters);

    expect(filterServiceSpy.filterProducts).toHaveBeenCalledWith(products, filters);
    expect(component.filteredProducts).toEqual(products);
  });
});
