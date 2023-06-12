import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostShowPage } from './post-show.page';

describe('PostShowPage', () => {
  let component: PostShowPage;
  let fixture: ComponentFixture<PostShowPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
