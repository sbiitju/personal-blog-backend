export interface IContent {
  domain: string;
  title: string;
  date?: string;
  place: string;
  description: string;
  photo: string;
  category: string;
  subcategory: string;
  createdAt?: Date;
  updatedAt?: Date;
}
