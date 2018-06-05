import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminReportsComponent } from './super-admin-reports.component';

describe('SuperAdminReportsComponent', () => {
  let component: SuperAdminReportsComponent;
  let fixture: ComponentFixture<SuperAdminReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
