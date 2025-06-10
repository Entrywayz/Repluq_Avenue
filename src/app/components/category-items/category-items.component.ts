import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryItems } from '../../models/models';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchbarComponent } from "../searchbar/searchbar.component";

@Component({
  selector: 'app-category-items',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
