import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})

export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category'];
  pageSizeOptions: number[] = [10, 20, 50, 100];
  pageSize: number = 10;
  totalPages: number = 0;
  currentPage: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
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
    const endIndex = Math.min(startIndex + this.pageSize, this.products.length);
    this.totalPages = Math.ceil(this.products.length / this.pageSize);
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
    return this.products.slice(startIndex, endIndex);
  }

  getDisplayedProductsRange(): string {
    const startIndex = this.currentPage * this.pageSize + 1;
    const endIndex = Math.min((this.currentPage + 1) * this.pageSize, this.products.length);
    return `${startIndex} - ${endIndex} of ${this.products.length} products`;
  }
}
