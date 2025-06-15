import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AllItems, CategoryItems } from '../../models/models';
import { Subscription } from 'rxjs';
import { GetItemsService } from '../../services/get-items.service';
import { CommonModule, NgFor } from '@angular/common';
import ParseToDollar from '../../functions/ParseToDollar';

@Component({
  selector: 'app-item-desc',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink, RouterModule],
  templateUrl: './item-desc.component.html',
  styleUrls: ['./item-desc.component.css']
})
export class ItemDescComponent implements OnInit, OnDestroy {
  item: AllItems | undefined;
  id: number | undefined;
  item_sub: Subscription | undefined;
  recommendedItems: AllItems[] | undefined;
  recommendedItems_sub: Subscription | undefined;
  image_array: string[] = [];
  currentMainImage: string = '';
  thumbnails: string[] = [];
  selectedSize: string | null = null;
  selectedColors: string[] = [];
  
  constructor(
    private activateRoute: ActivatedRoute,
    private getItem: GetItemsService
  ) {
    this.id = Number(activateRoute.snapshot.params['id']);
  }

  updateThumbnails() {
    this.thumbnails = this.image_array.filter(img => img !== this.currentMainImage);
  }

  setMainImage(img: string) {
    this.currentMainImage = img;
    this.updateThumbnails();
  }

  nextImage() {
    const currentIndex = this.image_array.indexOf(this.currentMainImage);
    const nextIndex = (currentIndex + 1) % this.image_array.length;
    this.currentMainImage = this.image_array[nextIndex];
    this.updateThumbnails();
  }

  prevImage() {
    const currentIndex = this.image_array.indexOf(this.currentMainImage);
    const prevIndex = (currentIndex - 1 + this.image_array.length) % this.image_array.length;
    this.currentMainImage = this.image_array[prevIndex];
    this.updateThumbnails();
  }


  ngOnInit(): void {
    this.item_sub = this.getItem.getItemById(this.id).subscribe((data) => {
      console.log(data)
      this.item = data;
      this.item.price = ParseToDollar(this.item.price)
      if (this.item?.image) {
        this.image_array = [...this.item.image];
        this.currentMainImage = this.image_array[0];
        this.updateThumbnails();
      }
    });
    this.recommendedItems_sub = this.getItem.getAllItems().subscribe((data) => {
      this.recommendedItems = data
      console.log(data)
    })
  }
  
  filterItems(array: AllItems[]): AllItems[] {
    return array = this.recommendedItems.filter(item => item.category_id === this.item.category_id)
  }

  ngOnDestroy(): void {
    if (this.item_sub) {
      this.item_sub.unsubscribe();
    }
    if (this.recommendedItems_sub) {
      this.recommendedItems_sub.unsubscribe()
    }
  }
}