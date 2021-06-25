export interface Book {
  id: number;
  author: {
    firstname:string;
    lastname:string;
  };
  title: string;
  publishedYear:number;
}

export type BookProperties = Omit<Book, 'id'>;
