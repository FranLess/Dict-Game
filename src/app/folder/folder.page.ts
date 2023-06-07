import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  public users: any;

  public token: any;
  constructor(private http: HttpClient) {}

  register() {
    const userRegisterRequest = this.http.post(
      'http://localhost:8000/register',
      {
        name: 'francisco',
        email: 'francisco@gmail.com',
        password: 'francisco123',
        password_confirmation: 'francisco123',
      }
    );

    userRegisterRequest.subscribe((response) => console.log(response));
  }

  getUser() {
    const userRequest = this.http.get('http://localhost:8000/api/user');
    userRequest.subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
