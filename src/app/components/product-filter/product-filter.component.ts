import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss'
})

export class ProductFilterComponent {

  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();

  filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      category: [''],
      priceFrom: [''],
      priceTo: ['']
    });
  }

  applyFilter(): void {
    this.filterChanged.emit(this.filterForm.value);
  }
}
