import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryItems } from '../../models/models';
import { NgFor, NgIf } from '@angular/common';
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-items',
  imports: [NgIf, NgFor, SearchbarComponent, FormsModule],
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.css']
})
export class CategoryItemsComponent implements OnInit, OnDestroy {
  cat_items: CategoryItems[] = [];
  itemsSub!: Subscription;

  search_text: string = '';

  constructor(private route: ActivatedRoute) { }

  filteredItems(): CategoryItems[] {
    if (!this.cat_items) return [];

    return this.cat_items.filter(item =>
      (item.name && item.name.toLowerCase().includes(this.search_text.toLowerCase())) ||
      (item.brand && item.brand.toLowerCase().includes(this.search_text.toLowerCase()))
    );
  }

  ngOnInit(): void {
    this.itemsSub = this.route.data.subscribe((data) => {
      this.cat_items = data['items'];
      console.log(this.cat_items);
    });
  }

  ngOnDestroy(): void {
    this.itemsSub?.unsubscribe();
  }
}
