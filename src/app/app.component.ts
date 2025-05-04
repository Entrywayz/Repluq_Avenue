import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SearchbarComponent } from "./components/searchbar/searchbar.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HttpClientModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rep';
}
