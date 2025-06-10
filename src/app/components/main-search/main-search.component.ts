import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AllItems } from '../../models/models';
import { GetItemsService } from '../../services/get-items.service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FilterBarComponent } from "../filter-bar/filter-bar.component";

@Component({
  selector: 'app-main-search',
  standalone: true,
  host: { ngSkipHydration: 'true' },
  imports: [NgFor, FormsModule, RouterLink, NgIf, FilterBarComponent],
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent implements OnInit, OnDestroy {
  SearchAllItem: AllItems[] = [];
  AllItemsSub: Subscription | undefined;
  @Input() searchText: string = '';
  isSearchFocused = false;

  constructor(private getItems: GetItemsService) {}

  filteredItems(): AllItems[] {
    if (!this.SearchAllItem) return [];
    const searchTextLower = this.searchText.toLowerCase();
    return this.SearchAllItem.filter(item => 
      item.id.toString().toLowerCase().includes(searchTextLower) || 
      item.name.toLowerCase().includes(searchTextLower)
    );
  }

  ngOnInit(): void {
    this.AllItemsSub = this.getItems.getAllItems().subscribe((data) => {
      this.SearchAllItem = data;
    });
  }

  ngOnDestroy(): void {
    if (this.AllItemsSub) {
      this.AllItemsSub.unsubscribe();
    }
  }

  handleSearchFocus(focused: boolean) {
    this.isSearchFocused = focused;
  }
}