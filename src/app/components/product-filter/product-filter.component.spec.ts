import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterComponent } from './product-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('ProductFilterComponent', () => {
  let component: ProductFilterComponent;
  let fixture: ComponentFixture<ProductFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFilterComponent, ReactiveFormsModule, FormsModule, CommonModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ProductFilterComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should emit filterChanged event on applyFilter', () => {
    const spy = spyOn(component.filterChanged, 'emit');
    component.applyFilter();
    expect(spy).toHaveBeenCalledOnceWith(component.filterForm.value);
  });

  it('should emit categoryChanged event on applyCategoryFilter', () => {
    const selectedCategory = 'test category';
    const spy = spyOn(component.categoryChanged, 'emit');
    const event = { target: { value: selectedCategory } };
    component.applyCategoryFilter(event);
    expect(spy).toHaveBeenCalledOnceWith(selectedCategory);
  });

  it('should update categories on ngOnChanges', () => {
    const uniqueCategories = ['category1', 'category2'];
    component.uniqueCategories = uniqueCategories;
    component.ngOnChanges({ uniqueCategories: {
      currentValue: uniqueCategories,
      previousValue: undefined,
      firstChange: false,
      isFirstChange: function (): boolean {
        throw new Error('Function not implemented.');
      }
    } });
    expect(component.categories).toEqual(uniqueCategories);
  });
});
