import { NgFor } from '@angular/common';
import { Component, HostListener, ElementRef, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetItemsService } from '../../services/get-items.service';
import { Categories } from '../../models/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy  {
  
  category: Categories[] = []
  category_sub: Subscription | undefined
  
  constructor(private GetCategories: GetItemsService) { }

  ngOnInit(): void {
    this.category_sub = this.GetCategories.getCategories().subscribe((data) => {
      this.category = data
    })
  }

  ngOnDestroy(): void {
    if(this.category_sub) {
      this.category_sub.unsubscribe()
    }
  }

}