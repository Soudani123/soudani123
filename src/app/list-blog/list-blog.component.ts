import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../Models/blog.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit {
  commentaireForm!: FormGroup;
  updateForm!: FormGroup; // Define update form
  blogs: Blog[] = [];
  visibleBlogs: Blog[] = [];
  blogsToShow: number = 3;

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchBlogs();

    this.commentaireForm = this.fb.group({
      commentaire: ['', Validators.required],
    });

    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      contentType: ['', Validators.required],
      artType: ['', Validators.required],
      contentUrl: ['', Validators.required]
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

  onSubmitCommentaire(blog: Blog) {
    if (this.commentaireForm.valid) {
      const commentaire: any = this.commentaireForm.value;
      // Handle comment submission here
    }
  }
  
  showMore(): void {
    this.blogsToShow += 3;
    this.visibleBlogs = this.blogs.slice(0, this.blogsToShow);
  }

  onDelete(blog: Blog): void {
    this.blogService.deleteBlog(blog._id).subscribe(
      () => {
        console.log('Blog deleted successfully');
        this.fetchBlogs(); // Refresh the blog list after deletion
        this.snackBar.open('Blog deleted successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error => {
        console.error('Error deleting blog', error);
        this.snackBar.open('Error deleting blog', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  onUpdate(blog: Blog): void {
    // Set the update form with current blog data
    this.updateForm.patchValue({
      title: blog.title,
      author: blog.author,
      contentType: blog.contentType,
      artType: blog.artType,
      contentUrl: blog.contentUrl
    });
  }

  saveUpdate(): void {
    if (this.updateForm.valid) {
      const updatedBlog: Blog = { ...this.updateForm.value, _id: this.blogs[0]._id }; // Replace with actual blog ID
      this.blogService.updateBlog(updatedBlog).subscribe({
        next: () => {
          console.log('Blog updated successfully');
          this.fetchBlogs(); // Refresh the blog list after update
          this.snackBar.open('Blog updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (err) => {
          console.error('Error updating blog', err);
          this.snackBar.open('Error updating blog', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  navigateToAddBlog(): void {
    this.router.navigate(['/add-blog']);
    this.snackBar.open('Blog added successfully', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  onSubmit() {
    if (this.commentaireForm.valid) {
      const commentaire: any = this.commentaireForm.value;
      // Handle comment submission here
    }
  }
}