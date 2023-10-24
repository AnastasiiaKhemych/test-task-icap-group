export interface Response {
  data: Data;
}

export interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export interface Post {
  id: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address?: string | undefined;
}
