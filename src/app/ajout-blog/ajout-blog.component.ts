import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-ajout-blog',
  templateUrl: './ajout-blog.component.html',
  styleUrls: ['./ajout-blog.component.scss']
})
export class AjoutBlogComponent {
  blogForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      contentType: ['', Validators.required],
      artType: ['', Validators.required],
      contentUrl: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const formData = new FormData();
      formData.append('title', this.blogForm.value.title);
      formData.append('author', this.blogForm.value.author);
      formData.append('contentType', this.blogForm.value.contentType);
      formData.append('artType', this.blogForm.value.artType);
      formData.append('contentUrl', this.blogForm.value.contentUrl);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.blogService.addBlog(formData).subscribe(
        response => {
          console.log('Blog ajouté avec succès', response);
        },
        error => {
          console.error('Erreur lors de l\'ajout du blog', error);
        }
      );
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      this.blogForm.patchValue({ image: this.selectedFile });
    }
  }
}