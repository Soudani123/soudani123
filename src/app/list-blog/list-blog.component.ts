import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Blog } from '../Models/blog.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit {
  commentaireForm!: FormGroup;
  blogs: Blog[] = [];
  visibleBlogs: Blog[] = [];
  blogsToShow: number = 3;

  constructor(private blogService: BlogService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchBlogs();

    this.commentaireForm = this.fb.group({
      commentaire: ['', Validators.required],
    });
  }

  fetchBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.visibleBlogs = this.blogs.slice(0, this.blogsToShow);
      },
      error: (err) => console.error('Error fetching blogs', err)
    });
  }

  showMore(): void {
    this.blogsToShow += 3;
    this.visibleBlogs = this.blogs.slice(0, this.blogsToShow);
  }

  onSubmit() {
    if (this.commentaireForm.valid) {
      const commentaire: any = this.commentaireForm.value;
    }
  }
}
