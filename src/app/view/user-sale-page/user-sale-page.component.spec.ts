import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSalePageComponent } from './user-sale-page.component';

describe('UserSalePageComponent', () => {
  let component: UserSalePageComponent;
  let fixture: ComponentFixture<UserSalePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSalePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
