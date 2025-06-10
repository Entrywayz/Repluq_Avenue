import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllItems } from '../../models/models';
import { Subscription } from 'rxjs';
import { GetItemsService } from '../../services/get-items.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-item-desc',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './item-desc.component.html',
  styleUrls: ['./item-desc.component.css']
})
export class ItemDescComponent implements OnInit, OnDestroy {
  item: AllItems | undefined;
  id: number;
  item_sub: Subscription | undefined;
  image_array: string[] = [];
  currentMainImage: string = ''; // Текущее основное изображение
  thumbnails: string[] = []; // Миниатюры (все, кроме текущего)

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
      this.item = data;
      if (this.item?.image) {
        this.image_array = [...this.item.image];
        this.currentMainImage = this.image_array[0]; // Устанавливаем первое изображение как основное
        this.updateThumbnails(); // Инициализируем миниатюры
      }
    });
  }

  ngOnDestroy(): void {
    if (this.item_sub) {
      this.item_sub.unsubscribe();
    }
  }
}