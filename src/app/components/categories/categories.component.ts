import { Component, OnInit, OnDestroy } from '@angular/core';
import { Categories } from '../../models/models';
import { Subscription } from 'rxjs';
import { GetItemsService } from '../../services/get-items.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hoodies',
  imports: [NgFor, RouterLink, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  category: Categories[] = [];
  category_sub: Subscription | undefined;
  search_text: string = '';

  constructor(private GetHoodie: GetItemsService) { }

  filteredItems(): Categories[] {
    if (!this.category) return [];

    return this.category.filter(item =>
      item.title.toLowerCase().includes(this.search_text.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.category_sub = this.GetHoodie.getCategories().subscribe((data) => {
      this.category = data;
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    if (this.category_sub) {
      this.category_sub.unsubscribe();
    }
  }
}
