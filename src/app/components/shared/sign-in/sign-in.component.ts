import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { SignInService } from '../../../services/signIn-service/sign-in.service';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: any = {}; // login user obj
  campusLoginResponse: any;
  token: any;
  hide = true;

  constructor(private signInService: SignInService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
  }
/**
 * To login the user, if success navigate to dashboard
 * user- current user form data
 * @memberof SignInComponent
 */
signIn() {
    console.log(JSON.stringify(this.user));
    this.signInService.signIn(this.user).subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        this.campusLoginResponse = data;
        this.token = this.campusLoginResponse.data.id;
        this.signInService.finishAuthentication(this.token, this.campusLoginResponse);
        this.cookieService.putObject('loginResponce', this.campusLoginResponse);
      },
      error => {
        alert('Invalid Credentials');
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
      });
  }
}
