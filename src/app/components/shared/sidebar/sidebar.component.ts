import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  loginData: any;
  userRole: string;
  sideValues: any = [];
  selectedMenuActive: string;
  mainPath: string;
  path: string;

  constructor(private cookieService: CookieService, private _router: Router, private activatedRoute: ActivatedRoute) {
    this.loginData = this.cookieService.getObject('loginResponce');
    if (this.loginData) {
      this.userRole = this.loginData.data.role;
      // active highlight link
      this.mainPath = this.activatedRoute.snapshot.url[0].path;
      this.path = this._router.url;
      // console.log('path' + this.path);
      if (this.mainPath === 'superAdmin') {
        if (this.path) {
          this.path = this.path.substring(12);
          if (this.path === 'dashboard') {
            this.selectedMenuActive = 'dashboard';
          } else if (this.path === 'adminList') {
            this.selectedMenuActive = 'adminList';
          } else if (this.path === 'configuration') {
              this.selectedMenuActive = 'configuration';
          } else if (this.path === 'reports') {
            this.selectedMenuActive = 'reports';
          } else if (this.path === 'candidateList') {
            this.selectedMenuActive = 'candidateList';
          } else {
              this.selectedMenuActive = this.path;
          }
        }
      } else if (this.mainPath === 'admin') {
        if (this.path) {
          this.path = this.path.substring(7);
          if (this.path === 'dashboard') {
            this.selectedMenuActive = 'dashboard';
          } else if (this.path === 'candidateList') {
            this.selectedMenuActive = 'candidateList';
          } else if (this.path === 'reports') {
            this.selectedMenuActive = 'reports';
          } else {
              this.selectedMenuActive = this.path;
          }
        }
      }
      switch (this.userRole) {
        case 'SUPERADMIN':
        this.sideValues =
        [

            {

                'urlLink': 'dashboard',
                'urlName': 'Dashboard',
                'img_icon': 'assets/images/reports_48.png',
                // 'active_img_icon': 'assets/images/sidePanel/institute/inst_profile.png',
                // 'name'    : 'disableLink',
            },
            {
                'urlLink': 'adminList',
                'urlName': 'Admin List',
                'img_icon': 'assets/images/reports_48.png',
                // 'active_img_icon': 'assets/images/sidePanel/institute/inst_bulk_upload.png',
                // 'name'    : '',
            },
            {
                'urlLink': 'configuration',
                'urlName': 'Configuration',
                'img_icon': 'assets/images/reports_48.png',
                // 'active_img_icon': 'assets/images/sidePanel/institute/inst_placement_process.png',
                // 'name'    : '',
             },
             {
                'urlLink': 'reports',
                'urlName': 'Reports',
                'img_icon': 'assets/images/reports_48.png',
              //  'active_img_icon': 'assets/images/sidePanel/institute/inst_student Management.png',
              //  'name'    : 'disableLink',
             },
             {
                'urlLink': 'candidateList',
                'urlName': 'Candidate List',
                'img_icon': 'assets/images/reports_48.png',
              //  'active_img_icon': 'assets/images/sidePanel/institute/inst_student Management.png',
              //  'name'    : 'disableLink',
             }
        ];
        break;
        case 'ADMIN':
        this.sideValues =
        [
          {
            'urlLink': 'dashboard',
            'urlName': 'Dashboard',
            'img_icon': 'assets/images/reports_48.png',
            // 'active_img_icon': 'assets/images/sidePanel/institute/inst_profile.png',
            // 'name'    : 'disableLink',
          },
          {
            'urlLink': 'candidateList',
            'urlName': 'Candidate List',
            'img_icon': 'assets/images/reports_48.png',
            // 'active_img_icon': 'assets/images/sidePanel/institute/inst_bulk_upload.png',
            // 'name'    : '',
          },
          {
             'urlLink': 'reports',
             'urlName': 'Reports',
             'img_icon': 'assets/images/reports_48.png',
           //  'active_img_icon': 'assets/images/sidePanel/institute/inst_student Management.png',
           //  'name'    : 'disableLink',
          },
        ];
      break;
      default:
      this.sideValues = [];
      break;
      }
    }
  }

  ngOnInit() {
  }

  sideMenuActiveFun(urlLink, list, index): void {
    this.selectedMenuActive = urlLink;
  }

}
