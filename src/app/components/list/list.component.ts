import { NgFor } from '@angular/common';
import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  shopScroll = [
    {
      name: "Watches",
      img: "watches.png",
    },
    {
      name: "Bombers",
      img: "bombers.png",
    },
    {
      name: "Shoes",
      img: "shoes.png",
    },
    {
      name: "Belts",
      img: "belts.png",
    },
    {
      name: "T-Shirts",
      img: "t-shirt.png",
    },
    {
      name: "Hoodies",
      img: "hoodie.png",
    },
    {
      name: "Shorts",
      img: "shorts.png",
    },
  ];

  constructor(private el: ElementRef) { }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    const container = this.el.nativeElement.querySelector('.container__list');

    if (container) {
      const canScrollLeft = container.scrollLeft > 0;
      const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth;

      const isScrollingLeft = event.deltaY < 0;

      if ((isScrollingLeft && !canScrollLeft) || (!isScrollingLeft && !canScrollRight)) {
        return;
      }

      event.preventDefault();

      container.scrollBy({
        left: event.deltaY,
        behavior: 'smooth'
      });
    }
  }
}