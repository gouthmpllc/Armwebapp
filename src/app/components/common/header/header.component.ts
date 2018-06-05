import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { SignInService } from '../../../services/signIn-service/sign-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  urlValues: any;
  loginData: any;
  loginStatus: boolean;

  constructor(private cookieService: CookieService, private router: Router,
private signInService: SignInService) { }

  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.loadHeaderChanges();
  }

  loadHeaderChanges() {
      if (this.loginData) {
        if (this.loginData.data.role === 'SUPERADMIN') {
            this.loginStatus = true;
        } else if (this.loginData.data.role === 'ADMIN') {
          this.loginStatus = true;
        }
      } else {
        this.loginStatus = false;
        this.urlValues = [
            {
                'urlLink': '/home',
                'urlName': 'HOME'
            },
            {
                'urlLink': '/about',
                'urlName': 'ABOUT'
            },
            {
                'urlLink': '/contact',
                'urlName': 'CONTACT'
            },
            {
                'urlLink': '/login',
                'urlName': 'LOGIN'
            }];
      }
  }

  logout() {
    this.signInService.logout();
    this.loadHeaderChanges();
    window.location.reload();
    this.router.navigate(['home']);
  }

}
