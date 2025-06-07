import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  @Input() value: string = '';
  @Output() searchFocus = new EventEmitter<boolean>();
  @Output() searchTextChange = new EventEmitter<string>(); 

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTextChange.emit(value); 
  }

  onFocus() {
    this.searchFocus.emit(true);
  }

  onBlur() {
    this.searchFocus.emit(false);
  }
}