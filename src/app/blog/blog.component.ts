import { Component, OnInit } from '@angular/core';
import { IBlogsResponse } from '../interfaces/blogs.interface';
import { BlogsServiceService } from '../service/blogs-service.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public userBlogs: Array<IBlogsResponse> = [];

  constructor(
    private blogsService: BlogsServiceService
  ) { }

  


  ngOnInit(): void {
    this.getBlogs()
  }

  getBlogs(): void {
    this.blogsService.getAll().subscribe(data => {
      this.userBlogs = data;
    });
  }


}
