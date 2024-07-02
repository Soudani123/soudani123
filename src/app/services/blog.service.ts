import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../Models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:9091/blog';

  constructor(private http: HttpClient) { }
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/imageUpload`, formData);
  }

  addBlog(formData: FormData): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, formData);
  }

  deleteBlog(blogId: string): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${blogId}`;
    return this.http.delete<any>(deleteUrl);
  }

  updateBlog(blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${blog._id}`, blog);
  }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }
}
