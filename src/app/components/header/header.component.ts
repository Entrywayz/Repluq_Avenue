import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, private userService: UserService) {}
  
  logout(): void {
  this.userService.logout().subscribe({
    next: () => {
      this.isLogged = false;
      this.router.navigate(['/']);  
    },
    error: (err) => {
      console.error('Logout failed:', err);
      this.isLogged = false;
      this.router.navigate(['/']);
    }
  });
}

  ngOnInit(): void {
    //if code running in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.isLogged = !!localStorage.getItem('logdata');
      if (this.isLogged) {
        console.log(true);
      }
    }
  }
}