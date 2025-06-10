import { Component, HostListener } from '@angular/core';
import { NewItemsComponent } from "../new-items/new-items.component";
import { ListComponent } from "../list/list.component";
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { MainSearchComponent } from "../main-search/main-search.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ListComponent, NewItemsComponent, SearchbarComponent, MainSearchComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  isFocus: boolean = false;
  searchText: string = '';
  
  handleSearchFocus(isFocused: boolean) {
    this.isFocus = isFocused; 
  }

  handleSearchTextChange(text: string) {
    this.searchText = text;
  }
}