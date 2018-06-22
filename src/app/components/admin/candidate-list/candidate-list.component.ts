import { Component, OnInit, Inject } from '@angular/core';
import { CandidateListService } from '../../../services/admin/candidate-list-service/candidate-list.service';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  data: any = [];
  displayAdminList: boolean;
  loginData: any;
  candidateQuery: string;
  loadingStatus: boolean;
  public rowsOnPage = 10;
  public sortBy = 'createdAt';
  public sortOrder = 'desc';
  constructor(private candidateListService: CandidateListService, private cookieService: CookieService,
    public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.loadAllCandidates();
  }

  loadAllCandidates() {
    this.loadingStatus = true;
    this.candidateListService.getAllCandidateList().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.loadingStatus = false;
        this.data = data.data;
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
      });
  }

  setAdminStatus() {
    this.displayAdminList = !this.displayAdminList;
  }

  callEmit(event) {
    this.setAdminStatus();
    this.loadAllCandidates();
  }

  candidateEdit(selCandidate) {
    // console.log(JSON.stringify(selCandidate));
    if (this.loginData) {
      if (this.loginData.data.role === 'SUPERADMIN') {
        this.router.navigate(['superAdmin/candidateList', selCandidate.candArmyNum]);
      } else if (this.loginData.data.role === 'ADMIN') {
        this.router.navigate(['superAdmin/candidateList', selCandidate.candArmyNum]);
      }
    }
  }

  setInActiveCandidate(selCandiate) {
    selCandiate.status = 'inactive';
    const message = 'InActivated';
    this.editCandidateStatus(selCandiate, message);
  }

  setActiveCandidate(selCandiate) {
    // console.log(JSON.stringify(selAdmin));
    selCandiate.status = 'active';
    const message = 'Activated';
    this.editCandidateStatus(selCandiate, message);
  }

  removeCandidate(selCandiate) {
    const dialogRef = this.dialog.open(CandidateConfirmDialogComponent, {
      width: '325px',
      data: selCandiate
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.candidateListService.deleteCandidate(selCandiate).subscribe(
        (data: any) => {
          alert('deleted Successfully');
          this.loadAllCandidates();
        },
        error => {
          console.log(JSON.stringify(error));
        });
      } else {
        return false;
      }
    });

    // if (confirm('Are You Sure?')) {
    //   this.candidateListService.deleteCandidate(selCandiate).subscribe(
    //     (data: any) => {
    //       alert('deleted Successfully');
    //       this.loadAllCandidates();
    //     },
    //     error => {
    //       console.log(JSON.stringify(error));
    //     });
    // } else {
    //   return false;
    // }

  }

  editCandidateStatus(selCandiate, message) {
    this.candidateListService.updateCandidate(selCandiate).subscribe(
      (data: any) => {
        alert(message + 'Successfully');
        this.loadAllCandidates();
      },
      error => {
        if (message === 'Activated') {
          selCandiate.status = 'inactive';
        } else if (message === 'Activated') {
          selCandiate.status = 'active';
        }
      });
  }

}

@Component({
  selector: 'app-candidate-confirm-dialog',
  templateUrl: './candidate-confirm-dialog.html'
  // providers: [EventStudentListComponent]
})
export class CandidateConfirmDialogComponent {
  deleteConfirm: boolean;

  constructor(
    public dialogRef: MatDialogRef<CandidateConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();

  }
}
