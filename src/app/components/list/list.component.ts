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
}