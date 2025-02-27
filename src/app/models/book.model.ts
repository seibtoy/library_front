export interface Book {
  _id: string;
  author: string;
  country: string;
  imageLink: string;
  language: string;
  pages: number;
  title: string;
  year: number;
  genre: string;
  depositPrice: number;
  rentalPrice: number;
  quantity: number;
  currency: string;
  availability: string;
  isLiked: boolean;
}
