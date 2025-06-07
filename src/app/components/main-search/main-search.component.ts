import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AllItems } from '../../models/models';
import { GetItemsService } from '../../services/get-items.service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchbarComponent } from "../searchbar/searchbar.component";

@Component({
  selector: 'app-main-search',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent implements OnInit, OnDestroy {
  SearchAllItem: AllItems[] = [];
  AllItemsSub: Subscription | undefined;
  @Input() searchText: string = ''

  constructor (private getItems: GetItemsService) {}

  filteredItems(): AllItems[] {
    if(!this.SearchAllItem) return []
    
    return this.SearchAllItem.filter(item => item.id.toString().toLowerCase().includes(this.searchText) || item.name.toLowerCase().includes(this.searchText))
  }

  ngOnInit(): void {
    this.AllItemsSub = this.getItems.getAllItems().subscribe((data) => {
      this.SearchAllItem = data;
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    if(this.AllItemsSub) {
      this.AllItemsSub.unsubscribe()
    }
  }

}
