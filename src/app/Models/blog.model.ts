export interface Blog {
    title: string;
    author: string;
    contentType: string;
    artType: string;
    contentUrl: string;
    createdAt?: Date; // Optional, as it can be set by the backend
  }
  