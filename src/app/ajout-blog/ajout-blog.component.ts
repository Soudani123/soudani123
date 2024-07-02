import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service'; // Adjust the path if needed
import { Blog } from '../Models/blog.model'; // Ensure the path is correct

@Component({
  selector: 'app-ajout-blog',
  templateUrl: './ajout-blog.component.html',
  
})
export class AjoutBlogComponent {
  blogForm!: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      contentType: ['', Validators.required],
      artType: ['', Validators.required],
      contentUrl: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const blog: Blog = this.blogForm.value;
      this.blogService.addBlog(blog).subscribe(
        response => {
          console.log('Blog added successfully', response);
          // Optionally, you can add some user feedback here
        },
        error => {
          console.error('Error adding blog', error);
        }
      );
    }
  }
}