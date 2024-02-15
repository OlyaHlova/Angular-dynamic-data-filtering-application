import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FilterService } from '../../services/filter.service';
import { ProductFilterComponent } from '../product-filter/product-filter.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})

export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category'];
  pageSizeOptions: number[] = [10, 20, 50, 100];
  pageSize: number = 10;
  totalPages: number = 0;
  currentPage: number = 0;
  uniqueCategories: string[] = [];

  constructor(private productService: ProductService,
              private filterService: FilterService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.uniqueCategories = this.getUniqueCategories(products);
      this.uniqueCategories = this.sortCategories(this.uniqueCategories);
      this.filteredProducts = [...products];
      this.updatePage();
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.updatePage();
  }

  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePage();
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePage();
    }
  }

  onPageSizeChange(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    this.pageSize = Number(selectElement.value);
    this.currentPage = 0; // Go to the first page when changing page size
    this.updatePage();
  }

  private updatePage(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.filteredProducts.length);
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  
  goToFirstPage(): void {
    this.currentPage = 0;
    this.updatePage();
  }
  
  goToLastPage(): void {
    this.currentPage = Math.floor(this.totalPages) - 1;
    this.updatePage();
  }

  getDisplayedProducts(): IProduct[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  getDisplayedProductsRange(): string {
    const startIndex = this.currentPage * this.pageSize + 1;
    const endIndex = Math.min((this.currentPage + 1) * this.pageSize, this.products.length);
    return `${startIndex} - ${endIndex} of ${this.products.length} products`;
  }

  applyFilter(filters: any): void {
    this.filteredProducts = this.filterService.filterProducts(this.products, filters);
    console.log('Filters applied:', filters); // Перевірка
    this.updatePage();
  }

  getUniqueCategories(products: IProduct[]): string[] {
    const uniqueCategories = [...new Set(products.map(product => product.category))];  
    return uniqueCategories;
  }

  sortCategories(categories: string[]): string[] {
    return categories.sort((a, b) => a.localeCompare(b));
  }
}
