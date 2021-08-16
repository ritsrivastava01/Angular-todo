export interface ITodo {
  id?: string;
  label?: string;
  description?: string;
  category?: Category;
  done?: boolean;
}
export enum Category {
  BUREAUCRACY = 'bureaucracy',
  HOUSE = 'House',
}
