import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss'
})

export class ProductFilterComponent {

  @Input() uniqueCategories: string[] = [];
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() categoryChanged: EventEmitter<string> = new EventEmitter<string>();


  filterForm: FormGroup;
  categories: string[] = [];
  selectedCategory!: string;

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      selectedCategory: [''] ,
      priceFrom: [''],
      priceTo: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['uniqueCategories'] && changes['uniqueCategories'].currentValue) {
      this.updateCategories();
    }
  }

  updateCategories(): void {
    this.categories = [...this.uniqueCategories];
  }

  applyFilter(): void {
    this.filterChanged.emit(this.filterForm.value);
  }

  applyCategoryFilter(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value;
    this.filterForm.patchValue({
      selectedCategory: selectedCategory
    });
    this.categoryChanged.emit(selectedCategory);
  }
}
