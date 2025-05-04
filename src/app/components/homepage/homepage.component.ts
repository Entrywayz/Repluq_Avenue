import { Component } from '@angular/core';
import { NewItemsComponent } from "../new-items/new-items.component";
import { ListComponent } from "../list/list.component";
import { SearchbarComponent } from "../searchbar/searchbar.component";

@Component({
  selector: 'app-homepage',
  imports: [ListComponent, NewItemsComponent, SearchbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
