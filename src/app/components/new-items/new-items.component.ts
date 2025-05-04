import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NewItem } from '../../models/models';
import { Subscription } from 'rxjs';
import { GetItemsService } from '../../services/get-items.service';


@Component({
  selector: 'app-new-items',
  standalone: true,
  imports: [NgFor],
  providers: [
    GetItemsService,
  ],
  templateUrl: './new-items.component.html',
  styleUrl: './new-items.component.css'
})
export class NewItemsComponent implements OnInit {
  new_items!: NewItem[];
  new_items_Subcription: Subscription | undefined;

  constructor(private NewItemService: GetItemsService) { }

  ngOnInit(): void {
    this.new_items_Subcription = this.NewItemService.getNewItems().subscribe((data) => {
      this.new_items = data.slice(1);
    });
  }

  ngOnDestroy(): void {
    if (this.new_items_Subcription) {
      this.new_items_Subcription.unsubscribe();
    }
  }
}