// blog.model.ts

export interface Blog {
  _id: string;
  title: string;
  author: string;
  contentType: string;
  artType: string;
  contentUrl: string;
  imageUrl: string; // Add this property
  createdAt?: Date;
}
