import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  host: { ngSkipHydration: 'true' },
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent {
  isFilterOpen = false;
  priceRange = { min: 0, max: 1000 };
  selectedGender: string | null = null;
  selectedSize: string | null = null;
  selectedColors: string[] = [];

  @Output() filterToggled = new EventEmitter<boolean>();
  
  preventBlur(event: MouseEvent) {
    event.preventDefault(); // Предотвращаем потерю фокуса
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
    this.filterToggled.emit(this.isFilterOpen);
  }

  toggleColor(color: string) {
    const index = this.selectedColors.indexOf(color);
    if (index === -1) {
      this.selectedColors.push(color);
    } else {
      this.selectedColors.splice(index, 1);
    }
  }
}