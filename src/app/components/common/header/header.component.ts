import { Component, OnInit, OnDestroy } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { SignInService } from '../../../services/signIn-service/sign-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  urlValues: any;
  loginData: any;
  loginStatus: boolean;
  public timerInterval: any;
  currentTime: any;
  currentDate = new Date();

  constructor(private cookieService: CookieService, private router: Router,
private signInService: SignInService) { }

  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.loadHeaderChanges();
    this.startTime();
    this.timerInterval = setInterval(() => {
      this.startTime();
    }, 1000);
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
            // {
            //     'urlLink': '/about',
            //     'urlName': 'ABOUT'
            // },
            // {
            //     'urlLink': '/contact',
            //     'urlName': 'CONTACT'
            // },
            {
                'urlLink': '/login',
                'urlName': 'LOGIN'
            }];
      }
  }

  startTime() {
    const today = new Date();
    const h = today.getHours();
    const m = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    const s = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
    this.currentTime = h + ':' + m + ':' + s;
    // console.log('hhhhhhh');
  }

  logout() {
    this.signInService.logout();
    this.loadHeaderChanges();
    window.location.reload();
    this.router.navigate(['home']);
  }

  ngOnDestroy () {
    // console.log('this.timeout');
    clearInterval(this.timerInterval);
  }

}
