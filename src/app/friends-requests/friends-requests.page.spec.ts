import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendsRequestsPage } from './friends-requests.page';

describe('FriendsRequestsPage', () => {
  let component: FriendsRequestsPage;
  let fixture: ComponentFixture<FriendsRequestsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FriendsRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
