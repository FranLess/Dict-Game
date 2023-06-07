import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.page.html',
  styleUrls: ['./post-create.page.scss'],
})
export class PostCreatePage implements OnInit {
  constructor(private http: HttpClient) {}
  public title: string = '';
  public content: string = '';
  ngOnInit() {}

  create(title: string, content: string) {
    this.http
      .post('http://localhost:8000/api/posts', {
        title: title,
        content: content,
      })
      .subscribe((res) => console.log(res));
  }
}
