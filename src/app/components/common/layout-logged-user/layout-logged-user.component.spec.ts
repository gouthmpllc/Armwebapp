import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLoggedUserComponent } from './layout-logged-user.component';

describe('LayoutLoggedUserComponent', () => {
  let component: LayoutLoggedUserComponent;
  let fixture: ComponentFixture<LayoutLoggedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutLoggedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutLoggedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
