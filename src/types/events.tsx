export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  price: number;
  created_by: User;
}
