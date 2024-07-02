import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../Models/blog.model'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:9091/blog';  

  constructor(private http: HttpClient) { }

  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blog, {  
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }
}