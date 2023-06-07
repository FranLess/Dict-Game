import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamPagePage } from './team-page.page';

describe('TeamPagePage', () => {
  let component: TeamPagePage;
  let fixture: ComponentFixture<TeamPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TeamPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
