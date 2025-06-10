import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginModel, UserRegister } from '../../models/models';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: LoginModel = new LoginModel()
  router = inject(Router)
  userService = inject(UserService)

  onLogin() {
    this.userService.onLogin(this.loginObj).subscribe((res: any) => {
      if(res) {
        localStorage.setItem('logdata', JSON.stringify(res))
        this.router.navigateByUrl('/'); 
        setTimeout(() => {
          window.location.reload()
        }, 50)
      } else {
        alert("Invalid response from server");
      }
    }, error => {
      console.log('Error:', error);
      alert(error.error?.message || "Login failed");
    })
  }
}