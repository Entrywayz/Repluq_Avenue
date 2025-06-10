import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  @Input() value: string = '';
  @Output() searchFocus = new EventEmitter<boolean>();
  @Output() searchTextChange = new EventEmitter<string>();
  @ViewChild('searchInput') searchInput!: ElementRef;

  private blurTimeout: any;

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTextChange.emit(value);
  }

  onFocus() {
    this.searchFocus.emit(true);
    // Очищаем таймер при новом фокусе, чтобы избежать двойного вызова
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
      this.blurTimeout = null;
    }
  }

  onBlur(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement;
    
    // Проверяем, перешел ли фокус на элемент фильтра
    const isMovingToFilter = relatedTarget?.closest('.filter-content');
    
    if (isMovingToFilter) {
      // Если да, сохраняем фокус
      // Используем requestAnimationFrame для более плавного перехода
      requestAnimationFrame(() => {
        this.searchInput.nativeElement.focus();
      });
    } else {
      // Если нет, закрываем результаты поиска с небольшой задержкой
      // Очищаем предыдущий таймер, если он есть
      if (this.blurTimeout) {
        clearTimeout(this.blurTimeout);
      }
      this.blurTimeout = setTimeout(() => {
        this.searchFocus.emit(false);
        this.blurTimeout = null;
      }, 200);
    }
  }

  ngOnDestroy() {
    // Очищаем таймер при уничтожении компонента
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
  }
}