import { NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <div class="pagination-container">
      <div class="content-container">
        <div *ngIf="currentContent" class="content-item">
          <div class="content">
            <img [src]="currentContent.image" alt="Content image" *ngIf="currentContent.image" class="content-image">
            <h2 class="content-title">{{currentContent.title}}</h2>
          </div>
        </div>
      </div>
      <div class="dots-container" *ngIf="contents.length > 1">
        <div 
          *ngFor="let item of contents; let i = index" 
          class="dot" 
          [class.active]="i === currentPage"
          (click)="goToPage(i)">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pagination-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
      max-width: 100%;
    }

    .content-container {
      width: 100%;
      max-width: 800px;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      background-color: white;
    }

    .content-item {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .content-image {
      width: 100%;
      max-height: 400px;
      object-fit: contain;
      border-radius: 4px;
      margin-bottom: 15px;
    }

    .content-title {
      color: #333;
      margin: 0;
      text-align: center;
      font-size: 1.5rem;
    }

    .dots-container {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 10px;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #bbb;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .dot:hover {
      background-color: #777;
      transform: scale(1.1);
    }

    .dot.active {
      background-color: #333;
      transform: scale(1.2);
    }
  `]
})
export class PaginationComponent {
  @Input() contents: any[] = [];
  @Input() currentPage: number = 0;
  @Output() pageChanged = new EventEmitter<number>();

  get currentContent() {
    return this.contents[this.currentPage];
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.contents.length) {
      this.currentPage = page;
      this.pageChanged.emit(page);
    }
  }
}