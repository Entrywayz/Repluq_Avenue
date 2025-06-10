import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  ngOnInit(): void {
    //if code running in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.isLogged = !!localStorage.getItem('logdata');
      if (this.isLogged) {
        console.log(true);
      }
    }
  }

  Logout() {
    localStorage.removeItem('logdata')
    this.router.navigateByUrl('/')
    window.location.reload()
  }
}