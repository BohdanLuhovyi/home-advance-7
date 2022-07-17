import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBlogsRequests, IBlogsResponse } from '../interfaces/blogs.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogsServiceService {

  private url = environment.BACKEND_URL;
  private api = { blogs: `${this.url}blogs` }

  constructor(private http: HttpClient) { }

  getAll(): Observable<IBlogsResponse[]> {
    return this.http.get<IBlogsResponse[]>(this.api.blogs);
  }


  create(blog: IBlogsRequests): Observable<IBlogsResponse> {
    return this.http.post<IBlogsResponse>(this.api.blogs, blog);
  }  

  update(blog: IBlogsRequests, id: number): Observable<IBlogsResponse> {
    return this.http.patch<IBlogsResponse>(`${this.api.blogs}/${id}`, blog)
  }

  delete(id: number): Observable<void> {
     return this.http.delete<void>(`${this.api.blogs}/${id}`)
  }
}



